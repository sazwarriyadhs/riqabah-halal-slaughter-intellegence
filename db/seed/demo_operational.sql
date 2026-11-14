BEGIN;

-- ============================================================
-- RIQABAH — DEMO OPERATIONAL DATA
-- NZ-FIRST HALAL SLAUGHTER INTELLIGENCE
-- SAFE / IDEMPOTENT / NON-DESTRUCTIVE
-- ============================================================

-- ------------------------------------------------------------
-- Stable IDs
-- ------------------------------------------------------------
DO $$
BEGIN
    -- No-op block: seed is intentionally explicit and transactional.
END $$;

-- ------------------------------------------------------------
-- ORGANISATION
-- ------------------------------------------------------------
INSERT INTO app.organisations (
    id,
    legal_name,
    trading_name,
    registration_no,
    country_code,
    timezone,
    currency_code,
    status,
    metadata
)
VALUES (
    '00000000-0000-0000-0000-000000000101',
    'RIQABAH Demo Saudi Ltd',
    'RIQABAH Demo Saudi',
    'RIQABAH-DEMO-SA-001',
    'SA',
    'Asia/Riyadh',
    'SAR',
    'active',
    '{"demo":true,"source":"tiaKi_demo_seed"}'::jsonb
)
ON CONFLICT (country_code, registration_no) DO UPDATE
SET
    trading_name = EXCLUDED.trading_name,
    status = EXCLUDED.status,
    updated_at = now();

-- ------------------------------------------------------------
-- FACILITY
-- ------------------------------------------------------------
INSERT INTO app.facilities (
    id,
    organisation_id,
    code,
    name,
    facility_type,
    address,
    timezone,
    status
)
VALUES (
    '00000000-0000-0000-0000-000000000102',
    '00000000-0000-0000-0000-000000000101',
    'RUH-HALAL-01',
    'Riyadh Halal Processing Facility',
    'processing',
    '{"city":"Riyadh","country":"SA","demo":true}'::jsonb,
    'Asia/Riyadh',
    'active'
)
ON CONFLICT (organisation_id, code) DO UPDATE
SET
    name = EXCLUDED.name,
    status = EXCLUDED.status,
    updated_at = now();

-- ------------------------------------------------------------
-- PREMISES
-- ------------------------------------------------------------
INSERT INTO app.premises (
    id,
    facility_id,
    code,
    name,
    premises_type,
    mpi_approval_no,
    export_approved,
    halal_approved,
    address,
    status
)
VALUES (
    '00000000-0000-0000-0000-000000000103',
    '00000000-0000-0000-0000-000000000102',
    'SL-01',
    'Halal Slaughter Premises',
    'slaughter',
    'DEMO-SFDA-REF-001',
    false,
    false,
    '{"city":"Riyadh","country":"SA","demo":true}'::jsonb,
    'active'
)
ON CONFLICT (facility_id, code) DO UPDATE
SET
    name = EXCLUDED.name,
    status = EXCLUDED.status;

-- ------------------------------------------------------------
-- USER
-- ------------------------------------------------------------
INSERT INTO app.users (
    id,
    email,
    display_name,
    phone,
    status
)
VALUES (
    '00000000-0000-0000-0000-000000000104',
    'halal.officer@demo.riqabah.sa',
    'RIQABAH Demo Saudi Officer',
    '+966 50 000 0001',
    'active'
)
ON CONFLICT (email) DO UPDATE
SET
    display_name = EXCLUDED.display_name,
    status = EXCLUDED.status,
    updated_at = now();

-- ------------------------------------------------------------
-- HALAL PERSONNEL
-- ------------------------------------------------------------
INSERT INTO app.halal_personnel (
    id,
    organisation_id,
    user_id,
    full_name,
    personnel_type,
    qualification_ref,
    status,
    valid_from
)
VALUES (
    '00000000-0000-0000-0000-000000000105',
    '00000000-0000-0000-0000-000000000101',
    '00000000-0000-0000-0000-000000000104',
    'RIQABAH Demo Saudi Officer',
    'halal_supervisor',
    'DEMO-HALAL-QUAL-001',
    'active',
    CURRENT_DATE
)
ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- EQUIPMENT
-- ------------------------------------------------------------
INSERT INTO app.equipment (
    id,
    organisation_id,
    facility_id,
    premises_id,
    code,
    name,
    equipment_type,
    manufacturer,
    model,
    serial_no,
    status,
    metadata
)
VALUES
(
    '00000000-0000-0000-0000-000000000106',
    '00000000-0000-0000-0000-000000000101',
    '00000000-0000-0000-0000-000000000102',
    '00000000-0000-0000-0000-000000000103',
    'SL-LINE-01',
    'Halal Slaughter Line 01',
    'slaughter_line',
    'RIQABAH Demo',
    'SL-01',
    'DEMO-SL-001',
    'active',
    '{"demo":true}'::jsonb
),
(
    '00000000-0000-0000-0000-000000000107',
    '00000000-0000-0000-0000-000000000101',
    '00000000-0000-0000-0000-000000000102',
    '00000000-0000-0000-0000-000000000103',
    'COLD-ROOM-01',
    'Cold Room 01',
    'cold_room',
    'RIQABAH Demo',
    'CR-01',
    'DEMO-CR-001',
    'active',
    '{"demo":true}'::jsonb
)
ON CONFLICT (organisation_id, code) DO UPDATE
SET
    name = EXCLUDED.name,
    status = EXCLUDED.status,
    updated_at = now();

