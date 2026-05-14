import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UpgradeButton } from "./upgrade-button";
import { FREE_MONTHLY_LIMIT, PRO_MONTHLY_LIMIT } from "@/lib/constants";

export const metadata = { title: "Preços" };

export default function PricingPage() {
  return (
    <section className="container py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-slate-900 md:text-5xl">
          Planos simples, sem pegadinha
        </h1>
        <p className="mt-4 text-slate-600">
          Comece grátis. Faça upgrade quando precisar de mais. Cancele a qualquer momento.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Free</CardTitle>
            <CardDescription>Para experimentar e atender pouco volume.</CardDescription>
            <div className="mt-2">
              <span className="text-4xl font-bold text-slate-900">R$ 0</span>
              <span className="text-slate-500">/mês</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 text-primary" />
                {FREE_MONTHLY_LIMIT} respostas por mês
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 text-primary" />
                Todos os templates
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 text-primary" />
                Histórico de respostas
              </li>
            </ul>
            <UpgradeButton plan="free" className="mt-6 w-full" />
          </CardContent>
        </Card>

        <Card className="border-primary shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Pro</CardTitle>
              <Badge>Mais popular</Badge>
            </div>
            <CardDescription>Para quem atende todo dia no WhatsApp.</CardDescription>
            <div className="mt-2">
              <span className="text-4xl font-bold text-slate-900">R$ 29</span>
              <span className="text-slate-500">/mês</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 text-primary" />
                {PRO_MONTHLY_LIMIT} respostas por mês
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 text-primary" />
                Geração de variações e follow-ups
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 text-primary" />
                Suporte prioritário
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 text-primary" />
                Cancele a qualquer momento
              </li>
            </ul>
            <UpgradeButton plan="pro" className="mt-6 w-full" />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
