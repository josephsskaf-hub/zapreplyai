-- ZapReply AI database schema
-- Run this in the Supabase SQL editor on a new project.

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  plan text default 'free',
  stripe_customer_id text,
  created_at timestamp with time zone default now()
);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  stripe_subscription_id text,
  status text,
  price_id text,
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  created_at timestamp with time zone default now()
);

create table public.generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  input_message text not null,
  business_context text,
  business_type text,
  goal text,
  tone text,
  output_message text not null,
  created_at timestamp with time zone default now()
);

create table public.usage_counters (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  month text not null,
  count integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(user_id, month)
);

-- RLS
alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.generations enable row level security;
alter table public.usage_counters enable row level security;

-- Policies
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Service role can insert profiles" on public.profiles for insert with check (true);

create policy "Users can view own generations" on public.generations for select using (auth.uid() = user_id);
create policy "Users can insert own generations" on public.generations for insert with check (auth.uid() = user_id);
create policy "Users can delete own generations" on public.generations for delete using (auth.uid() = user_id);

create policy "Users can view own usage" on public.usage_counters for select using (auth.uid() = user_id);
create policy "Service role full access usage" on public.usage_counters for all using (true);

create policy "Users can view own subscriptions" on public.subscriptions for select using (auth.uid() = user_id);
create policy "Service role full access subscriptions" on public.subscriptions for all using (true);

-- Trigger para criar profile automaticamente
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
