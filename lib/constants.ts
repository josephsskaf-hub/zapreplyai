export const APP_NAME = "ZapReply AI";
export const APP_TAGLINE =
  "Responda clientes no WhatsApp em segundos com mensagens profissionais";
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const FREE_MONTHLY_LIMIT = Number(
  process.env.FREE_MONTHLY_LIMIT ?? "10"
);
export const PRO_MONTHLY_LIMIT = Number(
  process.env.PRO_MONTHLY_LIMIT ?? "1000"
);

export const BUSINESS_TYPES = [
  { value: "salao", label: "Salão de beleza / barbearia" },
  { value: "estetica", label: "Clínica de estética" },
  { value: "manicure", label: "Manicure / esmalteria" },
  { value: "restaurante", label: "Restaurante / delivery" },
  { value: "loja", label: "Loja / e-commerce" },
  { value: "personal", label: "Personal trainer / academia" },
  { value: "psicologo", label: "Psicólogo / terapeuta" },
  { value: "advogado", label: "Advogado / contador" },
  { value: "imobiliaria", label: "Imobiliária / corretor" },
  { value: "consultor", label: "Consultor / freelancer" },
  { value: "professor", label: "Professor particular" },
  { value: "fotografo", label: "Fotógrafo / videomaker" },
  { value: "petshop", label: "Pet shop / banho e tosa" },
  { value: "outro", label: "Outro" },
];

export const GOALS = [
  { value: "responder_duvida", label: "Responder dúvida do cliente" },
  { value: "vender", label: "Vender / converter em venda" },
  { value: "agendar", label: "Agendar horário" },
  { value: "confirmar_agendamento", label: "Confirmar agendamento" },
  { value: "cobrar", label: "Cobrar pagamento" },
  { value: "follow_up", label: "Fazer follow-up" },
  { value: "reativar_cliente", label: "Reativar cliente inativo" },
  { value: "responder_reclamacao", label: "Responder reclamação" },
  { value: "pedir_avaliacao", label: "Pedir avaliação / review" },
  { value: "enviar_orcamento", label: "Enviar orçamento" },
];

export const TONES = [
  { value: "profissional", label: "Profissional" },
  { value: "amigavel", label: "Amigável" },
  { value: "formal", label: "Formal" },
  { value: "descontraido", label: "Descontraído" },
  { value: "empatico", label: "Empático" },
  { value: "direto", label: "Direto e objetivo" },
  { value: "persuasivo", label: "Persuasivo" },
];

export const NICHES = [
  "Salões e barbearias",
  "Clínicas de estética",
  "Lojas e e-commerce",
  "Restaurantes e delivery",
  "Profissionais autônomos",
  "Personal trainers",
  "Imobiliárias e corretores",
  "Consultores e freelancers",
  "Pet shops",
  "Professores particulares",
];

export const TEMPLATES = [
  {
    id: "cobranca_amigavel",
    title: "Cobrança amigável",
    description: "Lembre o cliente do pagamento sem ser invasivo.",
    goal: "cobrar",
    tone: "amigavel",
  },
  {
    id: "confirmacao_agendamento",
    title: "Confirmação de agendamento",
    description: "Confirme o horário e reduza o no-show.",
    goal: "confirmar_agendamento",
    tone: "profissional",
  },
  {
    id: "follow_up_pos_atendimento",
    title: "Follow-up pós-atendimento",
    description: "Volte a falar com o cliente alguns dias depois.",
    goal: "follow_up",
    tone: "amigavel",
  },
  {
    id: "reativar_cliente",
    title: "Reativar cliente inativo",
    description: "Traga de volta quem não compra há um tempo.",
    goal: "reativar_cliente",
    tone: "amigavel",
  },
  {
    id: "responder_reclamacao",
    title: "Responder reclamação",
    description: "Resposta empática para acalmar e resolver.",
    goal: "responder_reclamacao",
    tone: "empatico",
  },
  {
    id: "pedido_avaliacao",
    title: "Pedido de avaliação",
    description: "Peça uma review depois do serviço entregue.",
    goal: "pedir_avaliacao",
    tone: "amigavel",
  },
  {
    id: "envio_orcamento",
    title: "Envio de orçamento",
    description: "Apresente seu orçamento de forma clara e persuasiva.",
    goal: "enviar_orcamento",
    tone: "profissional",
  },
  {
    id: "primeira_resposta_lead",
    title: "Primeira resposta a um lead",
    description: "Atenda rápido e qualifique o interesse do cliente.",
    goal: "vender",
    tone: "amigavel",
  },
  {
    id: "agendar_horario",
    title: "Oferecer horário disponível",
    description: "Ofereça opções e ajude o cliente a decidir.",
    goal: "agendar",
    tone: "direto",
  },
  {
    id: "tira_duvida",
    title: "Resposta para dúvida frequente",
    description: "Esclareça dúvidas comuns de forma humana e útil.",
    goal: "responder_duvida",
    tone: "amigavel",
  },
];

export const BENEFITS = [
  {
    title: "Responda em segundos",
    description:
      "Não perca cliente por demora. Gere uma resposta profissional em menos de 5 segundos.",
  },
  {
    title: "Mensagens humanas",
    description:
      "Nada de texto robótico. As respostas soam como você falando com o cliente.",
  },
  {
    title: "Templates prontos",
    description:
      "Cobrança, agendamento, follow-up, reclamação. É só usar o modelo certo.",
  },
  {
    title: "Adaptado ao seu negócio",
    description:
      "Escolha o tipo de negócio, o objetivo e o tom. A resposta sai sob medida.",
  },
  {
    title: "Histórico organizado",
    description:
      "Todas as respostas geradas ficam salvas para você reutilizar quando quiser.",
  },
  {
    title: "Copie e cole",
    description:
      "Sem integração complicada. Copia, cola no WhatsApp e envia.",
  },
];

export const USE_CASES = [
  "Cobrar um cliente sem parecer chato",
  "Confirmar um agendamento e reduzir faltas",
  "Responder uma reclamação difícil sem perder o cliente",
  "Pedir avaliação após o atendimento",
  "Fazer follow-up de orçamento",
  "Responder dúvidas frequentes em poucos segundos",
];

export const FAQS = [
  {
    q: "Como funciona o ZapReply AI?",
    a: "Você cola a mensagem que o cliente enviou, escolhe o tipo de negócio, o objetivo e o tom da resposta. A IA gera uma mensagem pronta para você copiar e enviar manualmente no WhatsApp.",
  },
  {
    q: "Vocês integram com o WhatsApp?",
    a: "Não. O ZapReply AI não envia mensagens automaticamente nem se conecta ao WhatsApp. Você copia a resposta gerada e envia pelo seu próprio número. Isso evita banimento e mantém o controle com você.",
  },
  {
    q: "Posso testar de graça?",
    a: "Sim. O plano gratuito oferece 10 respostas por mês para você experimentar antes de assinar.",
  },
  {
    q: "Posso cancelar quando quiser?",
    a: "Sim. Você cancela direto pela página de configurações, sem fidelidade nem taxas extras.",
  },
  {
    q: "As mensagens parecem feitas por humano mesmo?",
    a: "Sim. As respostas são curtas, naturais e adaptadas ao tom escolhido. Você ainda pode editar antes de enviar.",
  },
];
