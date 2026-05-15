import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import {
  parseIncomingWebhook as parseEvolution,
  sendTextMessage as evolutionSend,
  isEvolutionConfigured,
} from '@/lib/evolution'
import {
  parseMetaWebhook,
  sendTextMessage as metaSend,
  isMetaConfigured,
  verifyWebhook as metaVerifyWebhook,
  isMetaPayload,
} from '@/lib/meta-whatsapp'
import { generateAIReply } from '@/lib/ai-reply'
import type { IncomingMessage } from '@/lib/evolution'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// ─── GET — webhook verification (Meta requires this) ────────────────────────
export async function GET(req: NextRequest) {
  // Meta webhook verification challenge
  const challenge = metaVerifyWebhook(req)
  if (challenge) {
    return new Response(challenge, { status: 200 })
  }

  // Health check for Evolution / generic
  return NextResponse.json({
    status: 'ok',
    webhook: 'ZapReply AI WhatsApp Webhook',
    providers: {
      evolution: isEvolutionConfigured(),
      meta: isMetaConfigured(),
    },
  })
}

// ─── POST — receive messages ─────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  let rawPayload: unknown

  try {
    rawPayload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Determine provider: env var takes precedence, then auto-detect from payload
  const providerEnv = process.env.WHATSAPP_PROVIDER || ''
  const useMeta =
    providerEnv === 'meta' ||
    (!providerEnv && isMetaPayload(rawPayload))

  // Parse incoming message using appropriate parser
  let incoming: IncomingMessage | null = null
  let activeProvider: 'meta' | 'evolution' = 'evolution'

  if (useMeta) {
    incoming = parseMetaWebhook(rawPayload)
    activeProvider = 'meta'
  } else {
    incoming = parseEvolution(rawPayload)
    activeProvider = 'evolution'
  }

  if (!incoming) {
    // Meta sends status updates (delivered, read) that we should silently ignore with 200
    console.log(
      `[Webhook/${activeProvider}] Could not parse message — ignoring. Keys:`,
      Object.keys((rawPayload as Record<string, unknown>) || {})
    )
    return NextResponse.json({ status: 'ignored', reason: 'unparseable' })
  }

  // Ignore messages from bot itself (Evolution only; Meta doesn't send outbound here)
  if (incoming.fromMe) {
    return NextResponse.json({ status: 'ignored', reason: 'from_me' })
  }

  // Ignore group messages
  if (incoming.isGroup) {
    return NextResponse.json({ status: 'ignored', reason: 'group' })
  }

  // Ignore empty messages
  if (!incoming.message.trim()) {
    return NextResponse.json({ status: 'ignored', reason: 'empty' })
  }

  console.log(
    `[Webhook/${activeProvider}] Message from ${incoming.phone}: ${incoming.message.substring(0, 60)}`
  )

  try {
    // ── Dedup: skip if already processed ────────────────────────────────────
    if (incoming.externalId) {
      const { data: existing } = await supabase
        .from('messages')
        .select('id')
        .eq('external_message_id', incoming.externalId)
        .single()

      if (existing) {
        return NextResponse.json({ status: 'ignored', reason: 'duplicate' })
      }
    }

    // ── Find or create conversation ──────────────────────────────────────────
    let conversationId: string

    const { data: existingConv } = await supabase
      .from('conversations')
      .select('id')
      .eq('contact_phone', incoming.phone)
      .eq('channel', 'whatsapp')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (existingConv) {
      conversationId = existingConv.id
      await supabase
        .from('conversations')
        .update({ last_message_at: new Date().toISOString(), status: 'open' })
        .eq('id', conversationId)
    } else {
      const { data: businesses } = await supabase
        .from('businesses')
        .select('id')
        .limit(1)

      const businessId = businesses?.[0]?.id || null

      const { data: newConv, error: convError } = await supabase
        .from('conversations')
        .insert({
          business_id: businessId,
          contact_phone: incoming.phone,
          contact_name: incoming.phone,
          channel: 'whatsapp',
          status: 'open',
          last_message_at: new Date().toISOString(),
        })
        .select('id')
        .single()

      if (!newConv || convError) {
        throw new Error(`Failed to create conversation: ${convError?.message}`)
      }
      conversationId = newConv.id
    }

    // ── Save incoming message ────────────────────────────────────────────────
    await supabase.from('messages').insert({
      conversation_id: conversationId,
      role: 'user',
      content: incoming.message,
      channel: 'whatsapp',
      external_message_id: incoming.externalId || null,
      sent_at: new Date(incoming.timestamp * 1000).toISOString(),
    })

    // ── Load conversation history ────────────────────────────────────────────
    const { data: history } = await supabase
      .from('messages')
      .select('role, content')
      .eq('conversation_id', conversationId)
      .order('sent_at', { ascending: true })
      .limit(10)

    const conversationHistory = (history || []).map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    }))

    // ── Load business AI settings ────────────────────────────────────────────
    const { data: businesses } = await supabase
      .from('businesses')
      .select('id, name')
      .limit(1)

    const businessId = businesses?.[0]?.id
    let businessContext

    if (businessId) {
      const { data: aiSettings } = await supabase
        .from('ai_settings')
        .select('*')
        .eq('business_id', businessId)
        .single()

      if (aiSettings) {
        businessContext = {
          name: businesses![0].name,
          type: 'negócio',
          tone: aiSettings.tone || 'friendly',
          basePrompt: aiSettings.base_prompt,
          faqs: Array.isArray(aiSettings.faq) ? aiSettings.faq : [],
          services: Array.isArray(aiSettings.products) ? aiSettings.products : [],
          offHoursMessage: aiSettings.off_hours_message,
        }
      }
    }

    // ── Generate AI reply ────────────────────────────────────────────────────
    const aiReply = await generateAIReply(
      incoming.message,
      conversationHistory,
      businessContext
    )

    // ── Save AI reply ────────────────────────────────────────────────────────
    await supabase.from('messages').insert({
      conversation_id: conversationId,
      role: 'assistant',
      content: aiReply,
      channel: 'whatsapp',
      sent_at: new Date().toISOString(),
    })

    // ── Send reply via active provider ───────────────────────────────────────
    let sent = false
    if (activeProvider === 'meta') {
      sent = await metaSend(incoming.phone, aiReply)
    } else {
      sent = await evolutionSend(incoming.phone, aiReply)
    }

    console.log(
      `[Webhook/${activeProvider}] AI replied to ${incoming.phone}: ${aiReply.substring(0, 50)}... (sent=${sent})`
    )

    return NextResponse.json({
      status: 'ok',
      replied: true,
      sent,
      provider: activeProvider,
      conversationId,
    })
  } catch (err) {
    console.error('[Webhook] Processing error:', err)
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
  }
}
