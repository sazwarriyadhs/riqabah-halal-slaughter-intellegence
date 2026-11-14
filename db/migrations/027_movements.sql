CREATE TABLE app.movements (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organisation_id uuid NOT NULL REFERENCES app.organisations(id), entity_type text NOT NULL, entity_id uuid NOT NULL,
 from_location text, to_location text, moved_at timestamptz NOT NULL, carrier text, reference_no text, status text NOT NULL DEFAULT 'completed', evidence_ids jsonb NOT NULL DEFAULT '[]'::jsonb, created_at timestamptz NOT NULL DEFAULT now()
);
