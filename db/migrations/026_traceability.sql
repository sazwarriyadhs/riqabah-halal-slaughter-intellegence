CREATE TABLE app.trace_links (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organisation_id uuid NOT NULL REFERENCES app.organisations(id), from_type text NOT NULL, from_id uuid NOT NULL, to_type text NOT NULL, to_id uuid NOT NULL,
 relationship text NOT NULL, quantity numeric(14,3), unit text, occurred_at timestamptz NOT NULL DEFAULT now(), source_event_id uuid, evidence_ids jsonb NOT NULL DEFAULT '[]'::jsonb, metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
 UNIQUE(from_type,from_id,to_type,to_id,relationship)
);
CREATE TABLE app.trace_nodes (entity_type text NOT NULL, entity_id uuid NOT NULL, organisation_id uuid NOT NULL REFERENCES app.organisations(id), PRIMARY KEY(entity_type,entity_id));
