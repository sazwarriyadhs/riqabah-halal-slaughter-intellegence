CREATE TABLE app.carcasses (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organisation_id uuid NOT NULL REFERENCES app.organisations(id), premises_id uuid NOT NULL REFERENCES app.premises(id), animal_id uuid REFERENCES app.animals(id), slaughter_event_id uuid REFERENCES app.slaughter_events(id),
 carcass_no text NOT NULL, status text NOT NULL DEFAULT 'available', weight_kg numeric(12,3) CHECK(weight_kg IS NULL OR weight_kg>=0), grade text, halal_status text NOT NULL DEFAULT 'pending' CHECK(halal_status IN ('pending','supported','held','rejected')), created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(), UNIQUE(organisation_id,carcass_no)
);
