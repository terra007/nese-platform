-- ============================================================
-- NESE Admin Panel — Supabase Setup
-- Run this in the Supabase SQL Editor for your project
-- ============================================================

-- 1. Site settings table (editable content + theme)
CREATE TABLE IF NOT EXISTS site_settings (
  key   TEXT PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public can read (frontend fetches content)
CREATE POLICY "Public read site_settings"
  ON site_settings FOR SELECT
  USING (true);

-- Authenticated users (admin) can write
CREATE POLICY "Auth write site_settings"
  ON site_settings FOR ALL
  USING (auth.role() = 'authenticated');

-- 2. Contacts table (already created if you ran the contact form setup)
CREATE TABLE IF NOT EXISTS contacts (
  id           BIGSERIAL PRIMARY KEY,
  name         TEXT NOT NULL,
  organisation TEXT,
  email        TEXT NOT NULL,
  enquiry      TEXT NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (contact form)
CREATE POLICY "Public insert contacts"
  ON contacts FOR INSERT
  WITH CHECK (true);

-- Only authenticated users can read contacts (admin dashboard)
CREATE POLICY "Auth read contacts"
  ON contacts FOR SELECT
  USING (auth.role() = 'authenticated');

-- ============================================================
-- 3. Create your admin user
-- ============================================================
-- Go to: Supabase Dashboard → Authentication → Users → Add User
-- Enter your admin email + password.
-- That user will be able to log in at /admin/login
-- ============================================================

-- 4. (Optional) Supabase Storage for image uploads
-- Go to: Supabase Dashboard → Storage → New Bucket
-- Name: "media"
-- Public bucket: YES (check "Public bucket")
-- Then add a policy: authenticated users can upload (INSERT)
-- ============================================================
