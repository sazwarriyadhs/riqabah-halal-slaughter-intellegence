CREATE TABLE app.training_courses (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), code text NOT NULL UNIQUE, name text NOT NULL, provider text, validity_months integer CHECK(validity_months IS NULL OR validity_months>0));
CREATE TABLE app.training_records (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organisation_id uuid NOT NULL REFERENCES app.organisations(id), personnel_id uuid NOT NULL REFERENCES app.halal_personnel(id) ON DELETE CASCADE,
 course_id uuid NOT NULL REFERENCES app.training_courses(id), completed_on date NOT NULL, expires_on date, certificate_no text, evidence_id uuid, status text NOT NULL DEFAULT 'valid', created_at timestamptz NOT NULL DEFAULT now(), UNIQUE(personnel_id,course_id,completed_on)
);
