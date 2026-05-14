"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";

export function UpgradeButton({
  plan,
  className,
}: {
  plan: "free" | "pro";
  className?: string;
}) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  if (plan === "free") {
    return (
      <Button asChild variant="outline" className={className}>
        <Link href="/signup">Começar grátis</Link>
      </Button>
    );
  }

  async function startCheckout() {
    setLoading(true);
    try {
      trackEvent("checkout_started");
      const res = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
      });
      const json = await res.json();
      if (!res.ok || !json.url) {
        if (res.status === 401) {
          window.location.href = "/signup";
          return;
        }
        toast({
          title: "Não conseguimos iniciar o checkout",
          description: json.error ?? "Tente novamente.",
          variant: "destructive",
        });
        return;
      }
      window.location.href = json.url;
    } catch (err) {
      toast({
        title: "Erro inesperado",
        description: err instanceof Error ? err.message : "Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button className={className} onClick={startCheckout} disabled={loading}>
      {loading ? "Abrindo checkout…" : "Assinar Pro"}
    </Button>
  );
}