-- ------------------------------------------------------------
-- IOT DEVICE
-- ------------------------------------------------------------
INSERT INTO app.iot_devices (
    id,
    organisation_id,
    equipment_id,
    device_uid,
    device_type,
    manufacturer,
    model,
    firmware_version,
    protocol,
    status,
    last_seen_at,
    metadata
)
VALUES (
    '00000000-0000-0000-0000-000000000108',
    '00000000-0000-0000-0000-000000000101',
    '00000000-0000-0000-0000-000000000107',
    'RIQABAH-DEMO-TEMP-001',
    'temperature_gateway',
    'RIQABAH Demo',
    'TG-01',
    '1.0.0',
    'MQTT',
    'online',
    now(),
    '{"demo":true}'::jsonb
)
ON CONFLICT (organisation_id, device_uid) DO UPDATE
SET
    status = EXCLUDED.status,
    last_seen_at = EXCLUDED.last_seen_at,
    updated_at = now();

-- ------------------------------------------------------------
-- TEMPERATURE SENSOR
-- ------------------------------------------------------------
INSERT INTO app.temperature_sensors (
    id,
    organisation_id,
    equipment_id,
    device_id,
    sensor_uid,
    name,
    sensor_type,
    unit,
    location_description,
    status,
    installed_at,
    last_reading_at,
    metadata
)
VALUES (
    '00000000-0000-0000-0000-000000000109',
    '00000000-0000-0000-0000-000000000101',
    '00000000-0000-0000-0000-000000000107',
    '00000000-0000-0000-0000-000000000108',
    'RIQABAH-DEMO-SENSOR-001',
    'Cold Room Temperature Sensor',
    'temperature',
    'celsius',
    'Cold Room 01',
    'active',
    now(),
    now(),
    '{"demo":true}'::jsonb
)
ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- HALAL PROGRAMME
-- ------------------------------------------------------------
INSERT INTO app.halal_programmes (
    id,
    organisation_id,
    premises_id,
    programme_no,
    title,
    version,
    effective_from,
    status,
    scope
)
VALUES (
    '00000000-0000-0000-0000-000000000110',
    '00000000-0000-0000-0000-000000000101',
    '00000000-0000-0000-0000-000000000103',
    'HALAL-DEMO-001',
    'RIQABAH Demonstration Halal Slaughter Programme',
    '1.0',
    CURRENT_DATE,
    'approved',
    '{"species":["BOV"],"demo":true}'::jsonb
)
ON CONFLICT (premises_id, programme_no, version) DO UPDATE
SET
    title = EXCLUDED.title,
    status = EXCLUDED.status,
    updated_at = now();

-- ------------------------------------------------------------
-- HALAL CONTROL POINTS
-- ------------------------------------------------------------
INSERT INTO app.halal_control_points (
    id,
    programme_id,
    code,
    name,
    sequence_no,
    criticality,
    required,
    acceptance_criteria,
    status
)
VALUES
(
    '00000000-0000-0000-0000-000000000111',
    '00000000-0000-0000-0000-000000000110',
    'HC-01',
    'Animal Identification',
    1,
    'control',
    true,
    'Animal identity traceable to batch.',
    'active'
),
(
    '00000000-0000-0000-0000-000000000112',
    '00000000-0000-0000-0000-000000000110',
    'HC-02',
    'Halal Personnel Verification',
    2,
    'control',
    true,
    'Authorised halal personnel assigned.',
    'active'
),
(
    '00000000-0000-0000-0000-000000000113',
    '00000000-0000-0000-0000-000000000110',
    'HC-03',
    'Slaughter Event Control',
    3,
    'control',
    true,
    'Slaughter event recorded with traceable evidence.',
    'active'
),
(
    '00000000-0000-0000-0000-000000000114',
    '00000000-0000-0000-0000-000000000110',
    'HC-04',
    'Post Slaughter Traceability',
    4,
    'control',
    true,
    'Carcass traceable to slaughter event.',
    'active'
)
ON CONFLICT (programme_id, code) DO UPDATE
SET
    name = EXCLUDED.name,
    sequence_no = EXCLUDED.sequence_no,
    status = EXCLUDED.status;

