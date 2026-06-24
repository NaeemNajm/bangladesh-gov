-- Bangladesh Civic Structure - Bengali-First Schema
-- Two tables: offices (দপ্তর) and positions (পদ)

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TYPE office_category AS ENUM (
  'Executive', 'Legislative', 'Judiciary', 'Constitutional'
);

-- ============================================================
-- OFFICES TABLE (দপ্তরসমূহ)
-- ============================================================
CREATE TABLE offices (
  id TEXT PRIMARY KEY,
  name_bn TEXT NOT NULL,                         -- দপ্তরের নাম বাংলায়
  parent_office_id TEXT REFERENCES offices(id) ON DELETE CASCADE,
  office_type_bn TEXT NOT NULL DEFAULT '',       -- যেমন: "মন্ত্রণালয়", "অধিদপ্তর"
  jurisdiction_bn TEXT NOT NULL DEFAULT '',       -- যেমন: "সমগ্র বাংলাদেশ"
  governing_law_bn TEXT DEFAULT NULL,            -- প্রাসঙ্গিক আইন
  target_audience_bn TEXT DEFAULT NULL,           -- সেবাগ্রহীতা
  contact_info JSONB DEFAULT NULL,               -- {website, email, phone}
  description_bn TEXT NOT NULL DEFAULT '',        -- বিবরণ
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_offices_parent ON offices(parent_office_id);

-- ============================================================
-- POSITIONS TABLE (পদসমূহ)
-- ============================================================
CREATE TABLE positions (
  id TEXT PRIMARY KEY,
  office_id TEXT NOT NULL REFERENCES offices(id) ON DELETE CASCADE,
  designation_bn TEXT NOT NULL,                   -- পদবি বাংলায়
  pay_grade_bn TEXT NOT NULL DEFAULT 'N/A',       -- যেমন: "গ্রেড ৩"
  parent_position_id TEXT REFERENCES positions(id) ON DELETE CASCADE,
  equivalent_rank_bn TEXT DEFAULT NULL,            -- সমমর্যাদা
  official_salutation_bn TEXT DEFAULT NULL,        -- সম্বোধন
  appointing_authority_bn TEXT DEFAULT NULL,       -- নিয়োগকারী কর্তৃপক্ষ
  public_service_usecase_bn TEXT DEFAULT NULL,     -- নাগরিক সেবা
  career_progression_bn TEXT DEFAULT NULL,          -- পদোন্নতি পথ
  responsibilities_bn TEXT NOT NULL DEFAULT '',     -- দায়িত্ব ও কর্তব্য
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_positions_office ON positions(office_id);
CREATE INDEX idx_positions_parent ON positions(parent_position_id);

-- ============================================================
-- AUTO-UPDATE TRIGGERS
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_offices_updated_at
  BEFORE UPDATE ON offices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_positions_updated_at
  BEFORE UPDATE ON positions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
