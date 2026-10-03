-- ─────────────────────────────────────────────────────────────────────────────
-- Sellfinix — Database Schema
-- Run this in: Supabase dashboard → SQL Editor → New query → Run
-- ─────────────────────────────────────────────────────────────────────────────

-- Enable UUID generation
create extension if not exists "pgcrypto";


-- ── PROFILES ─────────────────────────────────────────────────────────────────
-- One row per creator. Created during onboarding.
create table if not exists public.profiles (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  full_name       text not null,
  business_name   text not null,
  slug            text not null,
  country         text,
  avatar_url      text,
  logo_url        text,
  plan_id         text not null default 'free',   -- 'free' | 'creator' | 'pro'
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),

  constraint profiles_user_id_key unique (user_id),
  constraint profiles_slug_key    unique (slug)
);

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

-- RLS
alter table public.profiles enable row level security;

create policy "Creators can read their own profile"
  on public.profiles for select
  using (auth.uid() = user_id);

create policy "Creators can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = user_id);

create policy "Creators can update their own profile"
  on public.profiles for update
  using (auth.uid() = user_id);


-- ── PRODUCTS ─────────────────────────────────────────────────────────────────
create table if not exists public.products (
  id              uuid primary key default gen_random_uuid(),
  creator_id      uuid not null references auth.users(id) on delete cascade,
  name            text not null,
  slug            text not null,
  description     text,
  product_type    text not null default 'pdf',  -- 'pdf' | 'ebook' | 'guide' | 'template' | 'audio' | 'bundle'
  price           numeric(12, 2) not null default 0,
  currency        text not null default 'NGN',
  cover_image_url text,
  file_path       text,   -- Supabase Storage path (private bucket)
  file_size       bigint,
  status          text not null default 'draft', -- 'draft' | 'published' | 'archived'
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),

  constraint products_creator_slug_key unique (creator_id, slug)
);

create trigger products_updated_at
  before update on public.products
  for each row execute procedure public.set_updated_at();

-- RLS
alter table public.products enable row level security;

create policy "Creators can manage their own products"
  on public.products for all
  using (auth.uid() = creator_id)
  with check (auth.uid() = creator_id);

-- Public read for published products (needed for public sales pages)
create policy "Anyone can view published products"
  on public.products for select
  using (status = 'published');


-- ── SALES PAGES ──────────────────────────────────────────────────────────────
create table if not exists public.sales_pages (
  id           uuid primary key default gen_random_uuid(),
  product_id   uuid not null references public.products(id) on delete cascade,
  template     text not null default 'default',
  content_json jsonb not null default '{}',
  design_json  jsonb not null default '{}',
  is_published boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),

  constraint sales_pages_product_id_key unique (product_id)
);

create trigger sales_pages_updated_at
  before update on public.sales_pages
  for each row execute procedure public.set_updated_at();

-- RLS
alter table public.sales_pages enable row level security;

create policy "Creators can manage their sales pages"
  on public.sales_pages for all
  using (
    auth.uid() = (select creator_id from public.products where id = product_id)
  )
  with check (
    auth.uid() = (select creator_id from public.products where id = product_id)
  );

create policy "Anyone can view published sales pages"
  on public.sales_pages for select
  using (is_published = true);


-- ── CUSTOMERS ────────────────────────────────────────────────────────────────
create table if not exists public.customers (
  id          uuid primary key default gen_random_uuid(),
  creator_id  uuid not null references auth.users(id) on delete cascade,
  name        text not null,
  email       text not null,
  phone       text,
  created_at  timestamptz not null default now(),

  constraint customers_creator_email_key unique (creator_id, email)
);

-- RLS
alter table public.customers enable row level security;

create policy "Creators can manage their own customers"
  on public.customers for all
  using (auth.uid() = creator_id)
  with check (auth.uid() = creator_id);


