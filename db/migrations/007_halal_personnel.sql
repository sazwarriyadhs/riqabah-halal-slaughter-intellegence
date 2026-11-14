CREATE TABLE app.halal_personnel (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organisation_id uuid NOT NULL REFERENCES app.organisations(id), user_id uuid REFERENCES app.users(id) ON DELETE SET NULL,
 full_name text NOT NULL, personnel_type text NOT NULL CHECK(personnel_type IN ('halal_supervisor','halal_slaughterer','auditor','issuing_officer','operator','other')),
 qualification_ref text, status text NOT NULL DEFAULT 'active', valid_from date, valid_to date, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
