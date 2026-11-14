CREATE TABLE app.users (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), email citext NOT NULL UNIQUE,
 password_hash text, display_name text NOT NULL, phone text, status text NOT NULL DEFAULT 'active' CHECK(status IN ('active','inactive','locked','invited')),
 last_login_at timestamptz, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE app.roles (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), code text NOT NULL UNIQUE, name text NOT NULL, description text);
CREATE TABLE app.user_roles (user_id uuid NOT NULL REFERENCES app.users(id) ON DELETE CASCADE, role_id uuid NOT NULL REFERENCES app.roles(id) ON DELETE CASCADE, PRIMARY KEY(user_id,role_id));
CREATE TABLE app.api_keys (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid REFERENCES app.users(id) ON DELETE SET NULL, name text NOT NULL, key_hash text NOT NULL UNIQUE, expires_at timestamptz, revoked_at timestamptz, created_at timestamptz NOT NULL DEFAULT now());
