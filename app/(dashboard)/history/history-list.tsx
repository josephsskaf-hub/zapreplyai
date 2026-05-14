"use client";

import { useMemo, useState } from "react";
import { Copy, Search, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { formatDate } from "@/lib/utils";

type Generation = {
  id: string;
  input_message: string;
  output_message: string;
  goal: string | null;
  tone: string | null;
  business_type: string | null;
  created_at: string;
};

export function HistoryList({ items }: { items: Generation[] }) {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [rows, setRows] = useState(items);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.input_message.toLowerCase().includes(q) ||
        r.output_message.toLowerCase().includes(q)
    );
  }, [rows, query]);

  async function copy(text: string) {
    await navigator.clipboard.writeText(text);
    toast({ title: "Copiado!" });
  }

  async function remove(id: string) {
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.from("generations").delete().eq("id", id);
    if (error) {
      toast({
        title: "Não foi possível apagar",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    setRows((r) => r.filter((x) => x.id !== id));
    toast({ title: "Resposta apagada" });
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por texto…"
          className="pl-9"
        />
      </div>

      {filtered.length === 0 ? (
        <Card>
          <CardContent className="p-10 text-center text-slate-500">
            Nenhuma resposta encontrada.
          </CardContent>
        </Card>
      ) : (
        <ul className="space-y-3">
          {filtered.map((g) => (
            <li key={g.id}>
              <Card>
                <CardContent className="space-y-3 p-5">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span>{formatDate(g.created_at)}</span>
                    {g.goal && (
                      <Badge variant="secondary" className="font-normal">
                        {g.goal}
                      </Badge>
                    )}
                    {g.tone && (
                      <Badge variant="outline" className="font-normal">
                        {g.tone}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Cliente
                    </p>
                    <p className="text-sm text-slate-700">
                      {g.input_message}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-primary">
                      Resposta
                    </p>
                    <p className="whitespace-pre-wrap text-sm text-slate-800">
                      {g.output_message}
                    </p>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <Button size="sm" onClick={() => copy(g.output_message)}>
                      <Copy className="mr-2 h-4 w-4" /> Copiar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => remove(g.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Apagar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
