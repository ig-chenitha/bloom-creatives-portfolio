-- Baseline migration for the existing VYNTRO feedback table.
-- This migration version is already recorded in the linked Supabase project.
create table if not exists public.vyntro_feedback (
  id uuid primary key default gen_random_uuid(),
  display_name text not null
    check (char_length(trim(display_name)) >= 2 and char_length(trim(display_name)) <= 60),
  rating smallint not null
    check (rating >= 1 and rating <= 5),
  message text not null
    check (char_length(trim(message)) >= 10 and char_length(trim(message)) <= 1000),
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

alter table public.vyntro_feedback enable row level security;

drop policy if exists "Anyone can submit feedback" on public.vyntro_feedback;
create policy "Anyone can submit feedback"
on public.vyntro_feedback for insert
to anon, authenticated
with check (status = 'pending');

drop policy if exists "Public can read approved feedback" on public.vyntro_feedback;
create policy "Public can read approved feedback"
on public.vyntro_feedback for select
to anon, authenticated
using (status = 'approved');

drop policy if exists "Admins can manage all feedback" on public.vyntro_feedback;
create policy "Admins can manage all feedback"
on public.vyntro_feedback for all
to authenticated
using ((select auth.jwt()) -> 'app_metadata' ->> 'role' = 'admin')
with check ((select auth.jwt()) -> 'app_metadata' ->> 'role' = 'admin');
