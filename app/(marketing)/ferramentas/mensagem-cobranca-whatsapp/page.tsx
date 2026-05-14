import { SeoToolPage } from "@/components/marketing/seo-tool-page";

export const metadata = {
  title: "Mensagem de cobrança para WhatsApp",
  description:
    "Mensagens de cobrança educadas e firmes para o WhatsApp. Receba sem perder cliente.",
};

export default function Page() {
  return (
    <SeoToolPage
      h1="Mensagem de cobrança para WhatsApp"
      intro="Cobre clientes inadimplentes sem parecer chato. Mensagens prontas, educadas e firmes."
      paragraphs={[
        "Cobrar é uma das tarefas mais desconfortáveis para quem tem um pequeno negócio. Se você for grosso, perde o cliente. Se for muito mole, o cliente continua devendo.",
        "O ZapReply AI cria mensagens de cobrança equilibradas: gentis para preservar o relacionamento e diretas o suficiente para o cliente entender que precisa pagar.",
        "Funciona para cobrança de mensalidade, fatura em atraso, sinal de serviço, segunda parcela ou qualquer pendência financeira.",
      ]}
      bullets={[
        "Tom educado e firme ao mesmo tempo",
        "Sem soar agressivo ou ameaçador",
        "Versão para primeiro lembrete, segundo aviso ou cobrança formal",
        "Você cola, ajusta o nome e envia",
      ]}
      example={{
        client: "Cliente atrasou o pagamento do mês",
        reply:
          "Oi, [nome]! Tudo bem? 😊 Passando só para lembrar que o pagamento referente a [serviço] está em aberto. Consegue acertar ainda essa semana? Qualquer coisa, me avisa por aqui que ajusto com você.",
      }}
    />
  );
}
