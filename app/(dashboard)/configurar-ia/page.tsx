"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { Plus, Trash2, Save, CheckCircle } from "lucide-react";

type Tone = "professional" | "friendly" | "formal";

type FormData = {
  ai_name: string;
  business_type: string;
  tone: Tone;
  base_prompt: string;
  off_hours_message: string;
  response_delay_seconds: number;
  ai_enabled: boolean;
  escalation_keywords: string;
};

type FAQItem = { question: string; answer: string };

type ScheduleDay = {
  enabled: boolean;
  start: string;
  end: string;
};

const DAYS = ["Segunda", "Terca", "Quarta", "Quinta", "Sexta", "Sabado", "Domingo"];

const defaultSchedule: ScheduleDay[] = [
  { enabled: true, start: "08:00", end: "18:00" },
  { enabled: true, start: "08:00", end: "18:00" },
  { enabled: true, start: "08:00", end: "18:00" },
  { enabled: true, start: "08:00", end: "18:00" },
  { enabled: true, start: "08:00", end: "18:00" },
  { enabled: false, start: "09:00", end: "13:00" },
  { enabled: false, start: "09:00", end: "13:00" },
];

export default function ConfigurarIAPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [settingsId, setSettingsId] = useState<string | null>(null);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [schedule, setSchedule] = useState<ScheduleDay[]>(defaultSchedule);
  const [form, setForm] = useState<FormData>({
    ai_name: "Assistente",
    business_type: "",
    tone: "professional",
    base_prompt: "",
    off_hours_message: "",
    response_delay_seconds: 3,
    ai_enabled: true,
    escalation_keywords: "falar com humano, atendente, gerente, reclamacao",
  });

  const loadSettings = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data: businesses } = await supabase
      .from("businesses")
      .select("id")
      .eq("user_id", user.id)
      .limit(1);
    if (!businesses?.length) {
      setLoading(false);
      return;
    }

    const bId = businesses[0].id;
    setBusinessId(bId);

    const { data: settings } = await supabase
      .from("ai_settings")
      .select("*")
      .eq("business_id", bId)
      .single();

    if (settings) {
      setSettingsId(settings.id);
      setForm({
        ai_name: settings.ai_name ?? "Assistente",
        business_type: settings.business_type ?? "",
        tone: (settings.tone ?? "professional") as Tone,
        base_prompt: settings.base_prompt ?? "",
        off_hours_message: settings.off_hours_message ?? "",
        response_delay_seconds: settings.response_delay_seconds ?? 3,
        ai_enabled: settings.ai_enabled ?? true,
        escalation_keywords: settings.escalation_keywords ?? "falar com humano, atendente, gerente, reclamacao",
      });
      setFaqs(settings.faq ?? []);
      if (settings.schedule) setSchedule(settings.schedule);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const handleChange = (field: keyof FormData, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessId) {
      toast({ title: "Nenhum negocio configurado", variant: "destructive" });
      return;
    }
    setSaving(true);
    const payload = { ...form, faq: faqs, schedule, business_id: businessId };

    if (settingsId) {
      const { error } = await supabase.from("ai_settings").update(payload).eq("id", settingsId);
      if (error) {
        toast({ title: "Erro ao salvar", variant: "destructive" });
        setSaving(false);
        return;
      }
    } else {
      const { data: newSettings, error } = await supabase
        .from("ai_settings")
        .insert(payload)
        .select()
        .single();
      if (error) {
        toast({ title: "Erro ao salvar", variant: "destructive" });
        setSaving(false);
        return;
      }
      setSettingsId(newSettings.id);
    }

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    toast({ title: "Configuracoes salvas!" });
  };

  const addFaq = () => setFaqs((prev) => [...prev, { question: "", answer: "" }]);
  const updateFaq = (i: number, field: keyof FAQItem, val: string) =>
    setFaqs((prev) => prev.map((f, idx) => (idx === i ? { ...f, [field]: val } : f)));
  const removeFaq = (i: number) => setFaqs((prev) => prev.filter((_, idx) => idx !== i));

  const updateSchedule = (i: number, field: keyof ScheduleDay, val: string | boolean) =>
    setSchedule((prev) => prev.map((d, idx) => (idx === i ? { ...d, [field]: val } : d)));

  if (loading) {
    return (
      <div className="p-6 lg:p-8 space-y-6">
        <Skeleton className="h-8 w-48 bg-[#1a1a1a]" />
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full bg-[#1a1a1a] rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Configurar IA</h1>
          <p className="text-gray-400 text-sm mt-1">Personalize como a IA responde seus clientes</p>
        </div>
        {saved && (
          <Badge className="bg-green-500/10 text-green-400 border border-green-500/20 gap-1">
            <CheckCircle className="w-3 h-3" /> Salvo
          </Badge>
        )}
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Identidade da IA */}
        <Card className="bg-[#111111] border-[#1a1a1a]">
          <CardHeader>
            <CardTitle className="text-white text-base">Identidade da IA</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-300">IA ativada</Label>
                <p className="text-xs text-gray-500 mt-0.5">Permite que a IA responda automaticamente</p>
              </div>
              <Switch
                checked={form.ai_enabled}
                onCheckedChange={(val) => handleChange("ai_enabled", val)}
                className="data-[state=checked]:bg-[#25D366]"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-300">Nome da IA</Label>
                <Input
                  value={form.ai_name}
                  onChange={(e) => handleChange("ai_name", e.target.value)}
                  required
                  placeholder="Ex: Assistente, Sofia, Mariana..."
                  className="bg-[#0a0a0a] border-[#2a2a2a] text-white placeholder:text-gray-600"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Tipo de negocio</Label>
                <Select
                  value={form.business_type}
                  onValueChange={(val) => handleChange("business_type", val)}
                >
                  <SelectTrigger className="bg-[#0a0a0a] border-[#2a2a2a] text-white">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111111] border-[#2a2a2a] text-white">
                    <SelectItem value="clinica-estetica">Clinica Estetica</SelectItem>
                    <SelectItem value="odontologia">Odontologia</SelectItem>
                    <SelectItem value="imobiliaria">Imobiliaria</SelectItem>
                    <SelectItem value="restaurante">Restaurante</SelectItem>
                    <SelectItem value="advocacia">Advocacia</SelectItem>
                    <SelectItem value="academia">Academia</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">Tom de voz</Label>
              <Select
                value={form.tone}
                onValueChange={(val) => handleChange("tone", val as Tone)}
              >
                <SelectTrigger className="bg-[#0a0a0a] border-[#2a2a2a] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#111111] border-[#2a2a2a] text-white">
                  <SelectItem value="professional">Profissional</SelectItem>
                  <SelectItem value="friendly">Amigavel</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">Prompt base (instrucoes gerais)</Label>
              <Textarea
                value={form.base_prompt}
                onChange={(e) => handleChange("base_prompt", e.target.value)}
                placeholder="Ex: Voce e a assistente da Clinica XYZ. Responda de forma educada, focando em ajudar o cliente..."
                rows={4}
                className="bg-[#0a0a0a] border-[#2a2a2a] text-white placeholder:text-gray-600 resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Servicos e FAQ */}
        <Card className="bg-[#111111] border-[#1a1a1a]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white text-base">Servicos e FAQ</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addFaq}
              className="border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/10"
            >
              <Plus className="w-4 h-4 mr-1" /> Adicionar
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {faqs.length === 0 && (
              <p className="text-gray-500 text-sm text-center py-4">
                Adicione perguntas e respostas que a IA deve saber responder
              </p>
            )}
            {faqs.map((faq, i) => (
              <div key={i} className="p-3 bg-[#0a0a0a] rounded-xl border border-[#1a1a1a] space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Pergunta..."
                    value={faq.question}
                    onChange={(e) => updateFaq(i, "question", e.target.value)}
                    className="bg-[#111111] border-[#2a2a2a] text-white placeholder:text-gray-600 flex-1"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFaq(i)}
                    className="text-red-400 hover:bg-red-500/10 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <Textarea
                  placeholder="Resposta..."
                  value={faq.answer}
                  onChange={(e) => updateFaq(i, "answer", e.target.value)}
                  rows={2}
                  className="bg-[#111111] border-[#2a2a2a] text-white placeholder:text-gray-600 resize-none"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Horario de Atendimento */}
        <Card className="bg-[#111111] border-[#1a1a1a]">
          <CardHeader>
            <CardTitle className="text-white text-base">Horario de Atendimento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {DAYS.map((day, i) => (
              <div key={day} className="flex items-center gap-4">
                <Switch
                  checked={schedule[i].enabled}
                  onCheckedChange={(val) => updateSchedule(i, "enabled", val)}
                  className="data-[state=checked]:bg-[#25D366]"
                />
                <span className={`text-sm w-16 shrink-0 ${schedule[i].enabled ? "text-white" : "text-gray-600"}`}>
                  {day}
                </span>
                {schedule[i].enabled ? (
                  <div className="flex items-center gap-2">
                    <Input
                      type="time"
                      value={schedule[i].start}
                      onChange={(e) => updateSchedule(i, "start", e.target.value)}
                      className="bg-[#0a0a0a] border-[#2a2a2a] text-white w-28 text-sm"
                    />
                    <span className="text-gray-500 text-sm">ate</span>
                    <Input
                      type="time"
                      value={schedule[i].end}
                      onChange={(e) => updateSchedule(i, "end", e.target.value)}
                      className="bg-[#0a0a0a] border-[#2a2a2a] text-white w-28 text-sm"
                    />
                  </div>
                ) : (
                  <span className="text-gray-600 text-sm">Fechado</span>
                )}
              </div>
            ))}
            <div className="pt-3 border-t border-[#1a1a1a] space-y-2">
              <Label className="text-gray-300">Mensagem fora do horario</Label>
              <Textarea
                value={form.off_hours_message}
                onChange={(e) => handleChange("off_hours_message", e.target.value)}
                placeholder="Ex: Ola! Estamos fora do horario de atendimento. Retornaremos em breve."
                rows={2}
                className="bg-[#0a0a0a] border-[#2a2a2a] text-white placeholder:text-gray-600 resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Escalada para Humano */}
        <Card className="bg-[#111111] border-[#1a1a1a]">
          <CardHeader>
            <CardTitle className="text-white text-base">Escalada para Humano</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-300 mb-2 block">
                Palavras-chave que acionam transferencia para atendente humano
              </Label>
              <Textarea
                value={form.escalation_keywords}
                onChange={(e) => handleChange("escalation_keywords", e.target.value)}
                placeholder="Ex: falar com humano, atendente, gerente, reclamacao"
                rows={3}
                className="bg-[#0a0a0a] border-[#2a2a2a] text-white placeholder:text-gray-600 resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Separe as palavras-chave por virgula. Quando o cliente mencionar alguma delas, a conversa sera transferida.
              </p>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">
                Delay de resposta: <span className="text-[#25D366]">{form.response_delay_seconds}s</span>
              </Label>
              <input
                type="range"
                min={0}
                max={10}
                value={form.response_delay_seconds}
                onChange={(e) => handleChange("response_delay_seconds", Number(e.target.value))}
                className="w-full accent-[#25D366]"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0s (imediato)</span>
                <span>10s</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button
          type="submit"
          className="bg-[#25D366] hover:bg-[#1aab52] text-black font-semibold gap-2"
          disabled={saving}
        >
          <Save className="w-4 h-4" />
          {saving ? "Salvando..." : "Salvar configuracoes"}
        </Button>
      </form>
    </div>
  );
}
