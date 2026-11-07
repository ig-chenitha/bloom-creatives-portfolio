-- Baseline for the existing VYNTRO client feedback table.
-- This version is already recorded in the linked Supabase project
-- (20261105183800). Keep this file in Git so migration history matches.
create table if not exists public.client_feedback (
  id uuid primary key default gen_random_uuid(),
  name text not null
    check (char_length(trim(name)) >= 2 and char_length(trim(name)) <= 80),
  email text not null
    check (char_length(trim(email)) >= 5 and char_length(trim(email)) <= 254),
  rating smallint not null
    check (rating >= 1 and rating <= 5),
  feedback text not null
    check (char_length(trim(feedback)) >= 10 and char_length(trim(feedback)) <= 1200),
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.client_feedback enable row level security;

grant select on public.client_feedback to anon, authenticated;
grant insert on public.client_feedback to anon;
grant update on public.client_feedback to authenticated;

drop policy if exists "Public can submit feedback" on public.client_feedback;
create policy "Public can submit feedback"
on public.client_feedback for insert
to anon, authenticated
with check (
  char_length(trim(name)) between 2 and 80
  and char_length(trim(email)) between 5 and 254
  and rating between 1 and 5
  and char_length(trim(feedback)) between 10 and 1200
);

drop policy if exists "Public can read approved feedback" on public.client_feedback;
create policy "Public can read approved feedback"
on public.client_feedback for select
to anon, authenticated
using (approved = true);
