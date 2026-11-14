CREATE OR REPLACE VIEW app.v_halal_chain AS
SELECT a.id animal_id,a.external_tag,a.species_code,se.id slaughter_event_id,se.event_at slaughtered_at,se.halal_personnel_id,
 c.id carcass_id,c.carcass_no,c.halal_status,mb.id meat_batch_id,mb.batch_no meat_batch_no,mb.halal_status meat_halal_status
FROM app.animals a LEFT JOIN app.slaughter_events se ON se.animal_id=a.id LEFT JOIN app.carcasses c ON c.slaughter_event_id=se.id LEFT JOIN app.meat_batches mb ON mb.cutting_run_id IN (SELECT cutting_run_id FROM app.cutting_inputs ci WHERE ci.carcass_id=c.id);
CREATE OR REPLACE VIEW app.v_open_findings AS
SELECT f.id,f.organisation_id,f.premises_id,f.finding_type,f.severity,f.status,f.title,f.detected_at,f.due_at
FROM app.findings f WHERE f.status NOT IN ('closed','verified');
CREATE OR REPLACE VIEW app.v_ai_risk_radar AS
SELECT a.organisation_id,a.assessment_type,a.subject_type,a.subject_id,a.risk_score,a.confidence,a.status,a.generated_at,
 count(f.id) AS finding_count
FROM app.ai_assessments a LEFT JOIN app.ai_findings f ON f.assessment_id=a.id GROUP BY a.id;
CREATE OR REPLACE VIEW app.v_traceability_breaks AS
SELECT x.entity_type,x.entity_id,x.organisation_id,'missing_trace_node'::text AS issue
FROM (SELECT entity_type,entity_id,organisation_id FROM app.trace_nodes) x
WHERE NOT EXISTS (SELECT 1 FROM app.trace_links t WHERE (t.from_type=x.entity_type AND t.from_id=x.entity_id) OR (t.to_type=x.entity_type AND t.to_id=x.entity_id));
CREATE OR REPLACE VIEW app.v_export_readiness AS
SELECT ec.id,ec.organisation_id,ec.consignment_no,ec.destination_country,ec.market_code,ec.status,
 EXISTS(SELECT 1 FROM app.shipments s WHERE s.id=ec.shipment_id) shipment_present,
 EXISTS(SELECT 1 FROM app.certificates c WHERE c.organisation_id=ec.organisation_id AND c.status='active' AND (c.expires_on IS NULL OR c.expires_on>=CURRENT_DATE)) certificate_available
FROM app.export_consignments ec;
