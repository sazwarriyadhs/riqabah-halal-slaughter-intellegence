CREATE TABLE app.facilities (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organisation_id uuid NOT NULL REFERENCES app.organisations(id), code text NOT NULL, name text NOT NULL,
 facility_type text NOT NULL DEFAULT 'processing', address jsonb NOT NULL DEFAULT '{}'::jsonb, timezone text NOT NULL DEFAULT 'Asia/Riyadh',
 status text NOT NULL DEFAULT 'active' CHECK(status IN ('active','inactive','suspended')), created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(organisation_id,code)
);
