CREATE TABLE app.cutting_runs (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organisation_id uuid NOT NULL REFERENCES app.organisations(id), premises_id uuid NOT NULL REFERENCES app.premises(id), run_no text NOT NULL, started_at timestamptz, ended_at timestamptz,
 line_code text, operator_user_id uuid REFERENCES app.users(id), status text NOT NULL DEFAULT 'planned', created_at timestamptz NOT NULL DEFAULT now(), UNIQUE(organisation_id,run_no)
);
CREATE TABLE app.cutting_inputs (cutting_run_id uuid NOT NULL REFERENCES app.cutting_runs(id) ON DELETE CASCADE, carcass_id uuid NOT NULL REFERENCES app.carcasses(id), PRIMARY KEY(cutting_run_id,carcass_id));
