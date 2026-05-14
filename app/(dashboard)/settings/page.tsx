import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ManageBillingButton } from "./manage-billing-button";
import { limitForPlan } from "@/lib/usage";

export const metadata = { title: "Configurações" };

export default async function SettingsPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan, stripe_customer_id, email")
    .eq("id", user?.id ?? "")
    .maybeSingle();

  const plan = (profile?.plan as "free" | "pro" | undefined) ?? "free";

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Configurações</h1>
        <p className="text-slate-600">Conta, plano e cobrança.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Conta</CardTitle>
          <CardDescription>Suas informações de acesso.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Email</span>
            <span className="text-slate-800">{profile?.email ?? user?.email}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Plano</CardTitle>
          <CardDescription>Seu plano atual e cobrança.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Plano</span>
            <Badge variant={plan === "pro" ? "default" : "secondary"}>
              {plan === "pro" ? "Pro" : "Free"}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Limite mensal</span>
            <span className="text-slate-800">
              {limitForPlan(plan)} respostas / mês
            </span>
          </div>
          <div className="pt-2">
            <ManageBillingButton plan={plan} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
