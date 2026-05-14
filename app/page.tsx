import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Bot, Zap, BarChart3, Check, Star, ArrowRight, Smartphone } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "IA Treinada pro seu Negócio",
    description: "Descreva seus produtos, FAQs e tom de voz. A IA aprende e responde como você.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    icon: Zap,
    title: "Respostas Instantâneas",
    description: "Nunca mais deixe cliente sem resposta. A IA responde em segundos, 24 horas por dia.",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    icon: BarChart3,
    title: "Controle Total",
    description: "Veja todas as conversas, assuma o atendimento quando quiser, monitore métricas em tempo real.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
];

const steps = [
  { n: "1", label: "Conecte seu WhatsApp Business", desc: "Escaneie o QR code e seu número já está ativo." },
  { n: "2", label: "Treine a IA com seu negócio", desc: "Adicione FAQ, produtos e personalize o tom de voz." },
  { n: "3", label: "A IA atende automaticamente", desc: "Seus clientes recebem respostas imediatas, 24/7." },
];

const plans = [
  {
    name: "Gratuito",
    price: "R$0",
    period: "/mês",
    features: ["100 mensagens/mês", "1 número WhatsApp", "IA básica"],
    cta: "Começar grátis",
    highlight: false,
  },
  {
    name: "Starter",
    price: "R$97",
    period: "/mês",
    features: ["1.000 mensagens/mês", "2 números", "FAQ personalizado", "Suporte email"],
    cta: "Assinar Starter",
    highlight: false,
  },
  {
    name: "Pro",
    price: "R$197",
    period: "/mês",
    features: ["Mensagens ilimitadas", "5 números", "Integração n8n/Calendar", "Suporte prioritário"],
    cta: "Assinar Pro",
    highlight: true,
    badge: "Mais popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    features: ["Tudo do Pro", "Números ilimitados", "SLA", "Onboarding dedicado"],
    cta: "Falar com vendas",
    highlight: false,
  },
];

