-- Migration 003: WhatsApp Flow
-- Adds channel tracking, external message IDs, and bot phone support

-- Add channel and external_message_id to messages
alter table public.messages add column if not exists channel text default 'whatsapp';
alter table public.messages add column if not exists external_message_id text;
create unique index if not exists messages_external_id_idx on public.messages(external_message_id) where external_message_id is not null;

-- Add channel and contact_name to conversations
alter table public.conversations add column if not exists channel text default 'whatsapp';
alter table public.conversations add column if not exists contact_name text;

-- Update businesses to track bot phone
alter table public.businesses add column if not exists bot_phone text;
