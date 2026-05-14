-- Users (extends Supabase auth.users)
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  business_name text,
  phone text,
  plan text default 'free' check (plan in ('free','starter','pro','enterprise')),
  stripe_customer_id text,
  stripe_subscription_id text,
  trial_ends_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Businesses / WhatsApp connections
create table if not exists public.businesses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  whatsapp_number text,
  whatsapp_connected boolean default false,
  evolution_instance_id text,
  created_at timestamptz default now()
);

-- Conversations
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references public.businesses(id) on delete cascade not null,
  contact_phone text not null,
  contact_name text,
  status text default 'open' check (status in ('open','resolved','pending')),
  last_message_at timestamptz default now(),
  created_at timestamptz default now()
);

-- Messages
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references public.conversations(id) on delete cascade not null,
  role text not null check (role in ('user','assistant','system')),
  content text not null,
  sent_at timestamptz default now(),
  is_read boolean default false
);

-- AI Settings per business
create table if not exists public.ai_settings (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references public.businesses(id) on delete cascade not null unique,
  ai_name text default 'Assistente',
  tone text default 'professional' check (tone in ('professional','friendly','formal','casual')),
  base_prompt text,
  faq jsonb default '[]'::jsonb,
  products jsonb default '[]'::jsonb,
  off_hours_message text,
  ai_enabled boolean default true,
  response_delay_seconds int default 3,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Events (analytics)
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id),
  business_id uuid references public.businesses(id),
  event_name text not null,
  properties jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- RLS
alter table public.profiles enable row level security;
alter table public.businesses enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.ai_settings enable row level security;
alter table public.events enable row level security;

create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can view own businesses" on public.businesses for all using (auth.uid() = user_id);
create policy "Users can view own conversations" on public.conversations for all using (
  exists (select 1 from public.businesses b where b.id = conversations.business_id and b.user_id = auth.uid())
);
create policy "Users can view own messages" on public.messages for all using (
  exists (
    select 1 from public.conversations c
    join public.businesses b on b.id = c.business_id
    where c.id = messages.conversation_id and b.user_id = auth.uid()
  )
);
create policy "Users can manage own ai_settings" on public.ai_settings for all using (
  exists (select 1 from public.businesses b where b.id = ai_settings.business_id and b.user_id = auth.uid())
);

-- Trigger: auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
