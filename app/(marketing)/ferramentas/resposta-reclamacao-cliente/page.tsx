import { SeoToolPage } from "@/components/marketing/seo-tool-page";

export const metadata = {
  title: "Resposta a reclamação de cliente no WhatsApp",
  description:
    "Como responder reclamações de clientes no WhatsApp sem perder o cliente. Modelos prontos e empáticos.",
};

export default function Page() {
  return (
    <SeoToolPage
      h1="Resposta a reclamação de cliente no WhatsApp"
      intro="Acalme o cliente, mostre que você se importa e resolva. Respostas empáticas geradas em segundos."
      paragraphs={[
        "Uma reclamação mal respondida pode terminar em avaliação ruim, cliente perdido e fama na vizinhança. Uma reclamação bem respondida, por outro lado, pode até virar oportunidade — cliente que se sente ouvido vira cliente fiel.",
        "O segredo está no tom: empatia primeiro, solução depois. O ZapReply AI cria essas respostas seguindo o que funciona na prática: reconhecer o problema, pedir desculpas quando faz sentido, propor uma solução clara.",
      ]}
      bullets={[
        "Reconhece o problema sem prometer o que você não pode cumprir",
        "Tom empático, mas profissional",
        "Conduz para uma solução prática",
        "Funciona para atraso, defeito, mal entendido ou erro de atendimento",
      ]}
      example={{
        client:
          "Cliente: O produto chegou amassado e demorou demais. Estou super decepcionado.",
        reply:
          "Oi, [nome]! Sinto muito pelo que aconteceu, sua frustração faz total sentido. Já estou verificando aqui o que aconteceu com a entrega e em seguida te retorno com uma solução. Obrigada por avisar — vamos resolver isso!",
      }}
    />
  );
}
