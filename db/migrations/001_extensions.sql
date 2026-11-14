CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS citext;
CREATE EXTENSION IF NOT EXISTS btree_gist;
CREATE SCHEMA IF NOT EXISTS app;
CREATE SCHEMA IF NOT EXISTS ref;
CREATE SCHEMA IF NOT EXISTS audit;
CREATE TABLE IF NOT EXISTS public.schema_migrations (
 version integer PRIMARY KEY, filename text NOT NULL, checksum text NOT NULL,
 applied_at timestamptz NOT NULL DEFAULT now(), execution_ms bigint NOT NULL DEFAULT 0
);
