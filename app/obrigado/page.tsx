import Link from "next/link";
import { MessageSquare } from "lucide-react";

export const metadata = {
  title: "Obrigado! | ZapReply AI",
  description: "Recebemos seu contato. Nossa equipe entrará em contato em breve.",
};

const SALES_WHATSAPP = process.env.NEXT_PUBLIC_SALES_WHATSAPP || "5511999999999";

export default function ObrigadoPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Top bar */}
      <nav className="w-full px-6 py-4 flex items-center">
        <Link href="/" className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-green-400" />
          <span className="font-bold text-white">ZapReply AI</span>
        </Link>
      </nav>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Recebemos seu contato!
          </h1>
          <p className="text-gray-300 text-lg mb-2 leading-relaxed">
            Nossa equipe vai entrar em contato em até{" "}
            <span className="text-green-400 font-semibold">2 horas</span> via WhatsApp.
          </p>
          <p className="text-gray-500 text-sm mb-10">
            Verifique seu WhatsApp — vamos te mostrar o ZapReply AI funcionando para o seu negócio.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${SALES_WHATSAPP}?text=Ol%C3%A1!%20Acabei%20de%20preencher%20o%20formul%C3%A1rio%20e%20quero%20saber%20mais%20sobre%20o%20ZapReply%20AI.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors text-base"
            >
              💬 Falar direto no WhatsApp
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-medium px-8 py-3 rounded-xl transition-colors text-base"
            >
              ← Voltar ao início
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 px-4 text-center text-gray-600 text-sm border-t border-gray-800">
        © 2025 ZapReply AI. Todos os direitos reservados.
      </footer>
    </div>
  );
}
