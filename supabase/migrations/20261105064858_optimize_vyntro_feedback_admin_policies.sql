-- Replace the broad admin policy with command-specific policies.
drop policy if exists "Admins can manage all feedback" on public.vyntro_feedback;

create policy "Admins can view all feedback"
on public.vyntro_feedback for select
to authenticated
using (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admins can update feedback"
on public.vyntro_feedback for update
to authenticated
using (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
with check (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admins can delete feedback"
on public.vyntro_feedback for delete
to authenticated
using (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');
