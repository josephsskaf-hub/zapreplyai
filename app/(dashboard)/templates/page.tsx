import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TEMPLATES } from "@/lib/constants";

export const metadata = { title: "Templates" };

export default function TemplatesPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Templates</h1>
        <p className="text-slate-600">
          Modelos prontos para os cenários mais comuns. Clique para começar.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {TEMPLATES.map((t) => (
          <Card key={t.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-base">{t.title}</CardTitle>
              <CardDescription>{t.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Button asChild className="w-full">
                <Link
                  href={`/generate?goal=${encodeURIComponent(
                    t.goal
                  )}&tone=${encodeURIComponent(t.tone)}`}
                >
                  <Sparkles className="mr-2 h-4 w-4" /> Usar template
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
