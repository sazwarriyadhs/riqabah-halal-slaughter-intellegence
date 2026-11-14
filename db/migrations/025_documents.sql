CREATE TABLE app.documents (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organisation_id uuid NOT NULL REFERENCES app.organisations(id), document_type text NOT NULL, document_no text, title text NOT NULL,
 version text NOT NULL DEFAULT '1', issued_on date, effective_from date, effective_to date, status text NOT NULL DEFAULT 'active', evidence_id uuid REFERENCES app.evidence(id), extracted_data jsonb NOT NULL DEFAULT '{}'::jsonb,
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
