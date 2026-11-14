BEGIN;

-- ============================================================
-- RIQABAH EQUIPMENT & TEMPERATURE MONITORING
-- Migration: 048
--
-- Purpose:
--   Establish equipment, IoT and temperature monitoring
--   infrastructure for RIQABAH Commander.
--
-- Design:
--   Organisation -> Facility -> Premises -> Equipment
--   -> IoT Device -> Temperature Sensor -> Readings
--
-- NZ defaults:
--   Temperature unit: Celsius
--   Timezone: Asia/Riyadh
--
-- Safety:
--   - No DROP
--   - No DELETE
--   - No UPDATE of existing application data
--   - Idempotent object creation
--   - Temperature limits are configurable
-- ============================================================

CREATE TABLE IF NOT EXISTS app.equipment (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organisation_id uuid NOT NULL,
    facility_id uuid NOT NULL,
    premises_id uuid,
    code text NOT NULL,
    name text NOT NULL,
    equipment_type text NOT NULL,
    manufacturer text,
    model text,
    serial_no text,
    status text NOT NULL DEFAULT 'active',
    metadata jsonb NOT NULL DEFAULT '{}',

    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),

    CONSTRAINT fk_equipment_organisation
        FOREIGN KEY (organisation_id)
        REFERENCES app.organisations(id),

    CONSTRAINT fk_equipment_facility
        FOREIGN KEY (facility_id)
        REFERENCES app.facilities(id),

    CONSTRAINT fk_equipment_premises
        FOREIGN KEY (premises_id)
        REFERENCES app.premises(id),

    CONSTRAINT uq_equipment_org_code
        UNIQUE (organisation_id, code)
);

CREATE INDEX IF NOT EXISTS idx_equipment_organisation
    ON app.equipment(organisation_id);

CREATE INDEX IF NOT EXISTS idx_equipment_facility
    ON app.equipment(facility_id);

CREATE INDEX IF NOT EXISTS idx_equipment_premises
    ON app.equipment(premises_id);

CREATE INDEX IF NOT EXISTS idx_equipment_status
    ON app.equipment(status);


CREATE TABLE IF NOT EXISTS app.iot_devices (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organisation_id uuid NOT NULL,
    equipment_id uuid,
    device_uid text NOT NULL,
    device_type text NOT NULL,
    manufacturer text,
    model text,
    firmware_version text,
    protocol text,
    status text NOT NULL DEFAULT 'offline',
    last_seen_at timestamptz,
    metadata jsonb NOT NULL DEFAULT '{}',

    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),

    CONSTRAINT fk_iot_devices_organisation
        FOREIGN KEY (organisation_id)
        REFERENCES app.organisations(id),

    CONSTRAINT fk_iot_devices_equipment
        FOREIGN KEY (equipment_id)
        REFERENCES app.equipment(id)
        ON DELETE SET NULL,

    CONSTRAINT uq_iot_devices_org_uid
        UNIQUE (organisation_id, device_uid)
);

CREATE INDEX IF NOT EXISTS idx_iot_devices_organisation
    ON app.iot_devices(organisation_id);

CREATE INDEX IF NOT EXISTS idx_iot_devices_equipment
    ON app.iot_devices(equipment_id);

CREATE INDEX IF NOT EXISTS idx_iot_devices_status
    ON app.iot_devices(status);

CREATE INDEX IF NOT EXISTS idx_iot_devices_last_seen
    ON app.iot_devices(last_seen_at DESC);


CREATE TABLE IF NOT EXISTS app.temperature_sensors (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organisation_id uuid NOT NULL,
    equipment_id uuid,
    device_id uuid,
    sensor_uid text NOT NULL,
    name text NOT NULL,
    sensor_type text NOT NULL DEFAULT 'temperature',
    unit text NOT NULL DEFAULT 'celsius',
    location_description text,
    status text NOT NULL DEFAULT 'active',
    installed_at timestamptz,
    last_reading_at timestamptz,
    metadata jsonb NOT NULL DEFAULT '{}',

    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),

    CONSTRAINT fk_temperature_sensors_organisation
        FOREIGN KEY (organisation_id)
        REFERENCES app.organisations(id),

    CONSTRAINT fk_temperature_sensors_equipment
        FOREIGN KEY (equipment_id)
        REFERENCES app.equipment(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_temperature_sensors_device
        FOREIGN KEY (device_id)
        REFERENCES app.iot_devices(id)
        ON DELETE SET NULL,

    CONSTRAINT uq_temperature_sensors_org_uid
        UNIQUE (organisation_id, sensor_uid)
);

