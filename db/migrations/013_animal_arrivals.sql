CREATE TABLE app.animal_arrivals (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organisation_id uuid NOT NULL REFERENCES app.organisations(id), premises_id uuid NOT NULL REFERENCES app.premises(id), batch_id uuid NOT NULL REFERENCES app.animal_batches(id),
 arrival_no text NOT NULL, arrived_at timestamptz NOT NULL, vehicle_ref text, transporter text, origin text, document_refs jsonb NOT NULL DEFAULT '[]'::jsonb,
 condition_status text NOT NULL DEFAULT 'acceptable', received_by uuid REFERENCES app.users(id), created_at timestamptz NOT NULL DEFAULT now(), UNIQUE(organisation_id,arrival_no)
);