const testimonials = [
  {
    name: "Mariana Costa",
    role: "Proprietária, Boutique MC",
    text: "Antes eu ficava respondendo WhatsApp até meia-noite. Agora a IA atende tudo e só me avisa quando precisa de mim. Vendas aumentaram 40%.",
    rating: 5,
  },
  {
    name: "Ricardo Alves",
    role: "Dono, Auto Peças Alves",
    text: "Configurei em 10 minutos. A IA responde sobre preços, disponibilidade e horário. Minha equipe ficou livre pra focar em outras coisas.",
    rating: 5,
  },
  {
    name: "Fernanda Lima",
    role: "CEO, Clínica Bem Estar",
    text: "Usamos para agendamentos. A IA responde dúvidas sobre consultas e repassa os casos urgentes pra mim. Excelente custo-benefício.",
    rating: 5,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1a1a1a] bg-[#0a0a0a]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-[#25D366]" />
            <span className="font-bold text-white">ZapReply AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Funcionalidades</a>
            <a href="#how" className="hover:text-white transition-colors">Como funciona</a>
            <a href="#pricing" className="hover:text-white transition-colors">Preços</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">Entrar</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-[#25D366] hover:bg-[#1aab52] text-black font-semibold">
                Começar grátis
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative">
          <Badge className="bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 mb-6 text-sm px-4 py-1.5">
            🚀 +500 negócios brasileiros já usam
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Atenda seus clientes no{" "}
            <span className="text-[#25D366]">WhatsApp com IA</span>, 24/7
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Configure em 5 minutos. Sem código. Sem complicação. Sua IA atende, vende e qualifica
            leads enquanto você foca no que importa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-[#25D366] hover:bg-[#1aab52] text-black font-bold text-lg px-8 gap-2">
                Começar grátis
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <a href="#how">
              <Button size="lg" variant="outline" className="border-[#2a2a2a] text-white hover:bg-[#1a1a1a] text-lg px-8">
                Ver como funciona
              </Button>
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Grátis para sempre até 100 mensagens/mês. Sem cartão de crédito.
          </p>

          {/* WhatsApp mockup */}
          <div className="mt-16 max-w-sm mx-auto">
            <div className="bg-[#111111] rounded-3xl border border-[#1a1a1a] p-4 shadow-2xl shadow-[#25D366]/5">
              <div className="flex items-center gap-3 pb-3 border-b border-[#1a1a1a] mb-3">
                <div className="w-8 h-8 rounded-full bg-[#25D366]/20 flex items-center justify-center">
                  <Smartphone className="w-4 h-4 text-[#25D366]" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Loja XYZ</p>
                  <p className="text-[#25D366] text-xs">● Online agora</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-end">
                  <div className="bg-[#25D366] text-black text-sm px-3 py-2 rounded-2xl rounded-tr-sm max-w-xs">
                    Olá! Vocês têm o produto X disponível?
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-[#1a1a1a] text-white text-sm px-3 py-2 rounded-2xl rounded-tl-sm max-w-xs">
                    Olá! Sim, temos o produto X em estoque 🎉 O preço é R$99. Posso te ajudar com mais alguma coisa?
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-[#25D366] text-black text-sm px-3 py-2 rounded-2xl rounded-tr-sm max-w-xs">
                    Perfeito! Como faço pra comprar?
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-[#1a1a1a] text-white text-sm px-3 py-2 rounded-2xl rounded-tl-sm max-w-xs">
                    Ótimo! Você pode comprar pelo nosso site ou me enviar seu endereço 😊
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-600 text-center mt-3">Respondido pela IA em 2 segundos ⚡</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 border-t border-[#1a1a1a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Tudo que você precisa</h2>
            <p className="text-gray-400 text-lg">
              Uma plataforma completa para automatizar seu atendimento no WhatsApp
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <Card key={f.title} className="bg-[#111111] border-[#1a1a1a] hover:border-[#25D366]/20 transition-colors">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-2xl ${f.bg} flex items-center justify-center mb-4`}>
                    <f.icon className={`w-6 h-6 ${f.color}`} />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20 px-4 border-t border-[#1a1a1a] bg-[#111111]/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Como funciona</h2>
            <p className="text-gray-400 text-lg">Comece a atender com IA em menos de 5 minutos</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.n} className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#25D366] text-2xl font-bold">{step.n}</span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{step.label}</h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-16 px-4 border-t border-[#1a1a1a]">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-gray-400 text-lg mb-8">
            Usado por <strong className="text-white">+500 negócios brasileiros</strong> de todos os segmentos
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="bg-[#111111] border-[#1a1a1a]">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                  <div>
                    <p className="text-white text-sm font-medium">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 border-t border-[#1a1a1a] bg-[#111111]/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Preços simples e transparentes</h2>
            <p className="text-gray-400 text-lg">Sem taxas escondidas. Cancele quando quiser.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`bg-[#111111] relative ${plan.highlight ? "border-[#25D366]/50" : "border-[#1a1a1a]"}`}
              >
                {plan.highlight && plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-[#25D366] text-black font-semibold text-xs">{plan.badge}</Badge>
                  </div>
                )}
                <CardContent className="p-5">
                  <p className="text-white font-semibold mb-2">{plan.name}</p>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-2xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-500 text-sm">{plan.period}</span>
                  </div>
                  <ul className="space-y-1.5 mb-5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                        <Check className="w-3.5 h-3.5 text-[#25D366] mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/signup">
                    <Button
                      className={`w-full text-sm font-semibold ${
                        plan.highlight
                          ? "bg-[#25D366] hover:bg-[#1aab52] text-black"
                          : "border-[#2a2a2a] bg-transparent text-white hover:bg-[#1a1a1a] border"
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 border-t border-[#1a1a1a] text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para automatizar seu WhatsApp?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Junte-se a +500 negócios brasileiros que já economizam horas por dia com ZapReply AI.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-[#25D366] hover:bg-[#1aab52] text-black font-bold text-lg px-10 gap-2">
              Começar grátis agora
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            Sem cartão de crédito. Grátis até 100 mensagens/mês.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-[#1a1a1a]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#25D366]" />
            <span className="font-bold text-white">ZapReply AI</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Termos de uso</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Contato</a>
          </div>
          <p className="text-gray-600 text-sm">© ZapReply AI 2025. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
