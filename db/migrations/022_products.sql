CREATE TABLE app.products (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organisation_id uuid NOT NULL REFERENCES app.organisations(id), sku text NOT NULL, name text NOT NULL, product_type text NOT NULL,
 species_code text, unit text NOT NULL DEFAULT 'kg', halal_class text, status text NOT NULL DEFAULT 'active', attributes jsonb NOT NULL DEFAULT '{}'::jsonb, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(), UNIQUE(organisation_id,sku)
);
