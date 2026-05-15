import { NextRequest, NextResponse } from 'next/server'
import { sendTextMessage as evolutionSend, isEvolutionConfigured } from '@/lib/evolution'
import { sendTextMessage as metaSend, isMetaConfigured } from '@/lib/meta-whatsapp'

export async function POST(req: NextRequest) {
  let body: { phone?: string; message?: string; provider?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { phone, message } = body
  if (!phone || !message) {
    return NextResponse.json({ error: 'phone and message are required' }, { status: 400 })
  }

  // Prefer body-specified provider, fall back to env var, then 'evolution'
  const provider = body.provider || process.env.WHATSAPP_PROVIDER || 'evolution'

  if (provider === 'meta') {
    if (!isMetaConfigured()) {
      return NextResponse.json(
        {
          error:
            'Meta Cloud API não configurada. Verifique META_WHATSAPP_TOKEN e META_PHONE_NUMBER_ID.',
          configured: false,
        },
        { status: 503 }
      )
    }
    const sent = await metaSend(phone, message)
    return NextResponse.json({ sent, provider: 'meta' })
  } else {
    if (!isEvolutionConfigured()) {
      return NextResponse.json(
        {
          error:
            'Evolution API não configurada. Verifique EVOLUTION_API_URL, EVOLUTION_API_KEY e EVOLUTION_INSTANCE_ID.',
          configured: false,
        },
        { status: 503 }
      )
    }
    const sent = await evolutionSend(phone, message)
    return NextResponse.json({ sent, provider: 'evolution' })
  }
}
