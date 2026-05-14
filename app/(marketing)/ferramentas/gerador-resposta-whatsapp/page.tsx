import { SeoToolPage } from "@/components/marketing/seo-tool-page";

export const metadata = {
  title: "Gerador de resposta para WhatsApp grátis",
  description:
    "Gere respostas profissionais para WhatsApp em segundos. Cole a mensagem do cliente e receba um texto pronto para copiar e enviar.",
};

export default function Page() {
  return (
    <SeoToolPage
      h1="Gerador de resposta para WhatsApp grátis"
      intro="Crie em segundos respostas profissionais para enviar aos seus clientes no WhatsApp."
      paragraphs={[
        "Atender bem no WhatsApp é o que separa um negócio que vende de um negócio que perde cliente. Mas escrever respostas claras, simpáticas e sem parecer robótico toma tempo — e nem todo mundo sabe escrever bem rápido.",
        "Com o gerador de resposta para WhatsApp do ZapReply AI, você cola a mensagem que o cliente enviou, escolhe o tom e o objetivo, e recebe uma resposta pronta para colar e enviar. Em poucos segundos. Sem complicação.",
        "Funciona para qualquer tipo de negócio: salão de beleza, restaurante, loja online, advogado, personal trainer, consultor, professor particular e qualquer outro profissional autônomo.",
      ]}
      bullets={[
        "Respostas humanas, não parecem feitas por robô",
        "Adaptadas ao seu tipo de negócio",
        "Você escolhe o tom: amigável, formal, persuasivo, empático",
        "Plano grátis para você experimentar",
      ]}
      example={{
        client: "Oi, vi seu serviço. Quanto custa?",
        reply:
          "Olá! Que bom que entrou em contato 😊 Me diga rapidinho o que você está precisando para eu te passar o valor certinho.",
      }}
    />
  );
}
