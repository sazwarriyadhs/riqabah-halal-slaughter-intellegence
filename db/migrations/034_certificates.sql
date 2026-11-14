CREATE TABLE app.certificates (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organisation_id uuid NOT NULL REFERENCES app.organisations(id), premises_id uuid REFERENCES app.premises(id), aho_id uuid REFERENCES app.aho_organisations(id),
 certificate_type text NOT NULL, certificate_no text, issued_on date, expires_on date, status text NOT NULL DEFAULT 'active', subject jsonb NOT NULL DEFAULT '{}'::jsonb, evidence_id uuid REFERENCES app.evidence(id), source_document_id uuid REFERENCES app.documents(id), UNIQUE(organisation_id,certificate_no)
);
