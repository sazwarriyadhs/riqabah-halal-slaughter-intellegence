CREATE TABLE app.slaughter_schedules (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organisation_id uuid NOT NULL REFERENCES app.organisations(id), premises_id uuid NOT NULL REFERENCES app.premises(id), batch_id uuid REFERENCES app.animal_batches(id),
 scheduled_start timestamptz NOT NULL, scheduled_end timestamptz, line_code text, planned_count integer NOT NULL DEFAULT 0 CHECK(planned_count>=0), status text NOT NULL DEFAULT 'planned',
 halal_personnel_id uuid REFERENCES app.halal_personnel(id), notes text, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
