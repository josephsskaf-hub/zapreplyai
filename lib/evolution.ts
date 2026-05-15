// lib/evolution.ts
// Server-side only — Evolution API client
// NEVER import this file in client components

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL || ''
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY || ''
const EVOLUTION_INSTANCE_ID = process.env.EVOLUTION_INSTANCE_ID || ''

export function isEvolutionConfigured(): boolean {
  return !!(EVOLUTION_API_URL && EVOLUTION_API_KEY && EVOLUTION_INSTANCE_ID)
}

export function normalizePhone(phone: string): string {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '')
  // Add Brazil country code if missing
  if (digits.startsWith('55')) return digits
  return `55${digits}`
}

export interface IncomingMessage {
  phone: string
  message: string
  externalId: string
  fromMe: boolean
  isGroup: boolean
  timestamp: number
}

export function parseIncomingWebhook(payload: unknown): IncomingMessage | null {
  try {
    const p = payload as Record<string, unknown>

    // Evolution API v2 format
    const data = (p.data || p) as Record<string, unknown>
    const key = (data.key || {}) as Record<string, unknown>
    const msg = (data.message || {}) as Record<string, unknown>

    const remoteJid = (key.remoteJid as string) || ''
    const fromMe = !!(key.fromMe)
    const isGroup = remoteJid.includes('@g.us')
    const externalId = (key.id as string) || ''
    const timestamp = (data.messageTimestamp as number) || Date.now()

    // Extract message text
    let message = ''
    if (msg.conversation) {
      message = msg.conversation as string
    } else if (msg.extendedTextMessage) {
      message = (((msg.extendedTextMessage as Record<string, unknown>).text) || '') as string
    }

    if (!message || !remoteJid) return null

    // Extract phone (remove @s.whatsapp.net or @g.us suffix)
    const phone = remoteJid.replace('@s.whatsapp.net', '').replace('@g.us', '')

    return { phone, message, externalId, fromMe, isGroup, timestamp }
  } catch (err) {
    console.error('[Evolution] Failed to parse webhook payload:', err)
    return null
  }
}

export async function sendTextMessage(phone: string, message: string): Promise<boolean> {
  if (!isEvolutionConfigured()) {
    console.warn('[Evolution] Not configured — skipping send')
    return false
  }

  const normalized = normalizePhone(phone)
  const url = `${EVOLUTION_API_URL}/message/sendText/${EVOLUTION_INSTANCE_ID}`

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: EVOLUTION_API_KEY,
      },
      body: JSON.stringify({
        number: normalized,
        options: { delay: 1200, presence: 'composing' },
        textMessage: { text: message },
      }),
    })

    if (!res.ok) {
      const body = await res.text()
      console.error(`[Evolution] Send failed (${res.status}):`, body)
      return false
    }

    return true
  } catch (err) {
    console.error('[Evolution] Network error sending message:', err)
    return false
  }
}
