"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { MessageSquare, Loader2, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
      setLoading(false);
      return;
    }
    setSent(true);
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <Card className="bg-[#111111] border-[#1a1a1a] w-full max-w-md text-center p-8">
          <Mail className="w-16 h-16 text-[#25D366] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Email enviado!</h2>
          <p className="text-gray-400 mb-6">
            Verifique sua caixa de entrada em{" "}
            <strong className="text-white">{email}</strong> para redefinir sua senha.
          </p>
          <Link href="/login">
            <Button variant="outline" className="border-[#2a2a2a] text-white hover:bg-[#1a1a1a]">
              Voltar ao login
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-8 h-8 text-[#25D366]" />
            <span className="text-2xl font-bold text-white">ZapReply AI</span>
          </div>
        </div>
        <Card className="bg-[#111111] border-[#1a1a1a]">
          <CardHeader className="pb-4">
            <h1 className="text-xl font-semibold text-white text-center">Recuperar senha</h1>
            <p className="text-gray-400 text-sm text-center mt-1">Digite seu email para receber o link de redefinição</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-[#0a0a0a] border-[#2a2a2a] text-white placeholder:text-gray-600"
                />
              </div>
              <Button type="submit" className="w-full bg-[#25D366] hover:bg-[#1aab52] text-black font-semibold" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Enviar link
              </Button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-4">
              <Link href="/login" className="text-[#25D366] hover:underline">Voltar ao login</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
