CREATE TABLE app.aho_organisations (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, code text UNIQUE, jurisdiction text NOT NULL DEFAULT 'SA', approval_reference text,
 status text NOT NULL DEFAULT 'active', contact jsonb NOT NULL DEFAULT '{}'::jsonb, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE app.aho_assignments (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organisation_id uuid NOT NULL REFERENCES app.organisations(id), premises_id uuid NOT NULL REFERENCES app.premises(id), aho_id uuid NOT NULL REFERENCES app.aho_organisations(id),
 effective_from date NOT NULL, effective_to date, status text NOT NULL DEFAULT 'active', UNIQUE(premises_id,aho_id,effective_from)
);
