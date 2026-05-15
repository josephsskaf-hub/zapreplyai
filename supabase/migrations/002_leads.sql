create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  whatsapp text not null,
  business_type text,
  monthly_volume text,
  source text default 'landing_page',
  created_at timestamptz default now()
);
alter table public.leads enable row level security;
create policy "Service role can manage leads" on public.leads for all using (true);
