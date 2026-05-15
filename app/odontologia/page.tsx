import { Metadata } from 'next'
import NichePage from '@/components/NichePage'

export const metadata: Metadata = {
  title: 'IA para Clínicas Odontológicas | ZapReply AI',
  description: 'Automatize o atendimento da sua clínica odontológica no WhatsApp com IA. Agende consultas, responda dúvidas e reduza faltas.',
}

export default function OdontologiaPage() {
  return (
    <NichePage
      headline="IA para clínicas odontológicas agendarem e atenderem pelo WhatsApp"
      subheadline="Sua clínica confirma consultas, responde dúvidas sobre tratamentos e reduz faltas automaticamente — com IA no WhatsApp, funcionando 24h por dia."
      chat={[
        { sender: 'customer', text: 'Oi, vocês fazem clareamento dental?' },
        { sender: 'ai', text: 'Oi 😊 sim, trabalhamos com clareamento dental a laser e caseiro. Qual você tem interesse? Posso também já te agendar uma avaliação gratuita com o dentista.' },
        { sender: 'customer', text: 'Quanto custa o a laser?' },
        { sender: 'ai', text: 'O clareamento a laser é feito em sessão única. O valor varia conforme o caso — a avaliação é gratuita e o dentista te passa a proposta personalizada. Posso agendar pra você?' },
      ]}
      benefits={[
        'Agenda consultas e avaliações',
        'Confirma e lembra pacientes de consultas',
        'Responde dúvidas sobre tratamentos',
        'Reduz taxa de faltas',
        'Reativa pacientes inativos',
        'Atendimento 24h sem custo extra',
      ]}
    />
  )
}