CREATE INDEX IF NOT EXISTS idx_temperature_sensors_organisation
    ON app.temperature_sensors(organisation_id);

CREATE INDEX IF NOT EXISTS idx_temperature_sensors_equipment
    ON app.temperature_sensors(equipment_id);

CREATE INDEX IF NOT EXISTS idx_temperature_sensors_device
    ON app.temperature_sensors(device_id);

CREATE INDEX IF NOT EXISTS idx_temperature_sensors_status
    ON app.temperature_sensors(status);

CREATE INDEX IF NOT EXISTS idx_temperature_sensors_last_reading
    ON app.temperature_sensors(last_reading_at DESC);


CREATE TABLE IF NOT EXISTS app.temperature_readings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organisation_id uuid NOT NULL,
    sensor_id uuid NOT NULL,
    recorded_at timestamptz NOT NULL,
    temperature_celsius numeric(10,4) NOT NULL,
    quality text NOT NULL DEFAULT 'valid',
    source_event_id text,
    raw_value numeric(14,6),
    metadata jsonb NOT NULL DEFAULT '{}',
    created_at timestamptz NOT NULL DEFAULT now(),

    CONSTRAINT fk_temperature_readings_organisation
        FOREIGN KEY (organisation_id)
        REFERENCES app.organisations(id),

    CONSTRAINT fk_temperature_readings_sensor
        FOREIGN KEY (sensor_id)
        REFERENCES app.temperature_sensors(id)
        ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_temperature_readings_sensor_time
    ON app.temperature_readings(sensor_id, recorded_at DESC);

CREATE INDEX IF NOT EXISTS idx_temperature_readings_organisation_time
    ON app.temperature_readings(organisation_id, recorded_at DESC);

CREATE INDEX IF NOT EXISTS idx_temperature_readings_recorded_at
    ON app.temperature_readings(recorded_at DESC);


CREATE TABLE IF NOT EXISTS app.temperature_thresholds (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organisation_id uuid NOT NULL,
    sensor_id uuid,
    equipment_id uuid,
    name text NOT NULL,
    min_celsius numeric(10,4),
    max_celsius numeric(10,4),
    warning_min_celsius numeric(10,4),
    warning_max_celsius numeric(10,4),
    effective_from timestamptz NOT NULL DEFAULT now(),
    effective_to timestamptz,
    status text NOT NULL DEFAULT 'active',
    configuration jsonb NOT NULL DEFAULT '{}',

    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),

    CONSTRAINT fk_temperature_thresholds_organisation
        FOREIGN KEY (organisation_id)
        REFERENCES app.organisations(id),

    CONSTRAINT fk_temperature_thresholds_sensor
        FOREIGN KEY (sensor_id)
        REFERENCES app.temperature_sensors(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_temperature_thresholds_equipment
        FOREIGN KEY (equipment_id)
        REFERENCES app.equipment(id)
        ON DELETE CASCADE,

    CONSTRAINT chk_temperature_threshold_range
        CHECK (
            min_celsius IS NULL
            OR max_celsius IS NULL
            OR min_celsius <= max_celsius
        ),

    CONSTRAINT chk_temperature_warning_range
        CHECK (
            warning_min_celsius IS NULL
            OR warning_max_celsius IS NULL
            OR warning_min_celsius <= warning_max_celsius
        )
);

CREATE INDEX IF NOT EXISTS idx_temperature_thresholds_sensor
    ON app.temperature_thresholds(sensor_id);

CREATE INDEX IF NOT EXISTS idx_temperature_thresholds_equipment
    ON app.temperature_thresholds(equipment_id);

