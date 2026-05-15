import Link from "next/link";
import { MessageSquare } from "lucide-react";

export const metadata = {
  title: "Política de Privacidade | ZapReply AI",
  description: "Política de Privacidade do ZapReply AI — LGPD.",
};

export default function PoliticaPrivacidadePage() {
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
          Política de Privacidade
        </h1>
        <p className="text-gray-500 text-sm mb-10">Última atualização: maio de 2025</p>

        <div className="space-y-10 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Coleta de Dados</h2>
            <p>
              O ZapReply AI coleta informações fornecidas voluntariamente pelos usuários ao preencher
              formulários em nosso site, como nome, número de WhatsApp, e-mail e tipo de negócio.
              Essas informações são utilizadas exclusivamente para entrar em contato sobre nossos
              serviços e melhorar a experiência do usuário. Não compartilhamos seus dados com
              terceiros sem o seu consentimento explícito, exceto quando exigido por lei.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Uso do WhatsApp</h2>
            <p>
              Ao contratar o ZapReply AI, o cliente autoriza a integração do seu número de WhatsApp
              Business com nossa plataforma de automação. As conversas processadas pela IA são
              armazenadas de forma segura em nossos servidores para fins de histórico, treinamento do
              assistente e suporte técnico. O cliente tem acesso completo ao histórico de conversas
              via painel e pode solicitar a exclusão dos dados a qualquer momento.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Conformidade com a LGPD</h2>
            <p>
              O ZapReply AI está em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei
              n.º 13.709/2018). Você tem o direito de acessar, corrigir, portar e solicitar a
              exclusão dos seus dados pessoais a qualquer momento. Para exercer esses direitos ou
              para qualquer dúvida sobre privacidade, entre em contato conosco pelo WhatsApp ou pelo
              e-mail de suporte disponível no painel.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Segurança</h2>
            <p>
              Utilizamos criptografia em trânsito (TLS/HTTPS) e em repouso para proteger seus dados.
              Nossos servidores são hospedados em provedores com certificações de segurança
              internacionais. Em caso de incidente de segurança que possa afetar seus dados,
              notificaremos os titulares afetados conforme os prazos estabelecidos pela LGPD.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Cookies</h2>
            <p>
              Nosso site pode utilizar cookies funcionais e de análise para melhorar a navegação e
              entender como os usuários interagem com o conteúdo. Você pode configurar seu navegador
              para recusar cookies, mas isso pode afetar algumas funcionalidades do site.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-gray-500">
          <p>© 2025 ZapReply AI. Todos os direitos reservados.</p>
          <div className="flex gap-4 mt-2">
            <Link href="/termos" className="hover:text-gray-300 transition-colors">Termos de Uso</Link>
            <Link href="/" className="hover:text-gray-300 transition-colors">Início</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
