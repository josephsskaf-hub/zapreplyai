import { Metadata } from 'next'
import NichePage from '@/components/NichePage'

export const metadata: Metadata = {
  title: 'IA para Imobiliárias | ZapReply AI',
  description: 'Automatize o atendimento da sua imobiliária no WhatsApp com IA. Qualifique leads, agende visitas e faça follow-up automaticamente.',
}

export default function ImobiliariasPage() {
  return (
    <NichePage
      headline="IA para imobiliárias qualificarem leads e agendarem visitas pelo WhatsApp"
      subheadline="Sua imobiliária responde interessados, qualifica leads com as perguntas certas e agenda visitas automaticamente — sem deixar nenhum contato sem resposta."
      chat={[
        { sender: 'customer', text: 'Oi, vi o apartamento de 2 quartos no Bairro X. Ainda disponível?' },
        { sender: 'ai', text: 'Oi 😊 sim, está disponível! É um ótimo apartamento. Você está buscando para compra ou aluguel? Assim consigo te passar as melhores opções.' },
        { sender: 'customer', text: 'Para compra, tenho FGTS disponível' },
        { sender: 'ai', text: 'Perfeito! FGTS facilita bastante. Você tem interesse em agendar uma visita essa semana? Posso verificar a disponibilidade do corretor.' },
      ]}
      benefits={[
        'Qualifica leads automaticamente',
        'Agenda visitas aos imóveis',
        'Responde dúvidas sobre imóveis 24h',
        'Follow-up com interessados',
        'Filtra por perfil (compra/aluguel/faixa de preço)',
        'Integra com portais imobiliários',
      ]}
    />
  )
}
