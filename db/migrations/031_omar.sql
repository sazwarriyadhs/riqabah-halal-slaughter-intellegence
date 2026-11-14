CREATE TABLE app.omar_documents (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), country_code char(2) NOT NULL, market_code text NOT NULL, title text NOT NULL, document_no text, version text, effective_from date, effective_to date,
 source_uri text, retrieved_at timestamptz, checksum text, status text NOT NULL DEFAULT 'active', raw_metadata jsonb NOT NULL DEFAULT '{}'::jsonb, UNIQUE(country_code,market_code,document_no,version)
);
CREATE TABLE app.omar_requirements (omar_id uuid NOT NULL REFERENCES app.omar_documents(id) ON DELETE CASCADE, requirement_id uuid NOT NULL REFERENCES app.requirements(id) ON DELETE CASCADE, applicability text NOT NULL DEFAULT 'applicable', PRIMARY KEY(omar_id,requirement_id));
