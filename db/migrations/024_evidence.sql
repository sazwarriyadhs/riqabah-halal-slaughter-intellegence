CREATE TABLE app.evidence (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organisation_id uuid NOT NULL REFERENCES app.organisations(id), evidence_type text NOT NULL, file_name text, storage_uri text,
 sha256 text NOT NULL, mime_type text, size_bytes bigint CHECK(size_bytes IS NULL OR size_bytes>=0), captured_at timestamptz, captured_by uuid REFERENCES app.users(id), source_system text, immutable boolean NOT NULL DEFAULT true,
 metadata jsonb NOT NULL DEFAULT '{}'::jsonb, created_at timestamptz NOT NULL DEFAULT now(), UNIQUE(organisation_id,sha256)
);
