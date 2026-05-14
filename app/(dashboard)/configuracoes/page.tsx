"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

type Profile = {
  full_name: string | null;
  business_name: string | null;
  phone: string | null;
};

export default function ConfiguracoesPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Profile>({ full_name: "", business_name: "", phone: "" });
  const [email, setEmail] = useState("");

  const loadProfile = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    setEmail(user.email ?? "");

    const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    if (data)
      setProfile({
        full_name: data.full_name ?? "",
        business_name: data.business_name ?? "",
        phone: data.phone ?? "",
      });
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleSave = async () => {
    setSaving(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
        business_name: profile.business_name,
        phone: profile.phone,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (error) {
      toast({ title: "Erro ao salvar", variant: "destructive" });
    } else {
      toast({ title: "Perfil atualizado!" });
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8 space-y-6">
        <Skeleton className="h-8 w-48 bg-[#1a1a1a]" />
        <Skeleton className="h-48 w-full bg-[#1a1a1a] rounded-xl" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Configurações</h1>
        <p className="text-gray-400 text-sm mt-1">Gerencie seus dados pessoais e de negócio</p>
      </div>

      <Card className="bg-[#111111] border-[#1a1a1a]">
        <CardHeader>
          <CardTitle className="text-white text-base">Perfil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-300">Email</Label>
            <Input value={email} disabled className="bg-[#0a0a0a] border-[#2a2a2a] text-gray-500" />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300">Nome completo</Label>
            <Input
              value={profile.full_name ?? ""}
              onChange={(e) => setProfile((p) => ({ ...p, full_name: e.target.value }))}
              className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300">Nome do negócio</Label>
            <Input
              value={profile.business_name ?? ""}
              onChange={(e) => setProfile((p) => ({ ...p, business_name: e.target.value }))}
              className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300">Telefone</Label>
            <Input
              value={profile.phone ?? ""}
              onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
              placeholder="+55 11 99999-9999"
              className="bg-[#0a0a0a] border-[#2a2a2a] text-white placeholder:text-gray-600"
            />
          </div>
          <Button
            onClick={handleSave}
            className="bg-[#25D366] hover:bg-[#1aab52] text-black font-semibold gap-2"
            disabled={saving}
          >
            <Save className="w-4 h-4" />
            {saving ? "Salvando..." : "Salvar alterações"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
