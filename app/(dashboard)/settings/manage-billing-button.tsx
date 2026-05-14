"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function ManageBillingButton({ plan }: { plan: "free" | "pro" }) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function openPortal() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/create-portal-session", {
        method: "POST",
      });
      const json = await res.json();
      if (!res.ok || !json.url) {
        toast({
          title: "Não conseguimos abrir o portal",
          description: json.error ?? "Tente novamente.",
          variant: "destructive",
        });
        return;
      }
      window.location.href = json.url;
    } catch (err) {
      toast({
        title: "Erro",
        description: err instanceof Error ? err.message : "Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  if (plan === "pro") {
    return (
      <Button onClick={openPortal} disabled={loading}>
        {loading ? "Abrindo…" : "Gerenciar assinatura"}
      </Button>
    );
  }

  return (
    <Button asChild>
      <Link href="/pricing">Fazer upgrade para Pro</Link>
    </Button>
  );
}
