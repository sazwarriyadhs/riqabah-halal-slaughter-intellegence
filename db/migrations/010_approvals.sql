CREATE TABLE app.approvals (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organisation_id uuid NOT NULL REFERENCES app.organisations(id), premises_id uuid REFERENCES app.premises(id),
 approval_type text NOT NULL, authority_type text NOT NULL, reference_no text, issued_on date, expires_on date, status text NOT NULL DEFAULT 'active', source_document_id uuid,
 metadata jsonb NOT NULL DEFAULT '{}'::jsonb, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
