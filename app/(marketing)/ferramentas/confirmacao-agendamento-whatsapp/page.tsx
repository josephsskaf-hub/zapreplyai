import { SeoToolPage } from "@/components/marketing/seo-tool-page";

export const metadata = {
  title: "Confirmação de agendamento por WhatsApp",
  description:
    "Mensagens de confirmação de horário prontas para WhatsApp. Reduza no-show no seu negócio.",
};

export default function Page() {
  return (
    <SeoToolPage
      h1="Confirmação de agendamento por WhatsApp"
      intro="Confirme horários pelo WhatsApp e reduza faltas. Mensagens claras, objetivas e amigáveis."
      paragraphs={[
        "Cliente que não confirma o horário é cliente que pode não aparecer. E no-show custa caro para quem trabalha com agenda: salões, clínicas, consultórios, manicures, personal trainers, profissionais autônomos em geral.",
        "Uma boa mensagem de confirmação enviada na hora certa diminui drasticamente a taxa de falta. Com o ZapReply AI você gera mensagens prontas para confirmar, lembrar ou remarcar, em segundos.",
      ]}
      bullets={[
        "Lembrete um dia antes",
        "Confirmação no mesmo dia",
        "Mensagem para remarcar sem perder o cliente",
        "Tom profissional ou descontraído, você escolhe",
      ]}
      example={{
        client: "Cliente agendou para amanhã às 14h",
        reply:
          "Oi, [nome]! Tudo bem? Passando para confirmar seu horário amanhã às 14h 😊 Pode confirmar pra mim aqui? Qualquer imprevisto me avisa que a gente reagenda sem problema!",
      }}
    />
  );
}
