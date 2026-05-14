import OpenAI from "openai";

let cachedClient: OpenAI | null = null;

export function getOpenAIClient() {
  if (!cachedClient) {
    cachedClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY ?? "",
    });
  }
  return cachedClient;
}

export const SYSTEM_PROMPT = `Você é um assistente especializado em criar respostas curtas, humanas e profissionais para pequenos negócios responderem clientes pelo WhatsApp.

Regras:
- Escreva em português brasileiro natural.
- Não diga que é IA.
- Não use linguagem robótica.
- Não invente preços, prazos, políticas ou condições que o usuário não informou.
- Quando faltar informação, escreva de forma segura, por exemplo: "Posso verificar certinho para você."
- Mantenha a resposta pronta para copiar e colar.
- Evite textos longos demais.
- Adapte a resposta ao tipo de negócio, objetivo e tom selecionado.
- Para cobrança, seja educado e firme.
- Para venda, seja persuasivo sem ser agressivo.
- Para reclamação, seja empático e resolutivo.
- Para agendamento, seja claro e objetivo.
- Para follow-up, seja leve e não insistente.
- Não inclua explicações.
- Retorne apenas a mensagem final.`;

export type GenerateMode = "reply" | "followup" | "variation";

export function buildUserPrompt(params: {
  inputMessage: string;
  businessContext?: string;
  businessType?: string;
  goal?: string;
  tone?: string;
  mode: GenerateMode;
}) {
  const {
    inputMessage,
    businessContext,
    businessType,
    goal,
    tone,
    mode,
  } = params;

  const lines: string[] = [];

  if (mode === "followup") {
    lines.push(
      "Crie uma mensagem de follow-up leve, sem cobrar e sem ser insistente, com base na conversa abaixo."
    );
  } else if (mode === "variation") {
    lines.push(
      "Gere uma variação diferente da resposta, mantendo o mesmo objetivo e tom, mas com palavras diferentes."
    );
  } else {
    lines.push("Crie uma resposta para enviar a este cliente.");
  }

  lines.push("");
  lines.push("Mensagem recebida do cliente:");
  lines.push(`"""${inputMessage}"""`);

  if (businessContext) {
    lines.push("");
    lines.push("Contexto do negócio:");
    lines.push(businessContext);
  }
  if (businessType) {
    lines.push("");
    lines.push(`Tipo de negócio: ${businessType}.`);
  }
  if (goal) {
    lines.push(`Objetivo: ${goal}.`);
  }
  if (tone) {
    lines.push(`Tom: ${tone}.`);
  }

  lines.push("");
  lines.push("Devolva apenas a mensagem final, pronta para colar no WhatsApp.");

  return lines.join("\n");
}
