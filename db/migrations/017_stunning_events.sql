CREATE TABLE app.stunning_events (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), slaughter_event_id uuid NOT NULL REFERENCES app.slaughter_events(id) ON DELETE CASCADE, occurred_at timestamptz NOT NULL,
 method_code text, equipment_ref text, parameters jsonb NOT NULL DEFAULT '{}'::jsonb, outcome text NOT NULL DEFAULT 'recorded', verified_by uuid REFERENCES app.users(id), created_at timestamptz NOT NULL DEFAULT now()
);
