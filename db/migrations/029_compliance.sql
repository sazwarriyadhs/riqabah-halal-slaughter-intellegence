CREATE TABLE app.compliance_frameworks (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), code text NOT NULL UNIQUE, name text NOT NULL, jurisdiction text NOT NULL, version text, status text NOT NULL DEFAULT 'active');
CREATE TABLE app.compliance_assessments (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organisation_id uuid NOT NULL REFERENCES app.organisations(id), premises_id uuid REFERENCES app.premises(id), framework_id uuid NOT NULL REFERENCES app.compliance_frameworks(id), assessed_at timestamptz NOT NULL DEFAULT now(), status text NOT NULL DEFAULT 'open', score numeric(7,3), summary text, assessor_id uuid REFERENCES app.users(id), evidence_ids jsonb NOT NULL DEFAULT '[]'::jsonb
);
