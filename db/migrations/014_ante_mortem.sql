CREATE TABLE app.ante_mortem_inspections (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organisation_id uuid NOT NULL REFERENCES app.organisations(id), batch_id uuid NOT NULL REFERENCES app.animal_batches(id), arrival_id uuid REFERENCES app.animal_arrivals(id),
 inspected_at timestamptz NOT NULL, inspector_user_id uuid REFERENCES app.users(id), outcome text NOT NULL CHECK(outcome IN ('passed','held','rejected','conditional')),
 observations text, animal_count integer NOT NULL DEFAULT 0, evidence_ids jsonb NOT NULL DEFAULT '[]'::jsonb, created_at timestamptz NOT NULL DEFAULT now()
);
