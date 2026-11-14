CREATE TABLE app.slaughter_events (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organisation_id uuid NOT NULL REFERENCES app.organisations(id), premises_id uuid NOT NULL REFERENCES app.premises(id), schedule_id uuid REFERENCES app.slaughter_schedules(id), batch_id uuid REFERENCES app.animal_batches(id), animal_id uuid REFERENCES app.animals(id),
 event_no text NOT NULL, event_at timestamptz NOT NULL, halal_personnel_id uuid REFERENCES app.halal_personnel(id), method_code text NOT NULL, outcome text NOT NULL DEFAULT 'completed',
 evidence_ids jsonb NOT NULL DEFAULT '[]'::jsonb, source_device text, source_event_id text, created_at timestamptz NOT NULL DEFAULT now(), UNIQUE(organisation_id,event_no)
);
