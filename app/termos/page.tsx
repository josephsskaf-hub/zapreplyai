import Link from "next/link";
import { MessageSquare } from "lucide-react";

export const metadata = {
  title: "Termos de Uso | ZapReply AI",
  description: "Termos de Uso do ZapReply AI.",
};

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="w-full px-6 py-4 border-b border-gray-800 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-green-400" />
          <span className="font-bold text-white">ZapReply AI</span>
        </Link>
        <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
          ← Voltar ao início
        </Link>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Termos de Uso
        </h1>
        <p className="text-gray-500 text-sm mb-10">Última atualização: maio de 2025</p>

        <div className="space-y-10 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Serviço</h2>
            <p>
              O ZapReply AI oferece uma plataforma de automação de atendimento via WhatsApp com
              inteligência artificial. Ao contratar nossos serviços, o cliente recebe acesso ao
              painel de configuração, integração com WhatsApp Business, respostas automáticas por IA
              e relatórios de conversas. O serviço é prestado no formato SaaS (Software como
              Serviço), sem necessidade de instalação de software local.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Pagamentos</h2>
            <p>
              Os planos são cobrados mensalmente, com renovação automática na data de vencimento. O
              pagamento pode ser realizado via PIX, cartão de crédito ou boleto bancário. Em caso de
              atraso no pagamento, o acesso ao serviço poderá ser suspenso após 5 dias corridos. O
              ZapReply AI reserva-se o direito de reajustar os valores dos planos com aviso prévio
              de 30 dias ao cliente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Cancelamento</h2>
            <p>
              O cliente pode cancelar sua assinatura a qualquer momento, sem multa ou fidelidade
              mínima. O cancelamento deve ser solicitado via WhatsApp ou e-mail de suporte antes da
              próxima data de cobrança. Após o cancelamento, o acesso ao painel permanece ativo até
              o fim do período já pago. Não há reembolso proporcional de períodos parcialmente
              utilizados.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Responsabilidades</h2>
            <p>
              O ZapReply AI não se responsabiliza por bloqueios de conta no WhatsApp causados por
              uso indevido da plataforma pelo cliente, como envio de spam ou mensagens em desacordo
              com as políticas do WhatsApp Business. O cliente é responsável pelo conteúdo
              configurado na IA e pelas informações fornecidas para treinamento do assistente. O
              ZapReply AI não garante disponibilidade ininterrupta do serviço, mas compromete-se a
              manter disponibilidade mínima de 99% mensalmente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Propriedade Intelectual</h2>
            <p>
              Toda a tecnologia, algoritmos, interfaces e conteúdos do ZapReply AI são de
              propriedade exclusiva da empresa. O cliente não pode copiar, reproduzir ou distribuir
              qualquer parte da plataforma sem autorização expressa por escrito. O cliente mantém a
              propriedade sobre as informações e conteúdos que inserir na plataforma para
              treinamento do assistente.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-gray-500">
          <p>© 2025 ZapReply AI. Todos os direitos reservados.</p>
          <div className="flex gap-4 mt-2">
            <Link href="/politica-de-privacidade" className="hover:text-gray-300 transition-colors">Política de Privacidade</Link>
            <Link href="/" className="hover:text-gray-300 transition-colors">Início</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
