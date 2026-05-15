# ZapReply AI

Atendente de IA para WhatsApp que responde clientes, agenda horários, qualifica leads e faz follow-up automaticamente — 24h por dia.

## Stack

- **Next.js 14** (App Router)
- **Supabase** (banco de dados + auth)
- **OpenAI** (GPT-4o-mini para geração de respostas)
- **WhatsApp**: Meta Cloud API (oficial) ou Evolution API (open-source)
- **Stripe** (pagamentos)
- **Vercel** (deploy)

---

## Configuração Local

```bash
git clone https://github.com/seu-usuario/zapreplyai.git
cd zapreplyai
npm install
cp .env.local.example .env.local
# edite .env.local com suas credenciais
npm run dev
```

---

## Variáveis de Ambiente

| Variável | Descrição |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave anon do Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave service role (server-side only) |
| `OPENAI_API_KEY` | Chave da OpenAI |
| `OPENAI_MODEL` | Modelo OpenAI (padrão: `gpt-4o-mini`) |
| `WHATSAPP_PROVIDER` | `meta` ou `evolution` |
| `NEXT_PUBLIC_APP_URL` | URL da aplicação |
| `NEXT_PUBLIC_WHATSAPP_DEMO_NUMBER` | Número WhatsApp para botão da landing page |

---

## Supabase — Migrations

Execute as migrations na ordem no SQL editor do Supabase:

```bash
supabase/migrations/001_initial_schema.sql
supabase/migrations/002_leads.sql
supabase/migrations/003_whatsapp_flow.sql
```

---

## Configuração WhatsApp

### Opção 1 — Meta Cloud API (recomendado para produção)

A Meta Cloud API é a API oficial do WhatsApp Business. Funciona com qualquer número aprovado.

**Variáveis necessárias:**

```
WHATSAPP_PROVIDER=meta
META_WHATSAPP_TOKEN=EAAxxxxxxxx     # Token permanente gerado no Business Manager
META_PHONE_NUMBER_ID=123456789      # ID do número no Meta for Developers
META_VERIFY_TOKEN=segredo-qualquer  # String secreta para verificar o webhook
```

**Passos de configuração:**

1. Acesse [developers.facebook.com](https://developers.facebook.com) e crie um app do tipo "Business"
2. Adicione o produto **WhatsApp** ao app
3. Em **WhatsApp → Primeiros passos**, anote o **Phone Number ID**
4. No [Business Manager](https://business.facebook.com/settings/system-users), crie um usuário de sistema, atribua ao app e gere um **token permanente** com permissão `whatsapp_business_messaging`
5. Configure as 3 variáveis de ambiente no Vercel
6. Em **WhatsApp → Configuração → Webhook**, cole a URL:
   ```
   https://zapreplyai.vercel.app/api/webhooks/whatsapp
   ```
7. No campo "Token de verificação", coloque o mesmo valor de `META_VERIFY_TOKEN`
8. Assine o campo **messages**
9. Envie uma mensagem para o número e veja a IA responder

### Opção 2 — Evolution API (self-hosted)

Solução open-source que conecta via WhatsApp Web. Mais fácil de configurar para testes.

**Variáveis necessárias:**

```
WHATSAPP_PROVIDER=evolution
EVOLUTION_API_URL=https://api.seuservidor.com
EVOLUTION_API_KEY=sua-chave-api
EVOLUTION_INSTANCE_ID=nome-da-instancia
```

**Passos de configuração:**

1. Faça o deploy da [Evolution API v2](https://doc.evolution-api.com) (Railway, EasyPanel, VPS)
2. Crie uma instância no painel
3. Escaneie o QR code com o WhatsApp Business
4. Configure as variáveis no Vercel
5. No painel da Evolution API → Configurações → Webhook, cole:
   ```
   https://zapreplyai.vercel.app/api/webhooks/whatsapp
   ```

---

## Webhook URL

```
https://zapreplyai.vercel.app/api/webhooks/whatsapp
```

- **GET** — Verificação do webhook Meta (challenge response) + health check
- **POST** — Recebe mensagens de ambos os provedores

O webhook auto-detecta o provedor pelo payload se `WHATSAPP_PROVIDER` não estiver definido.

---

## Testando o Fluxo

1. Configure o provedor WhatsApp (Meta ou Evolution)
2. Acesse o dashboard: **Integrações → WhatsApp**
3. Use o formulário "Enviar Mensagem de Teste" para verificar o envio
4. Envie uma mensagem real para o número conectado e aguarde a resposta da IA

Ou via curl:

```bash
curl -X POST https://zapreplyai.vercel.app/api/test/send-whatsapp \
  -H "Content-Type: application/json" \
  -d '{"phone":"5511999999999","message":"Teste","provider":"meta"}'
```

---

## Deploy no Vercel

```bash
# Deploy automático via git push
git push origin main

# Ou via Vercel CLI
vercel --prod
```

**Variáveis a configurar no Vercel:**

- Todas do `.env.local.example`
- `NEXT_PUBLIC_APP_URL` = URL de produção (ex: `https://zapreplyai.vercel.app`)

---

## Rotas da API

| Método | Rota | Descrição |
|---|---|---|
| `GET/POST` | `/api/webhooks/whatsapp` | Webhook principal (Meta + Evolution) |
| `POST` | `/api/test/send-whatsapp` | Envio de teste (dev/staging) |
| `POST` | `/api/generate` | Gerador de respostas (dashboard) |
| `POST` | `/api/chat` | Chat com IA |
| `POST` | `/api/leads` | Captura de leads da landing page |
| `POST` | `/api/stripe/create-checkout-session` | Checkout Stripe |
| `POST` | `/api/stripe/webhook` | Webhook Stripe |

---

## Estrutura do Projeto

```
app/
  (auth)/          — Login, signup, forgot password
  (dashboard)/     — Painel principal
    integracoes/whatsapp/  — Config WhatsApp
    configurar-ia/         — Configuração da IA
    conversas/             — Lista de conversas
  api/
    webhooks/whatsapp/     — Webhook principal
    test/send-whatsapp/    — Teste de envio
  page.tsx         — Landing page
lib/
  evolution.ts     — Cliente Evolution API (server-side)
  meta-whatsapp.ts — Cliente Meta Cloud API (server-side)
  ai-reply.ts      — Gerador de respostas com OpenAI
  openai.ts        — Cliente OpenAI geral
  supabase/        — Clientes Supabase (client/server/middleware)
```

---

## Licença

Proprietário — Todos os direitos reservados.
