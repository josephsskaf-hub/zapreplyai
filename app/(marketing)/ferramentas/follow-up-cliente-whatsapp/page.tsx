import { SeoToolPage } from "@/components/marketing/seo-tool-page";

export const metadata = {
  title: "Follow-up de cliente por WhatsApp",
  description:
    "Volte a falar com clientes sem parecer chato. Mensagens de follow-up prontas para WhatsApp.",
};

export default function Page() {
  return (
    <SeoToolPage
      h1="Follow-up de cliente por WhatsApp"
      intro="Reaqueça leads e clientes parados. Mensagens leves de follow-up, sem ser insistente."
      paragraphs={[
        "Cliente que pediu orçamento e não respondeu, lead que sumiu, cliente antigo que parou de comprar — todo mundo tem essa lista. A maioria dessas vendas se perde simplesmente porque ninguém volta a falar.",
        "Um follow-up bem feito reativa essa lista. Mas precisa ser leve, não invasivo, e dar uma boa razão para o cliente responder. O ZapReply AI cria essas mensagens em segundos.",
      ]}
      bullets={[
        "Follow-up de orçamento enviado",
        "Reativação de cliente inativo",
        "Lead que sumiu depois do primeiro contato",
        "Cliente pós-atendimento (pedido de feedback)",
      ]}
      example={{
        client: "Lead pediu orçamento há 5 dias e não respondeu mais",
        reply:
          "Oi, [nome]! Tudo certo? 😊 Voltando aqui só pra saber se você ainda tem interesse no orçamento que mandei. Qualquer dúvida me avisa, posso te ajudar a decidir!",
      }}
    />
  );
}
