import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import ScrollButton from "@/components/ScrollButton";
import { Check, MessageSquare } from "lucide-react";

const stats = [
  { label: "Respostas em segundos" },
  { label: "Atendimento 24h" },
  { label: "Follow-up automatico" },
  { label: "Mais agendamentos" },
];

const problems = [
  "Clientes chamam e ficam sem resposta",
  "Leads somem depois do primeiro contato",
  "Equipe esquece follow-up",
  "Atendimento manual custa caro",
  "Botoes automaticos parecem roboticos",
];

const howItWorks = [
  { n: "1", label: "Conecte seu WhatsApp Business", desc: "Escaneie o QR code e seu numero fica ativo em minutos." },
  { n: "2", label: "Configure servicos, horarios e tom da IA", desc: "Ensine o que a IA deve saber sobre sua empresa." },
  { n: "3", label: "A IA comeca a responder e qualificar clientes", desc: "Atende 24h, agenda, faz follow-up e qualifica leads." },
  { n: "4", label: "Voce acompanha tudo pelo painel", desc: "Veja conversas, metricas e assuma quando quiser." },
];

const benefits = [
  { emoji: "🕐", title: "Atendimento 24h", desc: "Seus clientes recebem respostas a qualquer hora, todos os dias." },
  { emoji: "🇧🇷", title: "Respostas naturais em portugues", desc: "A IA conversa como um humano, sem parecer robo." },
  { emoji: "💰", title: "Mais leads convertidos", desc: "Qualifica automaticamente e aumenta sua taxa de conversao." },
  { emoji: "📅", title: "Agendamento automatico", desc: "Marca horarios sem precisar de atendente humano." },
  { emoji: "🔔", title: "Follow-up inteligente", desc: "Retoma contato com leads que pararam de responder." },
  { emoji: "👤", title: "Transferencia para humano", desc: "Transfere para atendente quando o cliente precisar." },
];

