import { createSupabaseServerClient } from "@/lib/supabase/server";
import { HistoryList } from "./history-list";

export const metadata = { title: "Histórico" };

export default async function HistoryPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("generations")
    .select("id, input_message, output_message, goal, tone, business_type, created_at")
    .eq("user_id", user?.id ?? "")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Histórico</h1>
        <p className="text-slate-600">
          Suas respostas geradas. Pesquise, copie ou apague.
        </p>
      </div>
      <HistoryList items={data ?? []} />
    </div>
  );
}
