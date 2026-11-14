CREATE TABLE app.organisations (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), legal_name text NOT NULL, trading_name text, registration_no text,
 country_code char(2) NOT NULL DEFAULT 'SA', timezone text NOT NULL DEFAULT 'Asia/Riyadh', currency_code char(3) NOT NULL DEFAULT 'SAR',
 status text NOT NULL DEFAULT 'active' CHECK(status IN ('active','inactive','suspended')), metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(), UNIQUE(country_code,registration_no)
);
CREATE TABLE app.organisation_users (organisation_id uuid NOT NULL REFERENCES app.organisations(id) ON DELETE CASCADE, user_id uuid NOT NULL REFERENCES app.users(id) ON DELETE CASCADE, role_code text NOT NULL, status text NOT NULL DEFAULT 'active', PRIMARY KEY(organisation_id,user_id));
