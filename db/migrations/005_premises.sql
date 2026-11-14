CREATE TABLE app.premises (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), facility_id uuid NOT NULL REFERENCES app.facilities(id) ON DELETE CASCADE, code text NOT NULL, name text NOT NULL,
 premises_type text NOT NULL, mpi_approval_no text, export_approved boolean NOT NULL DEFAULT false, halal_approved boolean NOT NULL DEFAULT false,
 address jsonb NOT NULL DEFAULT '{}'::jsonb, status text NOT NULL DEFAULT 'active', created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(facility_id,code)
);