-- ------------------------------------------------------------
-- PRODUCT
-- ------------------------------------------------------------
INSERT INTO app.products (
    id,
    organisation_id,
    sku,
    name,
    product_type,
    species_code,
    unit,
    halal_class,
    status,
    attributes
)
VALUES (
    '00000000-0000-0000-0000-000000000115',
    '00000000-0000-0000-0000-000000000101',
    'BOV-HALAL-CARCASS',
    'Halal Beef Carcass',
    'carcass',
    'BOV',
    'kg',
    'halal',
    'active',
    '{
        "demo":true,
        "traceability":"slaughter_to_meat"
    }'::jsonb
)
ON CONFLICT (organisation_id, sku) DO UPDATE
SET
    name = EXCLUDED.name,
    status = EXCLUDED.status;

-- ------------------------------------------------------------
-- ANIMAL BATCH
-- ------------------------------------------------------------
INSERT INTO app.animal_batches (
    id,
    organisation_id,
    premises_id,
    batch_no,
    species_code,
    supplier_name,
    animal_count,
    received_at,
    status
)
VALUES (
    '00000000-0000-0000-0000-000000000116',
    '00000000-0000-0000-0000-000000000101',
    '00000000-0000-0000-0000-000000000103',
    'BATCH-DEMO-001',
    'BOV',
    'RIQABAH Demo Farm',
    12,
    now() - interval '2 hours',
    'open'
)
ON CONFLICT (organisation_id, batch_no) DO UPDATE
SET
    animal_count = EXCLUDED.animal_count,
    status = EXCLUDED.status;

-- ------------------------------------------------------------
-- ANIMALS
-- ------------------------------------------------------------
INSERT INTO app.animals (
    id,
    organisation_id,
    external_tag,
    species_code,
    sex,
    source_farm,
    status,
    metadata
)
VALUES
(
    '00000000-0000-0000-0000-000000000201',
    '00000000-0000-0000-0000-000000000101',
    'DEMO-BOV-001',
    'BOV',
    'male',
    'RIQABAH Demo Farm',
    'received',
    '{"demo":true,"batch":"BATCH-DEMO-001"}'::jsonb
),
(
    '00000000-0000-0000-0000-000000000202',
    '00000000-0000-0000-0000-000000000101',
    'DEMO-BOV-002',
    'BOV',
    'male',
    'RIQABAH Demo Farm',
    'received',
    '{"demo":true,"batch":"BATCH-DEMO-001"}'::jsonb
),
(
    '00000000-0000-0000-0000-000000000203',
    '00000000-0000-0000-0000-000000000101',
    'DEMO-BOV-003',
    'BOV',
    'female',
    'RIQABAH Demo Farm',
    'received',
    '{"demo":true,"batch":"BATCH-DEMO-001"}'::jsonb
),
(
    '00000000-0000-0000-0000-000000000204',
    '00000000-0000-0000-0000-000000000101',
    'DEMO-BOV-004',
    'BOV',
    'male',
    'RIQABAH Demo Farm',
    'received',
    '{"demo":true,"batch":"BATCH-DEMO-001"}'::jsonb
),
(
    '00000000-0000-0000-0000-000000000205',
    '00000000-0000-0000-0000-000000000101',
    'DEMO-BOV-005',
    'BOV',
    'female',
    'RIQABAH Demo Farm',
    'received',
    '{"demo":true,"batch":"BATCH-DEMO-001"}'::jsonb
),
(
    '00000000-0000-0000-0000-000000000206',
    '00000000-0000-0000-0000-000000000101',
    'DEMO-BOV-006',
    'BOV',
    'male',
    'RIQABAH Demo Farm',
    'received',
    '{"demo":true,"batch":"BATCH-DEMO-001"}'::jsonb
),
(
    '00000000-0000-0000-0000-000000000207',
    '00000000-0000-0000-0000-000000000101',
    'DEMO-BOV-007',
    'BOV',
    'male',
    'RIQABAH Demo Farm',
    'received',
    '{"demo":true,"batch":"BATCH-DEMO-001"}'::jsonb
),
(
    '00000000-0000-0000-0000-000000000208',
    '00000000-0000-0000-0000-000000000101',
    'DEMO-BOV-008',
    'BOV',
    'female',
    'RIQABAH Demo Farm',
    'received',
    '{"demo":true,"batch":"BATCH-DEMO-001"}'::jsonb
)
ON CONFLICT (organisation_id, external_tag) DO UPDATE
SET
    status = EXCLUDED.status,
    metadata = EXCLUDED.metadata,
    updated_at = now();

