-- VYNTRO / BLOOM CREATIVES client feedback
-- Run this migration in the Supabase SQL Editor for project zkxtlbvgurziniicpdyg.

create table if not exists public.client_feedback (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  rating smallint not null check (rating between 1 and 5),
  feedback text not null,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.client_feedback enable row level security;

grant select on public.client_feedback to anon, authenticated;
grant insert on public.client_feedback to anon;
grant update on public.client_feedback to authenticated;

drop policy if exists "Anyone can read approved feedback" on public.client_feedback;
create policy "Anyone can read approved feedback"
on public.client_feedback for select
to anon, authenticated
using (approved = true);

drop policy if exists "Visitors can submit pending feedback" on public.client_feedback;
create policy "Visitors can submit pending feedback"
on public.client_feedback for insert
to anon
with check (
  approved = false
  and rating between 1 and 5
  and char_length(trim(name)) between 1 and 80
  and char_length(trim(email)) between 3 and 254
  and char_length(trim(feedback)) between 10 and 1200
);

drop policy if exists "Portfolio owner can read all feedback" on public.client_feedback;
create policy "Portfolio owner can read all feedback"
on public.client_feedback for select
to authenticated
using ((auth.jwt() ->> 'email') = 'chenithakodithuwakku999@gmail.com');

drop policy if exists "Portfolio owner can moderate feedback" on public.client_feedback;
create policy "Portfolio owner can moderate feedback"
on public.client_feedback for update
to authenticated
using ((auth.jwt() ->> 'email') = 'chenithakodithuwakku999@gmail.com')
with check ((auth.jwt() ->> 'email') = 'chenithakodithuwakku999@gmail.com');
