import { Metadata } from 'next'
import NichePage from '@/components/NichePage'

export const metadata: Metadata = {
  title: 'IA para Clínicas Estéticas | ZapReply AI',
  description: 'Automatize o atendimento da sua clínica estética no WhatsApp com IA. Agende avaliações, responda dúvidas e faça follow-up automaticamente.',
}

export default function ClinicasEsteticasPage() {
  return (
    <NichePage
      headline="IA para clínicas estéticas atenderem e agendarem pelo WhatsApp"
      subheadline="Sua clínica responde clientes, agenda avaliações e faz follow-up de orçamento automaticamente — como se tivesse uma atendente dedicada 24h no WhatsApp."
      chat={[
        { sender: 'customer', text: 'Oi, quanto fica botox?' },
        { sender: 'ai', text: 'Oi 😊 o valor depende das áreas aplicadas, mas posso te ajudar. Você queria fazer testa, olhos ou face toda? Também posso agendar uma avaliação pra te passarem certinho.' },
        { sender: 'customer', text: 'Quero na testa e ao redor dos olhos' },
        { sender: 'ai', text: 'Ótimo! Posso já te agendar uma avaliação gratuita. Você prefere essa semana ou na próxima?' },
      ]}
      benefits={[
        'Agenda avaliações automaticamente',
        'Responde dúvidas sobre procedimentos',
        'Reativa clientes antigos',
        'Faz follow-up de orçamento',
        'Reduz perda de lead',
        'Atendimento 24h sem custo extra',
      ]}
    />
  )
}
