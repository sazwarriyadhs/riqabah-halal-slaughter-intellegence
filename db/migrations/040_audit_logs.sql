CREATE TABLE audit.audit_logs (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organisation_id uuid REFERENCES app.organisations(id), actor_user_id uuid REFERENCES app.users(id), action text NOT NULL, entity_type text NOT NULL, entity_id uuid,
 occurred_at timestamptz NOT NULL DEFAULT now(), request_id text, source_ip inet, user_agent text, before_data jsonb, after_data jsonb, metadata jsonb NOT NULL DEFAULT '{}'::jsonb
);
