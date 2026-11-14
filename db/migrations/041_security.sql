CREATE TABLE app.security_events (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organisation_id uuid REFERENCES app.organisations(id), user_id uuid REFERENCES app.users(id), event_type text NOT NULL, severity text NOT NULL DEFAULT 'info',
 occurred_at timestamptz NOT NULL DEFAULT now(), source_ip inet, request_id text, success boolean, details jsonb NOT NULL DEFAULT '{}'::jsonb
);
CREATE TABLE app.webhook_endpoints (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organisation_id uuid NOT NULL REFERENCES app.organisations(id) ON DELETE CASCADE, name text NOT NULL, endpoint_url text NOT NULL, secret_hash text,
 event_types text[] NOT NULL DEFAULT '{}', active boolean NOT NULL DEFAULT true, created_at timestamptz NOT NULL DEFAULT now()
);
