CREATE TABLE app.post_mortem_inspections (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organisation_id uuid NOT NULL REFERENCES app.organisations(id), slaughter_event_id uuid REFERENCES app.slaughter_events(id), animal_id uuid REFERENCES app.animals(id),
 inspected_at timestamptz NOT NULL, inspector_user_id uuid REFERENCES app.users(id), outcome text NOT NULL CHECK(outcome IN ('passed','held','rejected','conditional')), findings text, disposition text, evidence_ids jsonb NOT NULL DEFAULT '[]'::jsonb, created_at timestamptz NOT NULL DEFAULT now()
);
