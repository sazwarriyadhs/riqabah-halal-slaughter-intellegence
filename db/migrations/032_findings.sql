CREATE TABLE app.findings (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organisation_id uuid NOT NULL REFERENCES app.organisations(id), premises_id uuid REFERENCES app.premises(id), requirement_id uuid REFERENCES app.requirements(id),
 finding_type text NOT NULL, severity text NOT NULL DEFAULT 'medium' CHECK(severity IN ('low','medium','high','critical')), status text NOT NULL DEFAULT 'open', title text NOT NULL, description text, detected_at timestamptz NOT NULL DEFAULT now(), detected_by uuid REFERENCES app.users(id), source text NOT NULL DEFAULT 'human', evidence_ids jsonb NOT NULL DEFAULT '[]'::jsonb, due_at timestamptz
);
