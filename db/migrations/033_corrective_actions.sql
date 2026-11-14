CREATE TABLE app.corrective_actions (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), finding_id uuid NOT NULL REFERENCES app.findings(id) ON DELETE CASCADE, organisation_id uuid NOT NULL REFERENCES app.organisations(id), action_no text NOT NULL,
 description text NOT NULL, owner_user_id uuid REFERENCES app.users(id), due_at timestamptz, completed_at timestamptz, verification_status text NOT NULL DEFAULT 'pending', verification_notes text, evidence_ids jsonb NOT NULL DEFAULT '[]'::jsonb, status text NOT NULL DEFAULT 'open', created_at timestamptz NOT NULL DEFAULT now(), UNIQUE(organisation_id,action_no)
);
