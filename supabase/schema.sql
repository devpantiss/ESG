create extension if not exists pgcrypto;

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  organization text not null,
  designation text not null,
  participant_type text not null,
  city text not null,
  attendance_mode text not null,
  payment_status text not null default 'pending',
  payment_amount integer,
  payment_currency text,
  payment_provider text not null default 'manual_transfer',
  payment_verified_at timestamptz,
  invoice_number text,
  invoice_sent_at timestamptz,
  payment_completed_at timestamptz,
  questionnaire jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.registrations
  add column if not exists payment_status text not null default 'pending';

alter table public.registrations
  add column if not exists payment_amount integer;

alter table public.registrations
  add column if not exists payment_currency text;

alter table public.registrations
  add column if not exists payment_provider text not null default 'manual_transfer';

alter table public.registrations
  add column if not exists payment_verified_at timestamptz;

alter table public.registrations
  add column if not exists invoice_number text;

alter table public.registrations
  add column if not exists invoice_sent_at timestamptz;

alter table public.registrations
  add column if not exists payment_completed_at timestamptz;

insert into storage.buckets (id, name, public)
values ('registration-files', 'registration-files', false)
on conflict (id) do nothing;

alter table public.registrations
  drop constraint if exists registrations_payment_status_check;

alter table public.registrations
  add constraint registrations_payment_status_check
  check (payment_status in ('pending', 'verified', 'rejected', 'paid', 'failed'));

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text unique not null,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.registrations enable row level security;
alter table public.admin_users enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

drop policy if exists "Anyone can submit registrations" on public.registrations;
create policy "Anyone can submit registrations"
on public.registrations
for insert
to anon, authenticated
with check (true);

drop policy if exists "Admins can read registrations" on public.registrations;
create policy "Admins can read registrations"
on public.registrations
for select
to authenticated
using (public.is_admin());

drop policy if exists "Admins can update registrations" on public.registrations;
create policy "Admins can update registrations"
on public.registrations
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete registrations" on public.registrations;
create policy "Admins can delete registrations"
on public.registrations
for delete
to authenticated
using (public.is_admin());

drop policy if exists "Admins can read admin users" on public.admin_users;
create policy "Admins can read admin users"
on public.admin_users
for select
to authenticated
using (public.is_admin());

drop policy if exists "Anyone can upload registration files" on storage.objects;
create policy "Anyone can upload registration files"
on storage.objects
for insert
to anon, authenticated
with check (bucket_id = 'registration-files');

drop policy if exists "Admins can read registration files" on storage.objects;
create policy "Admins can read registration files"
on storage.objects
for select
to authenticated
using (bucket_id = 'registration-files' and public.is_admin());
