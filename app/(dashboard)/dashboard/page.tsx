import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageCircle, TrendingUp, Bot, Users, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function getDashboardData(userId: string) {
  const supabase = await createClient();

  const { data: businesses } = await supabase
    .from("businesses")
    .select("*")
    .eq("user_id", userId);

  const businessIds = businesses?.map((b) => b.id) ?? [];

  let totalConversations = 0;
  let todayMessages = 0;
  let recentConversations: Array<{
    id: string;
    contact_name: string | null;
    contact_phone: string;
    status: string;
    last_message_at: string;
  }> = [];

  if (businessIds.length > 0) {
    const { count } = await supabase
      .from("conversations")
      .select("*", { count: "exact", head: true })
      .in("business_id", businessIds);

    totalConversations = count ?? 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { data: convIds } = await supabase
      .from("conversations")
      .select("id")
      .in("business_id", businessIds);

    if (convIds && convIds.length > 0) {
      const ids = convIds.map((c) => c.id);
      const { count: msgCount } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .in("conversation_id", ids)
        .gte("sent_at", today.toISOString());

      todayMessages = msgCount ?? 0;
    }

    const { data: convs } = await supabase
      .from("conversations")
      .select("id, contact_name, contact_phone, status, last_message_at")
      .in("business_id", businessIds)
      .order("last_message_at", { ascending: false })
      .limit(5);

    recentConversations = convs ?? [];
  }

  const isConfigured = businesses && businesses.length > 0 && businesses[0].whatsapp_connected;
  const hasAISettings = businesses && businesses.length > 0;

  return {
    totalConversations,
    todayMessages,
    businesses: businesses ?? [],
    recentConversations,
    isConfigured,
    hasAISettings,
  };
}

const statusColors: Record<string, string> = {
  open: "bg-green-500/10 text-green-400 border-green-500/20",
  resolved: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

const statusLabels: Record<string, string> = {
  open: "Aberta",
  resolved: "Resolvida",
  pending: "Pendente",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const data = await getDashboardData(user.id);

  const setupTasks = [
    { label: "Conectar WhatsApp", done: data.isConfigured ?? false, href: "/dashboard/integracoes" },
    { label: "Treinar IA", done: data.hasAISettings ?? false, href: "/dashboard/configurar-ia" },
    { label: "Adicionar FAQ", done: false, href: "/dashboard/configurar-ia" },
  ];

  const allDone = setupTasks.every((t) => t.done);

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Visão geral do seu atendimento</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card className="bg-[#111111] border-[#1a1a1a]">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm">Total de conversas</span>
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
            </div>
            <p className="text-3xl font-bold text-white">{data.totalConversations}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#111111] border-[#1a1a1a]">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm">Mensagens hoje</span>
              <TrendingUp className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-3xl font-bold text-white">{data.todayMessages}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#111111] border-[#1a1a1a]">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm">Taxa de resposta IA</span>
              <Bot className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-3xl font-bold text-white">94%</p>
          </CardContent>
        </Card>
        <Card className="bg-[#111111] border-[#1a1a1a]">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm">Leads gerados</span>
              <Users className="w-4 h-4 text-orange-400" />
            </div>
            <p className="text-3xl font-bold text-white">{Math.floor(data.totalConversations * 0.3)}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent conversations */}
        <div className="xl:col-span-2">
          <Card className="bg-[#111111] border-[#1a1a1a]">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-base">Conversas recentes</CardTitle>
            </CardHeader>
            <CardContent>
              {data.recentConversations.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <MessageCircle className="w-10 h-10 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Nenhuma conversa ainda</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {data.recentConversations.map((conv) => (
                    <div
                      key={conv.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#25D366]/20 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                          <span className="text-[#25D366] text-sm font-medium">
                            {(conv.contact_name ?? conv.contact_phone)[0].toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">
                            {conv.contact_name ?? conv.contact_phone}
                          </p>
                          <p className="text-xs text-gray-500">{conv.contact_phone}</p>
                        </div>
                      </div>
                      <Badge className={`text-xs border ${statusColors[conv.status] ?? ""}`}>
                        {statusLabels[conv.status] ?? conv.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Setup checklist */}
        {!allDone && (
          <Card className="bg-[#111111] border-[#1a1a1a]">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-base">Configuração inicial</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {setupTasks.map((task) => (
                <Link key={task.label} href={task.href}>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#25D366]/20 transition-colors cursor-pointer">
                    {task.done ? (
                      <CheckCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-yellow-400 shrink-0" />
                    )}
                    <span className={`text-sm ${task.done ? "text-gray-500 line-through" : "text-white"}`}>
                      {task.label}
                    </span>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
