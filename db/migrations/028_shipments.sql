CREATE TABLE app.shipments (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organisation_id uuid NOT NULL REFERENCES app.organisations(id), shipment_no text NOT NULL, origin_premises_id uuid REFERENCES app.premises(id), destination_country char(2) NOT NULL,
 carrier text, container_no text, seal_no text, departure_at timestamptz, arrival_at timestamptz, status text NOT NULL DEFAULT 'planned', metadata jsonb NOT NULL DEFAULT '{}'::jsonb, created_at timestamptz NOT NULL DEFAULT now(), UNIQUE(organisation_id,shipment_no)
);
CREATE TABLE app.shipment_batches (shipment_id uuid NOT NULL REFERENCES app.shipments(id) ON DELETE CASCADE, meat_batch_id uuid NOT NULL REFERENCES app.meat_batches(id), quantity numeric(14,3), unit text, PRIMARY KEY(shipment_id,meat_batch_id));
