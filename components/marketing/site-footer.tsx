import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
                Z
              </span>
              <span className="text-lg font-bold text-slate-900">
                {APP_NAME}
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Respostas profissionais para WhatsApp em segundos.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900">Produto</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/#funcionalidades">Funcionalidades</Link>
              </li>
              <li>
                <Link href="/pricing">Preços</Link>
              </li>
              <li>
                <Link href="/#faq">FAQ</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900">
              Ferramentas grátis
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/ferramentas/gerador-resposta-whatsapp">
                  Gerador de resposta WhatsApp
                </Link>
              </li>
              <li>
                <Link href="/ferramentas/mensagem-cobranca-whatsapp">
                  Mensagem de cobrança
                </Link>
              </li>
              <li>
                <Link href="/ferramentas/confirmacao-agendamento-whatsapp">
                  Confirmação de agendamento
                </Link>
              </li>
              <li>
                <Link href="/ferramentas/follow-up-cliente-whatsapp">
                  Follow-up de cliente
                </Link>
              </li>
              <li>
                <Link href="/ferramentas/resposta-reclamacao-cliente">
                  Resposta a reclamação
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900">Conta</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/login">Entrar</Link>
              </li>
              <li>
                <Link href="/signup">Cadastrar</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {APP_NAME}. Todos os direitos
            reservados.
          </p>
          <p className="mt-2">
            Produto independente. Não afiliado ao WhatsApp ou Meta.
          </p>
        </div>
      </div>
    </footer>
  );
}
