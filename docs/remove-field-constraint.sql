-- For databases created with docs/supabase-setup.sql before configurable fields.
-- Keeps existing application data.
alter table public.applications drop constraint if exists applications_field_check;
