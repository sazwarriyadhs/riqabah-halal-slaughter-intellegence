CREATE TABLE app.animal_batches (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organisation_id uuid NOT NULL REFERENCES app.organisations(id), premises_id uuid REFERENCES app.premises(id), batch_no text NOT NULL,
 species_code text NOT NULL, supplier_name text, animal_count integer NOT NULL DEFAULT 0 CHECK(animal_count>=0), received_at timestamptz, status text NOT NULL DEFAULT 'open',
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(), UNIQUE(organisation_id,batch_no)
);
CREATE TABLE app.animal_batch_members (batch_id uuid NOT NULL REFERENCES app.animal_batches(id) ON DELETE CASCADE, animal_id uuid NOT NULL REFERENCES app.animals(id) ON DELETE RESTRICT, PRIMARY KEY(batch_id,animal_id));
