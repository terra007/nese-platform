-- ============================================================
-- NESE Admin Panel — Supabase Setup
-- Run this in the Supabase SQL Editor for your project.
-- If you already ran a previous version, use the ALTER/DROP
-- statements at the bottom to update the policies.
-- ============================================================

-- 1. Site settings table (editable content + theme)
CREATE TABLE IF NOT EXISTS site_settings (
  key        TEXT PRIMARY KEY,
  value      TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public can read (frontend fetches content on every page load)
CREATE POLICY "Public read site_settings"
  ON site_settings FOR SELECT
  USING (true);

-- Only the admin email can write.
-- Replace the email below if ADMIN_EMAIL ever changes.
CREATE POLICY "Admin write site_settings"
  ON site_settings FOR ALL
  USING ((auth.jwt() ->> 'email') = 'REDACTED');

-- ============================================================
-- 2. Contacts table
-- ============================================================
CREATE TABLE IF NOT EXISTS contacts (
  id           BIGSERIAL PRIMARY KEY,
  name         TEXT NOT NULL,
  organisation TEXT,
  email        TEXT NOT NULL,
  enquiry      TEXT NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Anyone can INSERT (public contact form)
CREATE POLICY "Public insert contacts"
  ON contacts FOR INSERT
  WITH CHECK (true);

-- Only the admin can read submissions
CREATE POLICY "Admin read contacts"
  ON contacts FOR SELECT
  USING ((auth.jwt() ->> 'email') = 'REDACTED');

-- ============================================================
-- 3. Create the admin Supabase user
-- ============================================================
-- Dashboard → Authentication → Users → Add User → Create new user
--   Email:    REDACTED
--   Password: (choose a strong password)
--   Uncheck "Send confirmation email"
-- ============================================================

-- ============================================================
-- UPDATING FROM A PREVIOUS INSTALL
-- If you already ran an older version of this file, drop the
-- old broad policies and recreate them:
-- ============================================================
-- DROP POLICY IF EXISTS "Auth write site_settings" ON site_settings;
-- DROP POLICY IF EXISTS "Auth read contacts"       ON contacts;
--
-- Then re-run the CREATE POLICY statements above.
-- ============================================================
