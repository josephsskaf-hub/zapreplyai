import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export type SeoToolPageProps = {
  h1: string;
  intro: string;
  paragraphs: string[];
  bullets?: string[];
  example?: { client: string; reply: string };
  ctaLabel?: string;
};

export function SeoToolPage({
  h1,
  intro,
  paragraphs,
  bullets,
  example,
  ctaLabel = "Criar minha conta grátis",
}: SeoToolPageProps) {
  return (
    <section className="container py-12 md:py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          {h1}
        </h1>
        <p className="mt-4 text-lg text-slate-600">{intro}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/signup">
              <Sparkles className="mr-2 h-4 w-4" /> {ctaLabel}
            </Link>
          </Button>
        </div>

        <div className="prose prose-slate mt-12 max-w-none">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-slate-700">
              {p}
            </p>
          ))}
        </div>

        {bullets && bullets.length > 0 && (
          <div className="mt-8 space-y-2">
            {bullets.map((b) => (
              <div
                key={b}
                className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <p className="text-slate-700">{b}</p>
              </div>
            ))}
          </div>
        )}

        {example && (
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="p-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Cliente
                </p>
                <p className="text-slate-800">{example.client}</p>
              </CardContent>
            </Card>
            <Card className="border-primary/30 bg-accent">
              <CardContent className="p-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
                  Resposta sugerida
                </p>
                <p className="whitespace-pre-wrap text-slate-800">
                  {example.reply}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="mt-16 rounded-lg border border-primary/20 bg-accent p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            Experimente grátis agora
          </h2>
          <p className="mt-2 text-slate-600">
            10 respostas por mês no plano grátis. Sem cartão.
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link href="/signup">{ctaLabel}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