-- ------------------------------------------------------------
-- ARRIVAL
-- ------------------------------------------------------------
INSERT INTO app.animal_arrivals (
    id,
    organisation_id,
    premises_id,
    batch_id,
    arrival_no,
    arrived_at,
    vehicle_ref,
    transporter,
    origin,
    document_refs,
    condition_status
)
VALUES (
    '00000000-0000-0000-0000-000000000117',
    '00000000-0000-0000-0000-000000000101',
    '00000000-0000-0000-0000-000000000103',
    '00000000-0000-0000-0000-000000000116',
    'ARR-DEMO-001',
    now() - interval '2 hours',
    'DEMO-TRUCK-01',
    'RIQABAH Demo Transport',
    'RIQABAH Demo Farm',
    '["DEMO-CONSIGNMENT-001"]'::jsonb,
    'acceptable'
)
ON CONFLICT (organisation_id, arrival_no) DO NOTHING;

-- ------------------------------------------------------------
-- SLAUGHTER SCHEDULE
-- ------------------------------------------------------------
INSERT INTO app.slaughter_schedules (
    id,
    organisation_id,
    premises_id,
    batch_id,
    scheduled_start,
    scheduled_end,
    line_code,
    planned_count,
    status,
    halal_personnel_id,
    notes
)
VALUES (
    '00000000-0000-0000-0000-000000000118',
    '00000000-0000-0000-0000-000000000101',
    '00000000-0000-0000-0000-000000000103',
    '00000000-0000-0000-0000-000000000116',
    now() - interval '90 minutes',
    now() + interval '30 minutes',
    'SL-01',
    8,
    'in_progress',
    '00000000-0000-0000-0000-000000000105',
    'RIQABAH demonstration slaughter schedule'
)
ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- SLAUGHTER EVENTS
-- ------------------------------------------------------------
INSERT INTO app.slaughter_events (
    id,
    organisation_id,
    premises_id,
    schedule_id,
    batch_id,
    animal_id,
    event_no,
    event_at,
    halal_personnel_id,
    method_code,
    outcome,
    evidence_ids,
    source_device,
    source_event_id
)
SELECT
    v.id,
    '00000000-0000-0000-0000-000000000101',
    '00000000-0000-0000-0000-000000000103',
    '00000000-0000-0000-0000-000000000118',
    '00000000-0000-0000-0000-000000000116',
    v.animal_id,
    v.event_no,
    now() - interval '60 minutes' + (v.seq * interval '5 minutes'),
    '00000000-0000-0000-0000-000000000105',
    'manual_halal',
    'completed',
    '[]'::jsonb,
    'TIAKI-DEMO',
    'DEMO-EVENT-' || v.seq
FROM (
    VALUES
    ('00000000-0000-0000-0000-000000000301'::uuid,'00000000-0000-0000-0000-000000000201'::uuid,'SE-DEMO-001',1),
    ('00000000-0000-0000-0000-000000000302'::uuid,'00000000-0000-0000-0000-000000000202'::uuid,'SE-DEMO-002',2),
    ('00000000-0000-0000-0000-000000000303'::uuid,'00000000-0000-0000-0000-000000000203'::uuid,'SE-DEMO-003',3),
    ('00000000-0000-0000-0000-000000000304'::uuid,'00000000-0000-0000-0000-000000000204'::uuid,'SE-DEMO-004',4),
    ('00000000-0000-0000-0000-000000000305'::uuid,'00000000-0000-0000-0000-000000000205'::uuid,'SE-DEMO-005',5),
    ('00000000-0000-0000-0000-000000000306'::uuid,'00000000-0000-0000-0000-000000000206'::uuid,'SE-DEMO-006',6),
    ('00000000-0000-0000-0000-000000000307'::uuid,'00000000-0000-0000-0000-000000000207'::uuid,'SE-DEMO-007',7),
    ('00000000-0000-0000-0000-000000000308'::uuid,'00000000-0000-0000-0000-000000000208'::uuid,'SE-DEMO-008',8)
) AS v(id, animal_id, event_no, seq)
ON CONFLICT (organisation_id, event_no) DO NOTHING;

