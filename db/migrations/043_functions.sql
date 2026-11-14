CREATE OR REPLACE FUNCTION app.set_updated_at() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN NEW.updated_at=now(); RETURN NEW; END $$;
CREATE OR REPLACE FUNCTION app.record_trace_node(p_org uuid,p_type text,p_id uuid) RETURNS void LANGUAGE sql AS $$
 INSERT INTO app.trace_nodes(entity_type,entity_id,organisation_id) VALUES(p_type,p_id,p_org) ON CONFLICT DO NOTHING;
$$;
CREATE OR REPLACE FUNCTION app.create_trace_link(p_org uuid,p_from_type text,p_from_id uuid,p_to_type text,p_to_id uuid,p_relationship text,p_quantity numeric DEFAULT NULL,p_unit text DEFAULT NULL,p_source uuid DEFAULT NULL) RETURNS uuid LANGUAGE plpgsql AS $$
DECLARE v_id uuid;
BEGIN INSERT INTO app.trace_links(organisation_id,from_type,from_id,to_type,to_id,relationship,quantity,unit,source_event_id) VALUES(p_org,p_from_type,p_from_id,p_to_type,p_to_id,p_relationship,p_quantity,p_unit,p_source) ON CONFLICT(from_type,from_id,to_type,to_id,relationship) DO UPDATE SET quantity=EXCLUDED.quantity,unit=EXCLUDED.unit,source_event_id=EXCLUDED.source_event_id RETURNING id INTO v_id; RETURN v_id; END $$;
CREATE OR REPLACE FUNCTION app.assert_positive_weight() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW.weight_kg IS NOT NULL AND NEW.weight_kg < 0 THEN RAISE EXCEPTION 'weight_kg must be >= 0'; END IF; RETURN NEW; END $$;
