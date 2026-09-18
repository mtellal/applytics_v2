-- Starter schema for a NEW Supabase project, based on the frontend models.
-- Run once in the Supabase SQL Editor. This is not a live database export.
begin;

create table public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  company text not null,
  job_title text not null,
  field text not null,
  status text not null default 'in-progress' check (status in (
    'in-progress', 'rejected', 'interview', 'offer'
  )),
  applied_at date not null default current_date,
  location text not null,
  link text,
  notes text
);

create index applications_user_date_idx
  on public.applications (user_id, applied_at desc, id);

alter table public.applications enable row level security;

revoke all on public.applications from anon;
grant select, insert, update, delete on public.applications to authenticated;

create policy "Read own applications" on public.applications
  for select to authenticated using ((select auth.uid()) = user_id);

create policy "Create own applications" on public.applications
  for insert to authenticated with check ((select auth.uid()) = user_id);

create policy "Update own applications" on public.applications
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Delete own applications" on public.applications
  for delete to authenticated using ((select auth.uid()) = user_id);

commit;
