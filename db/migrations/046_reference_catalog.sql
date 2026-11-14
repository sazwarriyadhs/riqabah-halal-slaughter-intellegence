BEGIN;

-- ============================================================
-- RIQABAH REFERENCE CATALOG
-- Migration: 046
--
-- Purpose:
--   Establish the reference/master catalog required by
--   db/seed/reference.sql.
--
-- Safety:
--   - No DROP
--   - No DELETE
--   - No UPDATE of existing application data
--   - Idempotent object creation
-- ============================================================

CREATE TABLE IF NOT EXISTS ref.species (
    code text PRIMARY KEY,
    name text NOT NULL,
    active boolean NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS ref.countries (
    code text PRIMARY KEY,
    name text NOT NULL,
    active boolean NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS ref.currencies (
    code text PRIMARY KEY,
    name text NOT NULL,
    active boolean NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS ref.timezones (
    code text PRIMARY KEY,
    name text NOT NULL,
    active boolean NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS ref.facility_types (
    code text PRIMARY KEY,
    name text NOT NULL,
    active boolean NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS ref.evidence_types (
    code text PRIMARY KEY,
    name text NOT NULL,
    active boolean NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS ref.risk_levels (
    code text PRIMARY KEY,
    name text NOT NULL,
    active boolean NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS ref.market_codes (
    code text PRIMARY KEY,
    name text NOT NULL,
    country_code text NOT NULL,
    active boolean NOT NULL DEFAULT true,

    CONSTRAINT fk_market_codes_country
        FOREIGN KEY (country_code)
        REFERENCES ref.countries(code)
);

CREATE INDEX IF NOT EXISTS idx_ref_species_active
    ON ref.species(active);

CREATE INDEX IF NOT EXISTS idx_ref_countries_active
    ON ref.countries(active);

CREATE INDEX IF NOT EXISTS idx_ref_currencies_active
    ON ref.currencies(active);

CREATE INDEX IF NOT EXISTS idx_ref_timezones_active
    ON ref.timezones(active);

CREATE INDEX IF NOT EXISTS idx_ref_facility_types_active
    ON ref.facility_types(active);

CREATE INDEX IF NOT EXISTS idx_ref_evidence_types_active
    ON ref.evidence_types(active);

CREATE INDEX IF NOT EXISTS idx_ref_risk_levels_active
    ON ref.risk_levels(active);

CREATE INDEX IF NOT EXISTS idx_ref_market_codes_country
    ON ref.market_codes(country_code);

CREATE INDEX IF NOT EXISTS idx_ref_market_codes_active
    ON ref.market_codes(active);

COMMIT;
