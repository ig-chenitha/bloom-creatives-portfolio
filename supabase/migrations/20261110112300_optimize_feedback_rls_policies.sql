-- Consolidate public and owner SELECT access into one policy.
-- This preserves approved feedback visibility for visitors and lets the
-- portfolio owner read all feedback without maintaining overlapping policies.

drop policy if exists "Public can read approved feedback" on public.client_feedback;
drop policy if exists "Anyone can read approved feedback" on public.client_feedback;
drop policy if exists "Portfolio owner can read all feedback" on public.client_feedback;
drop policy if exists "Visitors and owner can read permitted feedback" on public.client_feedback;

create policy "Visitors and owner can read permitted feedback"
on public.client_feedback
for select
to anon, authenticated
using (
  approved = true
  or (auth.jwt() ->> 'email') = 'chenithakodithuwakku999@gmail.com'
);
