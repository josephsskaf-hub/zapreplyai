"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { MessageSquare, Loader2, CheckCircle } from "lucide-react";

export default function SignupPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    businessName: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast({ title: "As senhas não coincidem", variant: "destructive" });
      return;
    }
    if (!form.terms) {
      toast({ title: "Aceite os termos para continuar", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { full_name: form.fullName, business_name: form.businessName },
      },
    });
    if (error) {
      toast({ title: "Erro ao criar conta", description: error.message, variant: "destructive" });
      setLoading(false);
      return;
    }
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <Card className="bg-[#111111] border-[#1a1a1a] w-full max-w-md text-center p-8">
          <CheckCircle className="w-16 h-16 text-[#25D366] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Confirme seu email</h2>
          <p className="text-gray-400 mb-4">
            Enviamos um link de confirmação para{" "}
            <strong className="text-white">{form.email}</strong>. Clique no link para ativar sua conta.
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
          <p className="text-gray-400 text-sm">Comece grátis hoje</p>
        </div>

        <Card className="bg-[#111111] border-[#1a1a1a]">
          <CardHeader className="pb-4">
            <h1 className="text-xl font-semibold text-white text-center">Criar sua conta</h1>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-gray-300">Nome completo</Label>
                <Input id="fullName" name="fullName" placeholder="João Silva" value={form.fullName} onChange={handleChange} required className="bg-[#0a0a0a] border-[#2a2a2a] text-white placeholder:text-gray-600" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessName" className="text-gray-300">Nome do negócio</Label>
                <Input id="businessName" name="businessName" placeholder="Minha Empresa Ltda" value={form.businessName} onChange={handleChange} required className="bg-[#0a0a0a] border-[#2a2a2a] text-white placeholder:text-gray-600" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input id="email" name="email" type="email" placeholder="seu@email.com" value={form.email} onChange={handleChange} required className="bg-[#0a0a0a] border-[#2a2a2a] text-white placeholder:text-gray-600" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Senha</Label>
                <Input id="password" name="password" type="password" placeholder="Mínimo 8 caracteres" value={form.password} onChange={handleChange} required minLength={8} className="bg-[#0a0a0a] border-[#2a2a2a] text-white placeholder:text-gray-600" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-300">Confirmar senha</Label>
                <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Repita a senha" value={form.confirmPassword} onChange={handleChange} required className="bg-[#0a0a0a] border-[#2a2a2a] text-white placeholder:text-gray-600" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="terms" name="terms" checked={form.terms} onChange={handleChange} className="accent-[#25D366]" />
                <Label htmlFor="terms" className="text-gray-400 text-sm cursor-pointer">
                  Aceito os{" "}
                  <Link href="/terms" className="text-[#25D366] hover:underline">termos de uso</Link>
                  {" "}e{" "}
                  <Link href="/privacy" className="text-[#25D366] hover:underline">política de privacidade</Link>
                </Label>
              </div>
              <Button type="submit" className="w-full bg-[#25D366] hover:bg-[#1aab52] text-black font-semibold" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Criar conta
              </Button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-4">
              Já tem conta?{" "}
              <Link href="/login" className="text-[#25D366] hover:underline">Entrar</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
