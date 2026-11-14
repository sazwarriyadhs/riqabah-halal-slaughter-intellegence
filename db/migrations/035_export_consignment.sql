CREATE TABLE app.export_consignments (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organisation_id uuid NOT NULL REFERENCES app.organisations(id), shipment_id uuid REFERENCES app.shipments(id), consignment_no text NOT NULL,
 destination_country char(2) NOT NULL, market_code text, exporter_reference text, export_certificate_ref text, halal_certificate_ref text, status text NOT NULL DEFAULT 'draft', submitted_at timestamptz, certified_at timestamptz,
 metadata jsonb NOT NULL DEFAULT '{}'::jsonb, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(), UNIQUE(organisation_id,consignment_no)
);
