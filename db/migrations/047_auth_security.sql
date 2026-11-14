-- ============================================================
-- RIQABAH 047 - AUTH SECURITY FOUNDATION
-- ============================================================
-- Adds:
--   app.auth_accounts
--   app.auth_refresh_sessions
--   security indexes
--
-- Existing migrations 001-046 MUST NOT be modified.
-- ============================================================

BEGIN;

CREATE TABLE IF NOT EXISTS app.auth_accounts (
    id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             uuid NOT NULL UNIQUE
        REFERENCES app.users(id) ON DELETE CASCADE,

    login_identifier    text NOT NULL,
    login_normalized    text NOT NULL UNIQUE,

    password_hash       text NOT NULL,

    status              text NOT NULL DEFAULT 'active'
        CHECK (status IN ('active','locked','disabled')),

    failed_attempts    integer NOT NULL DEFAULT 0
        CHECK (failed_attempts >= 0),

    locked_until        timestamptz NULL,

    password_changed_at timestamptz NOT NULL DEFAULT now(),
    last_login_at       timestamptz NULL,

    created_at          timestamptz NOT NULL DEFAULT now(),
    updated_at          timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_auth_accounts_user
    ON app.auth_accounts(user_id);

CREATE INDEX IF NOT EXISTS idx_auth_accounts_login
    ON app.auth_accounts(login_normalized);

CREATE TABLE IF NOT EXISTS app.auth_refresh_sessions (
    id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id             uuid NOT NULL
        REFERENCES app.users(id) ON DELETE CASCADE,

    token_hash          text NOT NULL UNIQUE,

    issued_at           timestamptz NOT NULL DEFAULT now(),
    expires_at          timestamptz NOT NULL,

    revoked_at          timestamptz NULL,

    ip_address          inet NULL,
    user_agent           text NULL,

    replaced_by         uuid NULL
        REFERENCES app.auth_refresh_sessions(id)
        ON DELETE SET NULL,

    created_at          timestamptz NOT NULL DEFAULT now(),

    CHECK (expires_at > issued_at)
);

CREATE INDEX IF NOT EXISTS idx_auth_refresh_user
    ON app.auth_refresh_sessions(user_id);

CREATE INDEX IF NOT EXISTS idx_auth_refresh_expires
    ON app.auth_refresh_sessions(expires_at);

CREATE INDEX IF NOT EXISTS idx_auth_refresh_active
    ON app.auth_refresh_sessions(user_id, revoked_at, expires_at);

COMMIT;