CREATE INDEX IF NOT EXISTS idx_temperature_thresholds_effective
    ON app.temperature_thresholds(effective_from, effective_to);

CREATE INDEX IF NOT EXISTS idx_temperature_thresholds_status
    ON app.temperature_thresholds(status);


CREATE TABLE IF NOT EXISTS app.temperature_excursions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organisation_id uuid NOT NULL,
    sensor_id uuid NOT NULL,
    threshold_id uuid,
    started_at timestamptz NOT NULL,
    ended_at timestamptz,
    duration_seconds bigint,
    min_observed_celsius numeric(10,4),
    max_observed_celsius numeric(10,4),
    trigger_temperature_celsius numeric(10,4),
    direction text,
    severity text NOT NULL DEFAULT 'warning',
    status text NOT NULL DEFAULT 'open',
    acknowledged_at timestamptz,
    acknowledged_by uuid,
    resolved_at timestamptz,
    resolved_by uuid,
    resolution_notes text,
    evidence_ids jsonb NOT NULL DEFAULT '[]',
    metadata jsonb NOT NULL DEFAULT '{}',

    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),

    CONSTRAINT fk_temperature_excursions_organisation
        FOREIGN KEY (organisation_id)
        REFERENCES app.organisations(id),

    CONSTRAINT fk_temperature_excursions_sensor
        FOREIGN KEY (sensor_id)
        REFERENCES app.temperature_sensors(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_temperature_excursions_threshold
        FOREIGN KEY (threshold_id)
        REFERENCES app.temperature_thresholds(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_temperature_excursions_acknowledged_by
        FOREIGN KEY (acknowledged_by)
        REFERENCES app.users(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_temperature_excursions_resolved_by
        FOREIGN KEY (resolved_by)
        REFERENCES app.users(id)
        ON DELETE SET NULL,

    CONSTRAINT chk_temperature_excursions_time
        CHECK (
            ended_at IS NULL
            OR ended_at >= started_at
        )
);

CREATE INDEX IF NOT EXISTS idx_temperature_excursions_organisation
    ON app.temperature_excursions(organisation_id);

CREATE INDEX IF NOT EXISTS idx_temperature_excursions_sensor_time
    ON app.temperature_excursions(sensor_id, started_at DESC);

CREATE INDEX IF NOT EXISTS idx_temperature_excursions_status
    ON app.temperature_excursions(status);

CREATE INDEX IF NOT EXISTS idx_temperature_excursions_severity
    ON app.temperature_excursions(severity);

CREATE INDEX IF NOT EXISTS idx_temperature_excursions_started_at
    ON app.temperature_excursions(started_at DESC);


CREATE TABLE IF NOT EXISTS app.sensor_calibrations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organisation_id uuid NOT NULL,
    sensor_id uuid NOT NULL,
    calibration_date timestamptz NOT NULL,
    next_calibration_due_at timestamptz,
    calibration_method text,
    reference_standard text,
    result text NOT NULL DEFAULT 'passed',
    performed_by uuid,
    certificate_no text,
    deviation_celsius numeric(10,4),
    evidence_ids jsonb NOT NULL DEFAULT '[]',
    notes text,
    metadata jsonb NOT NULL DEFAULT '{}',

    created_at timestamptz NOT NULL DEFAULT now(),

    CONSTRAINT fk_sensor_calibrations_organisation
        FOREIGN KEY (organisation_id)
        REFERENCES app.organisations(id),

    CONSTRAINT fk_sensor_calibrations_sensor
        FOREIGN KEY (sensor_id)
        REFERENCES app.temperature_sensors(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_sensor_calibrations_performed_by
        FOREIGN KEY (performed_by)
        REFERENCES app.users(id)
        ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_sensor_calibrations_organisation
    ON app.sensor_calibrations(organisation_id);

CREATE INDEX IF NOT EXISTS idx_sensor_calibrations_sensor
    ON app.sensor_calibrations(sensor_id);

CREATE INDEX IF NOT EXISTS idx_sensor_calibrations_due
    ON app.sensor_calibrations(next_calibration_due_at);

COMMIT;
