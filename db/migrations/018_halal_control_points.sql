CREATE TABLE app.halal_control_points (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), programme_id uuid NOT NULL REFERENCES app.halal_programmes(id), code text NOT NULL, name text NOT NULL, sequence_no integer NOT NULL,
 criticality text NOT NULL DEFAULT 'control', required boolean NOT NULL DEFAULT true, acceptance_criteria text, status text NOT NULL DEFAULT 'active', UNIQUE(programme_id,code)
);
CREATE TABLE app.halal_control_checks (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), control_point_id uuid NOT NULL REFERENCES app.halal_control_points(id), slaughter_event_id uuid REFERENCES app.slaughter_events(id), checked_at timestamptz NOT NULL DEFAULT now(),
 result text NOT NULL CHECK(result IN ('pass','fail','not_applicable','pending')), observed_value jsonb NOT NULL DEFAULT '{}'::jsonb, checked_by uuid REFERENCES app.users(id), evidence_ids jsonb NOT NULL DEFAULT '[]'::jsonb, notes text
);
