CREATE TABLE app.meat_batches (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organisation_id uuid NOT NULL REFERENCES app.organisations(id), premises_id uuid REFERENCES app.premises(id), batch_no text NOT NULL,
 product_id uuid NOT NULL REFERENCES app.products(id), cutting_run_id uuid REFERENCES app.cutting_runs(id), quantity numeric(14,3) NOT NULL DEFAULT 0 CHECK(quantity>=0), unit text NOT NULL DEFAULT 'kg', produced_at timestamptz, expiry_at timestamptz,
 status text NOT NULL DEFAULT 'available', halal_status text NOT NULL DEFAULT 'pending', created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(), UNIQUE(organisation_id,batch_no)
);