-- ------------------------------------------------------------
-- HALAL CONTROL CHECKS
-- ------------------------------------------------------------
INSERT INTO app.halal_control_checks (
    id,
    control_point_id,
    slaughter_event_id,
    checked_at,
    result,
    observed_value,
    checked_by,
    evidence_ids,
    notes
)
SELECT
    v.id,
    v.control_point_id,
    v.slaughter_event_id,
    now() - interval '30 minutes',
    'pass',
    '{"demo":true,"verified":true}'::jsonb,
    '00000000-0000-0000-0000-000000000104',
    '[]'::jsonb,
    'Demonstration control check'
FROM (
    VALUES
    ('00000000-0000-0000-0000-000000000401'::uuid,'00000000-0000-0000-0000-000000000111'::uuid,'00000000-0000-0000-0000-000000000301'::uuid),
    ('00000000-0000-0000-0000-000000000402'::uuid,'00000000-0000-0000-0000-000000000112'::uuid,'00000000-0000-0000-0000-000000000302'::uuid),
    ('00000000-0000-0000-0000-000000000403'::uuid,'00000000-0000-0000-0000-000000000113'::uuid,'00000000-0000-0000-0000-000000000303'::uuid),
    ('00000000-0000-0000-0000-000000000404'::uuid,'00000000-0000-0000-0000-000000000114'::uuid,'00000000-0000-0000-0000-000000000304'::uuid)
) AS v(id, control_point_id, slaughter_event_id)
ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- POST-MORTEM
-- ------------------------------------------------------------
INSERT INTO app.post_mortem_inspections (
    id,
    organisation_id,
    slaughter_event_id,
    animal_id,
    inspected_at,
    inspector_user_id,
    outcome,
    findings,
    disposition,
    evidence_ids
)
VALUES
(
    '00000000-0000-0000-0000-000000000501',
    '00000000-0000-0000-0000-000000000101',
    '00000000-0000-0000-0000-000000000301',
    '00000000-0000-0000-0000-000000000201',
    now() - interval '40 minutes',
    '00000000-0000-0000-0000-000000000104',
    'passed',
    'No abnormal findings in demonstration record.',
    'released',
    '[]'::jsonb
),
(
    '00000000-0000-0000-0000-000000000502',
    '00000000-0000-0000-0000-000000000101',
    '00000000-0000-0000-0000-000000000302',
    '00000000-0000-0000-0000-000000000202',
    now() - interval '35 minutes',
    '00000000-0000-0000-0000-000000000104',
    'passed',
    'No abnormal findings in demonstration record.',
    'released',
    '[]'::jsonb
)
ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- CARCASSES
-- ------------------------------------------------------------
INSERT INTO app.carcasses (
    id,
    organisation_id,
    premises_id,
    animal_id,
    slaughter_event_id,
    carcass_no,
    status,
    weight_kg,
    grade,
    halal_status
)
VALUES
(
    '00000000-0000-0000-0000-000000000601',
    '00000000-0000-0000-0000-000000000101',
    '00000000-0000-0000-0000-000000000103',
    '00000000-0000-0000-0000-000000000201',
    '00000000-0000-0000-0000-000000000301',
    'CAR-DEMO-001',
    'available',
    285.50,
    'A',
    'supported'
),
(
    '00000000-0000-0000-0000-000000000602',
    '00000000-0000-0000-0000-000000000101',
    '00000000-0000-0000-0000-000000000103',
    '00000000-0000-0000-0000-000000000202',
    '00000000-0000-0000-0000-000000000302',
    'CAR-DEMO-002',
    'available',
    276.20,
    'A',
    'supported'
)
ON CONFLICT (organisation_id, carcass_no) DO UPDATE
SET
    weight_kg = EXCLUDED.weight_kg,
    halal_status = EXCLUDED.halal_status,
    status = EXCLUDED.status;

-- ------------------------------------------------------------
-- MEAT BATCH
-- ------------------------------------------------------------
INSERT INTO app.meat_batches (
    id,
    organisation_id,
    premises_id,
    batch_no,
    product_id,
    cutting_run_id,
    quantity,
    unit,
    produced_at,
    status,
    halal_status
)
VALUES (
    '00000000-0000-0000-0000-000000000701',
    '00000000-0000-0000-0000-000000000101',
    '00000000-0000-0000-0000-000000000103',
    'MEAT-DEMO-001',
    '00000000-0000-0000-0000-000000000115',
    NULL,
    561.70,
    'kg',
    now() - interval '20 minutes',
    'available',
    'supported'
)
ON CONFLICT (organisation_id, batch_no) DO UPDATE
SET
    quantity = EXCLUDED.quantity,
    status = EXCLUDED.status,
    halal_status = EXCLUDED.halal_status;

COMMIT;


