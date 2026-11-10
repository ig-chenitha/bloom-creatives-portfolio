-- Wrap auth.jwt() in a scalar subquery so PostgreSQL can evaluate the
-- JWT expression once per statement rather than once per row.

drop policy if exists "Visitors and owner can read permitted feedback" on public.client_feedback;
create policy "Visitors and owner can read permitted feedback"
on public.client_feedback
for select
to anon, authenticated
using (
  approved = true
  or ((select auth.jwt()) ->> 'email') = 'chenithakodithuwakku999@gmail.com'
);

drop policy if exists "Portfolio owner can moderate feedback" on public.client_feedback;
create policy "Portfolio owner can moderate feedback"
on public.client_feedback
for update
to authenticated
using (((select auth.jwt()) ->> 'email') = 'chenithakodithuwakku999@gmail.com')
with check (((select auth.jwt()) ->> 'email') = 'chenithakodithuwakku999@gmail.com');
