CREATE TABLE app.halal_programmes (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organisation_id uuid NOT NULL REFERENCES app.organisations(id), premises_id uuid NOT NULL REFERENCES app.premises(id),
 programme_no text NOT NULL, title text NOT NULL, version text NOT NULL, effective_from date NOT NULL, effective_to date, status text NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','submitted','approved','superseded','suspended')),
 document_id uuid, scope jsonb NOT NULL DEFAULT '{}'::jsonb, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(), UNIQUE(premises_id,programme_no,version)
);
