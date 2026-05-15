'use client'

import Link from 'next/link'
import { Check, MessageSquare } from 'lucide-react'
import LeadForm from './LeadForm'
import ScrollButton from './ScrollButton'

interface ChatMessage {
  sender: 'customer' | 'ai'
  text: string
}

interface NichePageProps {
  headline: string
  subheadline: string
  chat: ChatMessage[]
  benefits: string[]
}

const pricingPlans = [
  {
    name: 'Starter',
    price: 'R$997',
    period: '/mês',
    highlight: false,
    badge: null,
    features: [
      '1 número WhatsApp',
      'Respostas com IA',
      'Follow-ups básicos',
      'Painel de conversas',
      'Suporte mensal',
    ],
  },
  {
    name: 'Pro',
    price: 'R$1.997',
    period: '/mês',
    highlight: true,
    badge: 'Mais Popular',
    features: [
      'Tudo do Starter',
      'Follow-ups avançados',
      'Agendamento automático',
      'Treinamento personalizado da IA',
      'Suporte prioritário',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Personalizado',
    period: '',
    highlight: false,
    badge: null,
    features: [
      'Múltiplos números',
      'White-label',
      'Integrações personalizadas',
      'Onboarding dedicado',
    ],
  },
]

export default function NichePage({ headline, subheadline, chat, benefits }: NichePageProps) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-green-600" />
            <span className="font-bold text-gray-900 text-lg">ZapReply AI</span>
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 border border-gray-200 rounded-lg hover:border-green-300 transition-colors"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-20 px-4 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                {headline}
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">{subheadline}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <ScrollButton
                  targetId="demo-form"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-base"
                >
                  Ver demonstração
                </ScrollButton>
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-green-600 text-green-600 hover:bg-green-50 font-semibold px-8 py-3 rounded-lg transition-colors text-base text-center"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </div>

            {/* Chat mockup */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-80 bg-[#ECE5DD] rounded-3xl shadow-2xl overflow-hidden">
                <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center text-white font-bold text-sm">
                    ZR
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">ZapReply AI</p>
                    <p className="text-green-200 text-xs">online agora</p>
                  </div>
                </div>
                <div className="p-4 space-y-3 min-h-48">
                  {chat.map((msg, i) => (
                    <div key={i} className={`flex ${msg.sender === 'ai' ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`text-gray-800 text-sm px-3 py-2 rounded-2xl max-w-[80%] shadow-sm ${
                          msg.sender === 'ai'
                            ? 'bg-[#DCF8C6] rounded-tr-sm'
                            : 'bg-white rounded-tl-sm'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            O que o ZapReply AI faz pela sua empresa
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((b) => (
              <div key={b} className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-xl px-5 py-4">
                <Check className="w-5 h-5 text-green-600 shrink-0" />
                <span className="text-gray-700 font-medium">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Planos e preços
          </h2>
          <p className="text-center text-gray-600 mb-12">Escolha o plano ideal para o seu negócio.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 border ${
                  plan.highlight
                    ? 'border-green-500 shadow-lg shadow-green-100 bg-green-50'
                    : 'border-gray-200 bg-white shadow-sm'
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {plan.badge}
                  </span>
                )}
                <h3 className="font-bold text-gray-900 text-xl mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period && <span className="text-gray-500 text-sm">{plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <ScrollButton
                  targetId="demo-form"
                  className={`w-full py-3 rounded-lg font-semibold text-sm transition-colors ${
                    plan.highlight
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'border border-gray-300 hover:border-green-400 text-gray-700 hover:text-green-600'
                  }`}
                >
                  Quero uma demonstração
                </ScrollButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section id="demo-form" className="py-20 px-4 bg-green-50">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Solicite uma demonstração gratuita
            </h2>
            <p className="text-gray-600">
              Nossa equipe vai te mostrar o ZapReply AI funcionando para o seu negócio.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-100">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-5 h-5 text-green-400" />
                <span className="font-bold text-white text-lg">ZapReply AI</span>
              </div>
              <p className="text-gray-400 text-sm">Funcionário IA para WhatsApp</p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <Link href="/" className="hover:text-white transition-colors">Início</Link>
              <Link href="/clinicas-esteticas" className="hover:text-white transition-colors">Clínicas Estéticas</Link>
              <Link href="/odontologia" className="hover:text-white transition-colors">Odontologia</Link>
              <Link href="/imobiliarias" className="hover:text-white transition-colors">Imobiliárias</Link>
              <Link href="/login" className="hover:text-white transition-colors">Login</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center">
            <p className="text-gray-500 text-sm">© 2025 ZapReply AI. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
