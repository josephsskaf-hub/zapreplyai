import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Gratuito",
    price: "R$0",
    period: "/mês",
    badge: null,
    features: ["100 mensagens/mês", "1 número WhatsApp", "IA básica", "Dashboard"],
    cta: "Plano atual",
    current: true,
    disabled: true,
  },
  {
    name: "Starter",
    price: "R$97",
    period: "/mês",
    badge: null,
    features: ["1.000 mensagens/mês", "2 números WhatsApp", "FAQ personalizado", "Suporte por email", "Relatórios básicos"],
    cta: "Assinar Starter",
    current: false,
    disabled: false,
  },
  {
    name: "Pro",
    price: "R$197",
    period: "/mês",
    badge: "Popular",
    features: ["Mensagens ilimitadas", "5 números WhatsApp", "Tudo do Starter", "Integração n8n/Calendar", "Suporte prioritário", "IA avançada"],
    cta: "Assinar Pro",
    current: false,
    disabled: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    badge: null,
    features: ["Tudo do Pro", "Números ilimitados", "SLA garantido", "Onboarding dedicado", "API personalizada"],
    cta: "Falar com vendas",
    current: false,
    disabled: false,
  },
];

export default function PlanosPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Planos</h1>
        <p className="text-gray-400 text-sm mt-1">Escolha o plano ideal para o seu negócio</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`bg-[#111111] border-[#1a1a1a] relative ${plan.badge ? "border-[#25D366]/40" : ""}`}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-[#25D366] text-black font-semibold text-xs">{plan.badge}</Badge>
              </div>
            )}
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-base">{plan.name}</CardTitle>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
                <span className="text-gray-400 text-sm">{plan.period}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-[#25D366] mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                className={
                  plan.current
                    ? "w-full border-[#2a2a2a] text-gray-400 bg-transparent hover:bg-[#1a1a1a] border"
                    : "w-full bg-[#25D366] hover:bg-[#1aab52] text-black font-semibold"
                }
                disabled={plan.disabled}
              >
                {plan.cta}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
