CREATE TABLE app.animals (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organisation_id uuid NOT NULL REFERENCES app.organisations(id), external_tag text NOT NULL, species_code text NOT NULL,
 sex text CHECK(sex IN ('male','female','unknown')), birth_date date, source_farm text, status text NOT NULL DEFAULT 'received', metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(), UNIQUE(organisation_id,external_tag)
);
