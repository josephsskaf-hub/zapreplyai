# ZapReply AI

WhatsApp response generator for small Brazilian businesses. Users paste a client's message, pick business type / goal / tone, and get a professional reply ready to copy and paste into WhatsApp.

Built with Next.js 14 (App Router), Supabase (auth + Postgres), OpenAI, Stripe, Tailwind CSS, and shadcn/ui.

> Produto independente. Não afiliado ao WhatsApp ou Meta.

## Stack

- **Next.js 14** App Router, TypeScript, server components.
- **Supabase** — email + password auth, Postgres with RLS, service role for webhooks.
- **OpenAI** `gpt-4o-mini` for response generation.
- **Stripe** subscriptions + customer portal.
- **Tailwind CSS** + **shadcn/ui** (primary color `#16a34a`).

## Folder layout

```
app/
  (auth)/          login + signup
  (dashboard)/     dashboard, generate, templates, history, settings (protected)
  (marketing)/     pricing + 5 SEO landing pages under /ferramentas/...
  api/
    generate/                       OpenAI generation + usage limits
    stripe/create-checkout-session  /
    stripe/create-portal-session    /
    stripe/webhook                  webhook handler
components/        ui primitives + dashboard + marketing
hooks/             use-toast
lib/               supabase clients, openai, stripe, usage, analytics, constants
supabase/schema.sql
middleware.ts      auth gate for /dashboard, /generate, /templates, /history, /settings
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.local.example` to `.env.local` and fill in the values:

```bash
cp .env.local.example .env.local
```

| Variable                            | Purpose                                                |
| ----------------------------------- | ------------------------------------------------------ |
| `NEXT_PUBLIC_SUPABASE_URL`          | Supabase project URL                                   |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`     | Supabase anon key                                      |
| `SUPABASE_SERVICE_ROLE_KEY`         | Supabase service role key (webhook only — server only) |
| `OPENAI_API_KEY`                    | OpenAI API key                                         |
| `STRIPE_SECRET_KEY`                 | Stripe secret key                                      |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`| Stripe publishable key                                 |
| `STRIPE_WEBHOOK_SECRET`             | Webhook signing secret (from `stripe listen` or dashboard) |
| `STRIPE_PRICE_ID_PRO`               | Price id for the R$29/mo Pro plan                      |
| `NEXT_PUBLIC_APP_URL`               | Public base URL — `http://localhost:3000` in dev       |
| `FREE_MONTHLY_LIMIT`                | Default `10`                                           |
| `PRO_MONTHLY_LIMIT`                 | Default `1000`                                         |

> The build runs cleanly without any of these set — every external call has a safe fallback at module load time. Calls that need a real key (OpenAI, Stripe) return a `503` at runtime with a clear error.

### 3. Run the Supabase schema

In the Supabase SQL editor, paste and run `supabase/schema.sql`. It creates:

- `profiles` — one row per auth user (auto-created by trigger)
- `subscriptions` — Stripe subscription state
- `generations` — every generated reply (RLS to owner)
- `usage_counters` — monthly per-user counter

Auth → Email is enough; no provider config needed beyond enabling email/password.

### 4. Configure Stripe

1. Create a Product + recurring Price (BRL 29 / month).
2. Set `STRIPE_PRICE_ID_PRO` to that price id.
3. Run a webhook locally:

   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

   Copy the signing secret into `STRIPE_WEBHOOK_SECRET`.

### 5. Dev

```bash
npm run dev
```

Open http://localhost:3000.

## Pricing

- **Free** — 10 generations / month
- **Pro** — 1000 generations / month, R$29/mo

## Notes

- All copy is in Brazilian Portuguese.
- No WhatsApp integration, no chatbot, no mass sending. The user copies the generated text and pastes it into WhatsApp themselves.
- The OpenAI system prompt deliberately makes the model write like a small-business owner, not a robot.
- Free plan limit is enforced in `app/api/generate/route.ts` against `usage_counters` for the current month (UTC).
