import { SupabaseClient } from "@supabase/supabase-js";
import { currentMonthKey } from "@/lib/utils";
import { FREE_MONTHLY_LIMIT, PRO_MONTHLY_LIMIT } from "@/lib/constants";

export type Plan = "free" | "pro";

export function limitForPlan(plan: Plan | string | null | undefined) {
  return plan === "pro" ? PRO_MONTHLY_LIMIT : FREE_MONTHLY_LIMIT;
}

export async function getCurrentUsage(
  supabase: SupabaseClient,
  userId: string
) {
  const month = currentMonthKey();
  const { data } = await supabase
    .from("usage_counters")
    .select("count")
    .eq("user_id", userId)
    .eq("month", month)
    .maybeSingle();
  return data?.count ?? 0;
}

export async function incrementUsage(
  supabase: SupabaseClient,
  userId: string
) {
  const month = currentMonthKey();
  const { data: existing } = await supabase
    .from("usage_counters")
    .select("id, count")
    .eq("user_id", userId)
    .eq("month", month)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("usage_counters")
      .update({ count: existing.count + 1, updated_at: new Date().toISOString() })
      .eq("id", existing.id);
    return existing.count + 1;
  }
  await supabase
    .from("usage_counters")
    .insert({ user_id: userId, month, count: 1 });
  return 1;
}
