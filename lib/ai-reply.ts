// lib/ai-reply.ts
// Server-side only — AI reply generator using OpenAI

import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini'

export interface BusinessContext {
  name: string
  type: string
  tone: string
  basePrompt?: string
  faqs?: Array<{ question: string; answer: string }>
  services?: Array<{ name: string; description?: string; price?: string }>
  offHoursMessage?: string
}

export interface ConversationMessage {
  role: 'user' | 'assistant'
  content: string
}

const DEFAULT_BUSINESS: BusinessContext = {
  name: 'ZapReply AI Demo',
  type: 'Clínica Estética',
  tone: 'friendly',
  basePrompt:
    'Você é uma assistente simpática e profissional de uma clínica estética. Responda de forma natural, concisa e em português brasileiro.',
  faqs: [
    {
      question: 'Quanto custa botox?',
      answer: 'O valor depende das áreas. Posso agendar uma avaliação gratuita para você.',
    },
    {
      question: 'Qual o horário?',
      answer: 'Atendemos de segunda a sexta das 9h às 18h, e sábados das 9h às 14h.',
    },
  ],
}

export async function generateAIReply(
  customerMessage: string,
  history: ConversationMessage[],
  business: BusinessContext = DEFAULT_BUSINESS
): Promise<string> {
  const systemPrompt = buildSystemPrompt(business)

  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: 'system', content: systemPrompt },
    ...history.slice(-10).map((m) => ({ role: m.role, content: m.content })),
    { role: 'user', content: customerMessage },
  ]

  try {
    const response = await openai.chat.completions.create({
      model: MODEL,
      messages,
      max_tokens: 300,
      temperature: 0.7,
    })

    return (
      response.choices[0]?.message?.content?.trim() ||
      'Olá! Como posso te ajudar hoje?'
    )
  } catch (err) {
    console.error('[AI Reply] OpenAI error:', err)
    return 'Olá! Recebi sua mensagem. Em breve um de nossos atendentes vai te responder. 😊'
  }
}

function buildSystemPrompt(business: BusinessContext): string {
  const toneMap: Record<string, string> = {
    professional: 'profissional e formal',
    friendly: 'amigável e descontraído',
    formal: 'formal e respeitoso',
    casual: 'casual e próximo',
  }
  const toneLabel = toneMap[business.tone] || 'amigável e profissional'

  let prompt = `Você é um assistente de WhatsApp da empresa "${business.name}" (${business.type}).

REGRAS IMPORTANTES:
- Responda SEMPRE em português brasileiro natural
- Seja ${toneLabel}
- Mensagens curtas e diretas (máximo 3 parágrafos)
- Use emojis com moderação (1-2 por mensagem)
- Não diga que é uma IA a menos que perguntado diretamente
- Não invente preços exatos a menos que estejam nos serviços/FAQs abaixo
- Tente levar o cliente para um agendamento ou próximo passo
- Se não souber responder, diga que vai verificar e perguntar ao responsável

`

  if (business.basePrompt) {
    prompt += `CONTEXTO DO NEGÓCIO:\n${business.basePrompt}\n\n`
  }

  if (business.faqs && business.faqs.length > 0) {
    prompt += `PERGUNTAS FREQUENTES:\n`
    business.faqs.forEach((faq) => {
      prompt += `- P: ${faq.question}\n  R: ${faq.answer}\n`
    })
    prompt += '\n'
  }

  if (business.services && business.services.length > 0) {
    prompt += `SERVIÇOS:\n`
    business.services.forEach((s) => {
      prompt += `- ${s.name}`
      if (s.price) prompt += ` (${s.price})`
      if (s.description) prompt += `: ${s.description}`
      prompt += '\n'
    })
    prompt += '\n'
  }

  prompt += `Quando o cliente perguntar sobre horários, preços ou agendamento, seja prestativo e tente agendar.`

  return prompt
}
