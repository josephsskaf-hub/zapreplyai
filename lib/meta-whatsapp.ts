// lib/meta-whatsapp.ts
// Server-side only — Meta Cloud API (official WhatsApp Business API) client
// NEVER import this file in client components

import { NextRequest } from 'next/server'
import { IncomingMessage } from './evolution'

const META_WHATSAPP_TOKEN = process.env.META_WHATSAPP_TOKEN || ''
const META_PHONE_NUMBER_ID = process.env.META_PHONE_NUMBER_ID || ''
const META_VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || ''
const META_API_VERSION = 'v19.0'
const META_API_BASE = `https://graph.facebook.com/${META_API_VERSION}`

export function isMetaConfigured(): boolean {
  return !!(META_WHATSAPP_TOKEN && META_PHONE_NUMBER_ID)
}

/**
 * Verify Meta webhook challenge (GET request)
 * Returns the hub.challenge value if valid, null otherwise.
 */
export function verifyWebhook(req: NextRequest): string | null {
  const { searchParams } = new URL(req.url)
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token === META_VERIFY_TOKEN && challenge) {
    return challenge
  }
  return null
}

/**
 * Parse Meta Cloud API webhook payload into our unified IncomingMessage format.
 * Meta sends: { object: "whatsapp_business_account", entry: [...] }
 */
export function parseMetaWebhook(payload: unknown): IncomingMessage | null {
  try {
    const p = payload as Record<string, unknown>

    // Validate it's a WhatsApp webhook
    if (p.object !== 'whatsapp_business_account') return null

    const entries = p.entry as Array<Record<string, unknown>>
    if (!entries || entries.length === 0) return null

    const entry = entries[0]
    const changes = entry.changes as Array<Record<string, unknown>>
    if (!changes || changes.length === 0) return null

    const change = changes[0]
    const value = change.value as Record<string, unknown>

    if (!value || value.object !== 'whatsapp') return null

    const messages = value.messages as Array<Record<string, unknown>>
    if (!messages || messages.length === 0) return null

    const msg = messages[0]
    const msgType = msg.type as string

    // Only handle text messages for now
    if (msgType !== 'text') return null

    const textObj = msg.text as Record<string, unknown>
    const messageText = (textObj?.body as string) || ''
    if (!messageText) return null

    const phone = (msg.from as string) || ''
    const externalId = (msg.id as string) || ''
    const timestamp = parseInt((msg.timestamp as string) || '0', 10)

    return {
      phone,
      message: messageText,
      externalId,
      fromMe: false, // Meta webhooks don't deliver outbound messages in the same flow
      isGroup: false, // Groups use different JID format; Meta Cloud API groups are separate
      timestamp: timestamp || Math.floor(Date.now() / 1000),
    }
  } catch (err) {
    console.error('[Meta] Failed to parse webhook payload:', err)
    return null
  }
}

/**
 * Send a text message via Meta Cloud API
 */
export async function sendTextMessage(phone: string, message: string): Promise<boolean> {
  if (!isMetaConfigured()) {
    console.warn('[Meta] Not configured — skipping send')
    return false
  }

  // Normalize: remove + or spaces, ensure digits only
  const normalized = phone.replace(/\D/g, '')

  const url = `${META_API_BASE}/${META_PHONE_NUMBER_ID}/messages`

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${META_WHATSAPP_TOKEN}`,
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: normalized,
        type: 'text',
        text: { preview_url: false, body: message },
      }),
    })

    if (!res.ok) {
      const body = await res.text()
      console.error(`[Meta] Send failed (${res.status}):`, body)
      return false
    }

    return true
  } catch (err) {
    console.error('[Meta] Network error sending message:', err)
    return false
  }
}

/**
 * Auto-detect if a payload looks like a Meta webhook
 */
export function isMetaPayload(payload: unknown): boolean {
  const p = payload as Record<string, unknown>
  return p?.object === 'whatsapp_business_account'
}
