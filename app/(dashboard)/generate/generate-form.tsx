"use client";

import { useState } from "react";
import { Sparkles, Copy, RotateCcw, MessageSquare, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";
import { BUSINESS_TYPES, GOALS, TONES } from "@/lib/constants";

type Mode = "reply" | "followup" | "variation";

export function GenerateForm({
  initialGoal,
  initialTone,
}: {
  initialGoal?: string;
  initialTone?: string;
}) {
  const { toast } = useToast();
  const [inputMessage, setInputMessage] = useState("");
  const [businessContext, setBusinessContext] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [goal, setGoal] = useState(initialGoal ?? "");
  const [tone, setTone] = useState(initialTone ?? "");
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState<Mode | null>(null);

  async function generate(mode: Mode) {
    if (!inputMessage.trim()) {
      toast({
        title: "Mensagem obrigatória",
        description: "Cole a mensagem que você recebeu do cliente.",
        variant: "destructive",
      });
      return;
    }
    setLoading(mode);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          inputMessage,
          businessContext: businessContext || undefined,
          businessType: businessType || undefined,
          goal: goal || undefined,
          tone: tone || undefined,
          mode,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        toast({
          title: "Não foi possível gerar",
          description: json.error ?? "Tente novamente.",
          variant: "destructive",
        });
        return;
      }
      setOutput(json.output);
      trackEvent("generation_created", { mode });
      toast({ title: "Resposta gerada", description: "Salva no histórico." });
    } catch (err) {
      toast({
        title: "Erro inesperado",
        description: err instanceof Error ? err.message : "Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  }

  async function copyOutput() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    toast({ title: "Copiado!", description: "Cole no WhatsApp e envie." });
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="input">Mensagem do cliente *</Label>
        <Textarea
          id="input"
          rows={4}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Cole aqui a mensagem que o cliente enviou…"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="context">Contexto do negócio (opcional)</Label>
        <Textarea
          id="context"
          rows={2}
          value={businessContext}
          onChange={(e) => setBusinessContext(e.target.value)}
          placeholder="Ex: Atendo de seg a sex das 9h às 18h. Faço corte e barba."
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label>Tipo de negócio</Label>
          <Select value={businessType} onValueChange={setBusinessType}>
            <SelectTrigger>
              <SelectValue placeholder="Selecionar" />
            </SelectTrigger>
            <SelectContent>
              {BUSINESS_TYPES.map((b) => (
                <SelectItem key={b.value} value={b.value}>
                  {b.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Objetivo</Label>
          <Select value={goal} onValueChange={setGoal}>
            <SelectTrigger>
              <SelectValue placeholder="Selecionar" />
            </SelectTrigger>
            <SelectContent>
              {GOALS.map((g) => (
                <SelectItem key={g.value} value={g.value}>
                  {g.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Tom</Label>
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger>
              <SelectValue placeholder="Selecionar" />
            </SelectTrigger>
            <SelectContent>
              {TONES.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        type="button"
        size="lg"
        className="w-full"
        onClick={() => generate("reply")}
        disabled={loading !== null}
      >
        <Sparkles className="mr-2 h-4 w-4" />
        {loading === "reply" ? "Gerando…" : "Gerar resposta"}
      </Button>

      {output && (
        <Card className="border-primary/30 bg-accent">
          <CardContent className="p-6">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <Sparkles className="h-4 w-4" /> Resposta gerada
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Save className="h-3 w-3" /> Salvo no histórico
              </div>
            </div>
            <div className="rounded-md bg-white p-4 text-slate-800 shadow-sm whitespace-pre-wrap">
              {output}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button onClick={copyOutput} size="sm">
                <Copy className="mr-2 h-4 w-4" /> Copiar
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => generate("variation")}
                disabled={loading !== null}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                {loading === "variation" ? "Gerando…" : "Gerar outra versão"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => generate("followup")}
                disabled={loading !== null}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                {loading === "followup" ? "Gerando…" : "Gerar follow-up"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
