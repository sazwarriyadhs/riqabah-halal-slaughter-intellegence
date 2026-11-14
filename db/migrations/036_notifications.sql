CREATE TABLE app.notifications (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organisation_id uuid REFERENCES app.organisations(id), user_id uuid REFERENCES app.users(id) ON DELETE CASCADE, channel text NOT NULL CHECK(channel IN ('in_app','email','sms','webhook')),
 category text NOT NULL, title text NOT NULL, body text NOT NULL, severity text NOT NULL DEFAULT 'info', status text NOT NULL DEFAULT 'queued', scheduled_at timestamptz, sent_at timestamptz, read_at timestamptz, payload jsonb NOT NULL DEFAULT '{}'::jsonb, created_at timestamptz NOT NULL DEFAULT now()
);