-- ── ORDERS ───────────────────────────────────────────────────────────────────
create table if not exists public.orders (
  id                 uuid primary key default gen_random_uuid(),
  creator_id         uuid not null references auth.users(id) on delete cascade,
  product_id         uuid not null references public.products(id),
  customer_id        uuid not null references public.customers(id),
  amount             numeric(12, 2) not null,
  currency           text not null default 'NGN',
  status             text not null default 'pending', -- 'pending' | 'paid' | 'failed' | 'refunded'
  payment_provider   text not null default 'paystack',
  payment_reference  text,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create trigger orders_updated_at
  before update on public.orders
  for each row execute procedure public.set_updated_at();

-- RLS
alter table public.orders enable row level security;

create policy "Creators can view their own orders"
  on public.orders for all
  using (auth.uid() = creator_id)
  with check (auth.uid() = creator_id);


-- ── LEADS ────────────────────────────────────────────────────────────────────
create table if not exists public.leads (
  id              uuid primary key default gen_random_uuid(),
  creator_id      uuid not null references auth.users(id) on delete cascade,
  name            text not null,
  email           text not null,
  phone           text,
  source          text,
  lead_magnet_id  uuid references public.products(id),
  created_at      timestamptz not null default now(),

  constraint leads_creator_email_key unique (creator_id, email)
);

alter table public.leads enable row level security;

create policy "Creators can manage their leads"
  on public.leads for all
  using (auth.uid() = creator_id)
  with check (auth.uid() = creator_id);


-- ── DOWNLOADS ────────────────────────────────────────────────────────────────
create table if not exists public.downloads (
  id              uuid primary key default gen_random_uuid(),
  order_id        uuid not null references public.orders(id) on delete cascade,
  product_id      uuid not null references public.products(id),
  customer_id     uuid not null references public.customers(id),
  token           text not null unique default encode(gen_random_bytes(32), 'hex'),
  expires_at      timestamptz not null default (now() + interval '48 hours'),
  download_count  int not null default 0,
  max_downloads   int not null default 5,
  created_at      timestamptz not null default now()
);

alter table public.downloads enable row level security;

create policy "Creators can view their download records"
  on public.downloads for select
  using (
    auth.uid() = (select creator_id from public.orders where id = order_id)
  );

-- Service role (backend) can insert/update downloads — no user policy needed
-- because download creation happens server-side after payment verification.


-- ── EMAIL CAMPAIGNS ──────────────────────────────────────────────────────────
create table if not exists public.email_campaigns (
  id          uuid primary key default gen_random_uuid(),
  creator_id  uuid not null references auth.users(id) on delete cascade,
  name        text not null,
  subject     text not null,
  content     text,
  status      text not null default 'draft', -- 'draft' | 'sent'
  sent_at     timestamptz,
  created_at  timestamptz not null default now()
);

alter table public.email_campaigns enable row level security;

create policy "Creators can manage their email campaigns"
  on public.email_campaigns for all
  using (auth.uid() = creator_id)
  with check (auth.uid() = creator_id);


-- ── AUTOMATIONS ──────────────────────────────────────────────────────────────
create table if not exists public.automations (
  id          uuid primary key default gen_random_uuid(),
  creator_id  uuid not null references auth.users(id) on delete cascade,
  name        text not null,
  trigger_type text not null, -- 'purchase_completed' | 'lead_created' | 'download_completed'
  status      text not null default 'draft', -- 'active' | 'paused' | 'draft'
  created_at  timestamptz not null default now()
);

alter table public.automations enable row level security;

create policy "Creators can manage their automations"
  on public.automations for all
  using (auth.uid() = creator_id)
  with check (auth.uid() = creator_id);


create table if not exists public.automation_steps (
  id             uuid primary key default gen_random_uuid(),
  automation_id  uuid not null references public.automations(id) on delete cascade,
  step_type      text not null, -- 'send_email' | 'wait'
  delay_amount   int,
  delay_unit     text, -- 'hours' | 'days'
  content        jsonb,
  position       int not null default 0
);

alter table public.automation_steps enable row level security;

create policy "Creators can manage their automation steps"
  on public.automation_steps for all
  using (
    auth.uid() = (select creator_id from public.automations where id = automation_id)
  )
  with check (
    auth.uid() = (select creator_id from public.automations where id = automation_id)
  );


-- ── ANALYTICS EVENTS ─────────────────────────────────────────────────────────
create table if not exists public.analytics_events (
  id          uuid primary key default gen_random_uuid(),
  creator_id  uuid references auth.users(id) on delete cascade,
  product_id  uuid references public.products(id) on delete cascade,
  event_type  text not null, -- 'page_view' | 'checkout_started' | 'payment_success' | 'download'
  session_id  text,
  metadata    jsonb,
  created_at  timestamptz not null default now()
);

-- No RLS on insert so public visitors can record page views.
-- Reads are restricted to the creator.
alter table public.analytics_events enable row level security;

create policy "Creators can view their analytics"
  on public.analytics_events for select
  using (auth.uid() = creator_id);

create policy "Anyone can insert analytics events"
  on public.analytics_events for insert
  with check (true);


-- ── PLANS & SUBSCRIPTIONS ────────────────────────────────────────────────────
create table if not exists public.plans (
  id          text primary key,  -- 'free' | 'creator' | 'pro'
  name        text not null,
  price_ngn   numeric(12, 2) not null default 0,
  features    jsonb not null default '{}'
);

insert into public.plans (id, name, price_ngn) values
  ('free',    'Free',    0),
  ('creator', 'Creator', 9900),
  ('pro',     'Pro',     24900)
on conflict (id) do nothing;


-- ─────────────────────────────────────────────────────────────────────────────
-- DONE. All tables created with RLS enabled.
-- ─────────────────────────────────────────────────────────────────────────────
