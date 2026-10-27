-- ============================================================================
-- NESE – database security rules (Row Level Security)
--
-- Run ONCE in Supabase → SQL Editor, AFTER you have set up two-factor login
-- in the admin panel (otherwise saving in the admin panel will be blocked).
--
-- Effect:
--   • Everyone may READ site content (needed to show the public website).
--   • Only the admin account WITH a verified second factor (aal2) may
--     change content, sections and theme.
--   • Anyone may SUBMIT an enquiry (length-limited), but only the admin
--     with 2FA may READ, change or delete enquiries (personal data / GDPR).
--   • All previously existing policies on these tables are replaced.
--
-- Safe to run again: it drops and recreates its own rules.
-- ============================================================================

do $$
declare
  admin_email constant text := 'milana_bagdasarjan@icloud.com';  -- admin login email
  admin_uid uuid;
  pol record;
begin
  select id into admin_uid from auth.users where lower(email) = lower(admin_email);
  if admin_uid is null then
    raise exception 'Admin user % not found in auth.users', admin_email;
  end if;

  -- Helper: true only for the admin account with a verified second factor.
  execute format($f$
    create or replace function public.is_nese_admin()
    returns boolean
    language sql
    stable
    security invoker
    set search_path = ''
    as $body$
      select coalesce(auth.uid() = %L::uuid, false)
         and coalesce(auth.jwt() ->> 'aal', '') = 'aal2'
    $body$
  $f$, admin_uid);

  -- Remove every existing policy on the three tables.
  for pol in
    select schemaname, tablename, policyname
    from pg_policies
    where schemaname = 'public'
      and tablename in ('site_settings', 'page_sections', 'contacts')
  loop
    execute format('drop policy %I on %I.%I', pol.policyname, pol.schemaname, pol.tablename);
  end loop;
end $$;

alter table public.site_settings enable row level security;
alter table public.page_sections enable row level security;
alter table public.contacts      enable row level security;

-- ── site_settings ───────────────────────────────────────────────────────────
create policy "public can read settings"
  on public.site_settings for select
  to anon, authenticated
  using (true);

create policy "admin with 2fa can write settings"
  on public.site_settings for all
  to authenticated
  using (public.is_nese_admin())
  with check (public.is_nese_admin());

-- ── page_sections ───────────────────────────────────────────────────────────
create policy "public can read sections"
  on public.page_sections for select
  to anon, authenticated
  using (true);

create policy "admin with 2fa can write sections"
  on public.page_sections for all
  to authenticated
  using (public.is_nese_admin())
  with check (public.is_nese_admin());

-- ── contacts (enquiries) ────────────────────────────────────────────────────
create policy "anyone can submit a valid enquiry"
  on public.contacts for insert
  to anon, authenticated
  with check (
        char_length(name) between 2 and 120
    and (organisation is null or char_length(organisation) <= 160)
    and char_length(email) between 3 and 254
    and char_length(enquiry) between 10 and 5000
  );

create policy "admin with 2fa can read enquiries"
  on public.contacts for select
  to authenticated
  using (public.is_nese_admin());

create policy "admin with 2fa can delete enquiries"
  on public.contacts for delete
  to authenticated
  using (public.is_nese_admin());

-- Quick check (should list 7 policies):
select tablename, policyname, cmd from pg_policies
where schemaname = 'public' and tablename in ('site_settings', 'page_sections', 'contacts')
order by tablename, policyname;
