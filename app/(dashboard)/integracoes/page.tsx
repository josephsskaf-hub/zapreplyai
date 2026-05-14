import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Zap, Calendar, ExternalLink } from "lucide-react";

export default function IntegracoesPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Integrações</h1>
        <p className="text-gray-400 text-sm mt-1">Conecte seu WhatsApp e outras ferramentas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-[#111111] border-[#1a1a1a]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-[#25D366]" />
                </div>
                <div>
                  <CardTitle className="text-white text-sm">WhatsApp Business</CardTitle>
                  <p className="text-xs text-gray-500 mt-0.5">via Evolution API</p>
                </div>
              </div>
              <Badge className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-xs">
                Pendente
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 text-sm mb-4">
              Conecte seu número do WhatsApp Business para começar a receber e enviar mensagens automaticamente.
            </p>
            <Button className="bg-[#25D366] hover:bg-[#1aab52] text-black font-semibold text-sm gap-2">
              <MessageSquare className="w-4 h-4" />
              Conectar WhatsApp
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-[#111111] border-[#1a1a1a] opacity-60">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <CardTitle className="text-white text-sm">n8n / Zapier</CardTitle>
                  <p className="text-xs text-gray-500 mt-0.5">Automações avançadas</p>
                </div>
              </div>
              <Badge className="bg-gray-500/10 text-gray-400 border border-gray-500/20 text-xs">
                Pro
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 text-sm mb-4">
              Integre com n8n ou Zapier para automações avançadas e conectar outros sistemas.
            </p>
            <Button
              variant="outline"
              className="border-[#2a2a2a] text-gray-400 text-sm gap-2"
              disabled
            >
              <ExternalLink className="w-4 h-4" />
              Disponível no plano Pro
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-[#111111] border-[#1a1a1a] opacity-60">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-white text-sm">Google Calendar</CardTitle>
                  <p className="text-xs text-gray-500 mt-0.5">Agendamentos automáticos</p>
                </div>
              </div>
              <Badge className="bg-gray-500/10 text-gray-400 border border-gray-500/20 text-xs">
                Pro
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 text-sm mb-4">
              Permita que a IA agende compromissos diretamente no seu Google Calendar.
            </p>
            <Button
              variant="outline"
              className="border-[#2a2a2a] text-gray-400 text-sm gap-2"
              disabled
            >
              <ExternalLink className="w-4 h-4" />
              Disponível no plano Pro
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