const niches = [
  { emoji: "💆", label: "Clinicas esteticas" },
  { emoji: "🦷", label: "Odontologia" },
  { emoji: "🏠", label: "Imobiliarias" },
  { emoji: "🍕", label: "Restaurantes" },
  { emoji: "⚖️", label: "Advocacia" },
  { emoji: "🛡️", label: "Seguros" },
  { emoji: "💪", label: "Academias" },
  { emoji: "📦", label: "E-commerce" },
  { emoji: "🚗", label: "Autoescolas" },
  { emoji: "📈", label: "Corretoras" },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "R$997",
    period: "/mes",
    highlight: false,
    badge: null as string | null,
    features: [
      "1 numero WhatsApp",
      "Respostas com IA",
      "Follow-ups basicos",
      "Painel de conversas",
      "Suporte mensal",
    ],
  },
  {
    name: "Pro",
    price: "R$1.997",
    period: "/mes",
    highlight: true,
    badge: "Mais Popular" as string | null,
    features: [
      "Tudo do Starter",
      "Follow-ups avancados",
      "Agendamento automatico",
      "Treinamento personalizado da IA",
      "Suporte prioritario",
    ],
  },
  {
    name: "Enterprise",
    price: "Personalizado",
    period: "",
    highlight: false,
    badge: null as string | null,
    features: [
      "Multiplos numeros",
      "White-label",
      "Integracoes personalizadas",
      "Onboarding dedicado",
    ],
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-green-600" />
            <span className="font-bold text-gray-900 text-lg">ZapReply AI</span>
          </div>
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
                Seu WhatsApp vendendo e respondendo clientes{" "}
                <span className="text-green-600">24h por dia</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Com o ZapReply AI, sua empresa responde clientes, agenda horarios, qualifica leads e faz
                follow-up automaticamente como se tivesse um funcionario treinado no WhatsApp.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <ScrollButton
                  targetId="demo-form"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-base"
                >
                  Ver demonstracao
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

            {/* WhatsApp Chat Mockup */}
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
                <div className="p-4 space-y-3 min-h-64">
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-800 text-sm px-3 py-2 rounded-2xl rounded-tl-sm max-w-[75%] shadow-sm">
                      Oi, quanto fica uma avaliacao?
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-[#DCF8C6] text-gray-800 text-sm px-3 py-2 rounded-2xl rounded-tr-sm max-w-[80%] shadow-sm">
                      Oi tudo bem? A avaliacao e gratuita e eu ja posso ver um horario pra voce. Voce prefere amanha de manha ou a tarde?
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-800 text-sm px-3 py-2 rounded-2xl rounded-tl-sm max-w-[75%] shadow-sm">
                      Amanha a tarde
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-[#DCF8C6] text-gray-800 text-sm px-3 py-2 rounded-2xl rounded-tr-sm max-w-[80%] shadow-sm">
                      Perfeito. Tenho 15h ou 16h30 disponivel. Qual fica melhor pra voce?
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-white border border-gray-100 rounded-xl p-4 text-center shadow-sm">
                <div className="w-3 h-3 rounded-full bg-green-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            Sua empresa perde clientes por demorar no WhatsApp?
          </h2>
          <div className="space-y-4 text-left max-w-xl mx-auto">
            {problems.map((p) => (
              <div key={p} className="flex items-center gap-3 bg-white border border-red-100 rounded-xl px-5 py-4 shadow-sm">
                <span className="text-xl">❌</span>
                <span className="text-gray-700">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Um funcionario IA treinado para atender sua empresa
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            O ZapReply AI conversa de forma natural com seus clientes, qualifica leads, realiza agendamentos
            e nunca esquece um follow-up. Tudo isso sem precisar de um atendente 24h por dia.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-green-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Como funciona
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {howItWorks.map((step) => (
              <div key={step.n} className="bg-white rounded-2xl p-6 shadow-sm border border-green-100 text-center">
                <div className="w-12 h-12 rounded-full bg-green-600 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {step.n}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.label}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Tudo que sua empresa precisa
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:border-green-200 hover:shadow-sm transition-all">
                <div className="text-3xl mb-3">{b.emoji}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{b.title}</h3>
                <p className="text-sm text-gray-600">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Niches */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Feito para empresas que vendem pelo WhatsApp
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Qualquer negocio que atende clientes pelo WhatsApp pode usar o ZapReply AI.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {niches.map((n) => (
              <div key={n.label} className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm hover:border-green-200 hover:shadow transition-all cursor-default">
                <div className="text-3xl mb-2">{n.emoji}</div>
                <p className="text-sm font-medium text-gray-700">{n.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Planos e precos
          </h2>
          <p className="text-center text-gray-600 mb-12">Escolha o plano ideal para o seu negocio.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 border ${
                  plan.highlight
                    ? "border-green-500 shadow-lg shadow-green-100 bg-green-50"
                    : "border-gray-200 bg-white shadow-sm"
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
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "border border-gray-300 hover:border-green-400 text-gray-700 hover:text-green-600"
                  }`}
                >
                  Quero uma demonstracao
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
              Solicite uma demonstracao gratuita
            </h2>
            <p className="text-gray-600">
              Preencha abaixo e nossa equipe vai te mostrar o ZapReply AI funcionando para o seu negocio.
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
              <p className="text-gray-400 text-sm">Funcionario IA para WhatsApp</p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Inicio</a>
              <Link href="/clinicas-esteticas" className="hover:text-white transition-colors">Clinicas Esteticas</Link>
              <Link href="/odontologia" className="hover:text-white transition-colors">Odontologia</Link>
              <Link href="/imobiliarias" className="hover:text-white transition-colors">Imobiliarias</Link>
              <Link href="/login" className="hover:text-white transition-colors">Login</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center">
            <p className="text-gray-500 text-sm">2025 ZapReply AI. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
