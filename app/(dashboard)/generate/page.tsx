import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GenerateForm } from "./generate-form";

export const metadata = { title: "Gerar resposta" };

type Props = {
  searchParams: { goal?: string; tone?: string };
};

export default function GeneratePage({ searchParams }: Props) {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
          Gerar resposta
        </h1>
        <p className="text-slate-600">
          Cole a mensagem do cliente e gere uma resposta pronta para enviar.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Detalhes da mensagem</CardTitle>
          <CardDescription>
            Quanto mais contexto você fornecer, melhor fica a resposta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GenerateForm
            initialGoal={searchParams.goal}
            initialTone={searchParams.tone}
          />
        </CardContent>
      </Card>
    </div>
  );
}
