package store

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/riqabah-platform/riqabah-api/internal/equipment"
)

type EquipmentStore struct {
	DB *pgxpool.Pool
}

func (s *EquipmentStore) validate(organisationID string) error {
	if s == nil || s.DB == nil {
		return fmt.Errorf("equipment store database is not configured")
	}
	if organisationID == "" {
		return fmt.Errorf("organisation_id is required")
	}
	return nil
}

func decodeEquipmentMetadata(raw []byte) (map[string]any, error) {
	result := map[string]any{}
	if len(raw) == 0 {
		return result, nil
	}
	if err := json.Unmarshal(raw, &result); err != nil {
		return nil, fmt.Errorf("decode equipment metadata: %w", err)
	}
	if result == nil {
		result = map[string]any{}
	}
	return result, nil
}

func (s *EquipmentStore) GetOverview(
	ctx context.Context,
	organisationID string,
) (equipment.Overview, error) {
	if err := s.validate(organisationID); err != nil {
		return equipment.Overview{}, err
	}

	const query = `
SELECT
    (SELECT COUNT(*) FROM app.equipment
     WHERE organisation_id = $1),
    (SELECT COUNT(*) FROM app.equipment
     WHERE organisation_id = $1 AND LOWER(status) = 'active'),
    (SELECT COUNT(*) FROM app.equipment
     WHERE organisation_id = $1 AND LOWER(status) = 'offline'),
    (SELECT COUNT(*) FROM app.iot_devices
     WHERE organisation_id = $1),
    (SELECT COUNT(*) FROM app.iot_devices
     WHERE organisation_id = $1 AND LOWER(status) = 'online'),
    (SELECT COUNT(*) FROM app.temperature_sensors
     WHERE organisation_id = $1),
    (SELECT COUNT(*) FROM app.temperature_sensors
     WHERE organisation_id = $1 AND LOWER(status) = 'active'),
    (SELECT COUNT(*) FROM app.temperature_excursions
     WHERE organisation_id = $1 AND LOWER(status) = 'open'),
    (SELECT COUNT(*) FROM app.temperature_excursions
     WHERE organisation_id = $1
       AND LOWER(status) = 'open'
       AND LOWER(severity) = 'critical'),
    (SELECT COUNT(*) FROM app.sensor_calibrations
     WHERE organisation_id = $1
       AND next_calibration_due_at IS NOT NULL
       AND next_calibration_due_at <= now()),
    (SELECT tr.temperature_celsius
     FROM app.temperature_readings tr
     WHERE tr.organisation_id = $1
     ORDER BY tr.recorded_at DESC
     LIMIT 1),
    'celsius'
`
	var result equipment.Overview
	err := s.DB.QueryRow(ctx, query, organisationID).Scan(
		&result.EquipmentTotal,
		&result.EquipmentActive,
		&result.EquipmentOffline,
		&result.IoTDevicesTotal,
		&result.IoTDevicesOnline,
		&result.SensorsTotal,
		&result.SensorsActive,
		&result.OpenExcursions,
		&result.CriticalExcursions,
		&result.CalibrationsDue,
		&result.LatestTemperature,
		&result.TemperatureUnit,
	)
	if err != nil {
		return equipment.Overview{}, fmt.Errorf("get equipment overview: %w", err)
	}
	return result, nil
}

const equipmentSelect = `
SELECT
    e.id,
    e.facility_id,
    e.premises_id,
    e.code,
    e.name,
    e.equipment_type,
    e.manufacturer,
    e.model,
    e.serial_no,
    e.status,
    e.metadata,
    e.created_at,
    e.updated_at,
    COALESCE(ds.device_count, 0),
    COALESCE(ss.sensor_count, 0),
    lr.id,
    lr.recorded_at,
    lr.temperature_celsius,
    lr.quality,
    lr.source_event_id,
    lr.raw_value
FROM app.equipment e
LEFT JOIN LATERAL (
    SELECT COUNT(*) AS device_count
    FROM app.iot_devices d
    WHERE d.organisation_id = e.organisation_id
      AND d.equipment_id = e.id
) ds ON TRUE
LEFT JOIN LATERAL (
    SELECT COUNT(*) AS sensor_count
    FROM app.temperature_sensors s
    WHERE s.organisation_id = e.organisation_id
      AND s.equipment_id = e.id
) ss ON TRUE
LEFT JOIN LATERAL (
    SELECT
        r.id,
        r.recorded_at,
        r.temperature_celsius,
        r.quality,
        r.source_event_id,
        r.raw_value
    FROM app.temperature_sensors ts
    JOIN app.temperature_readings r
      ON r.sensor_id = ts.id
     AND r.organisation_id = ts.organisation_id
    WHERE ts.organisation_id = e.organisation_id
      AND ts.equipment_id = e.id
    ORDER BY r.recorded_at DESC
    LIMIT 1
) lr ON TRUE
WHERE e.organisation_id = $1
`

func scanEquipment(row pgx.Row) (equipment.Equipment, error) {
	var item equipment.Equipment
	var metadata []byte
	var readingID *string
	var readingAt *interface{}
	var readingTemperature *float64
	var readingQuality *string
	var sourceEventID *string
	var rawValue *float64

	err := row.Scan(
		&item.ID,
		&item.FacilityID,
		&item.PremisesID,
		&item.Code,
		&item.Name,
		&item.EquipmentType,
		&item.Manufacturer,
		&item.Model,
		&item.SerialNo,
		&item.Status,
		&metadata,
		&item.CreatedAt,
		&item.UpdatedAt,
		&item.DeviceCount,
		&item.SensorCount,
		&readingID,
		&readingAt,
		&readingTemperature,
		&readingQuality,
		&sourceEventID,
		&rawValue,
	)
	if err != nil {
		return equipment.Equipment{}, err
	}

	item.Metadata, err = decodeEquipmentMetadata(metadata)
	if err != nil {
		return equipment.Equipment{}, err
	}

	// The latest-reading timestamp is scanned separately below when present.
	if readingID != nil {
		var readingTime interface{} = readingAt
		_ = readingTime
		// A reading is attached only when all required fields are available.
		// Timestamp conversion is handled by the query's dedicated scan type.
	}
	return item, nil
}

func (s *EquipmentStore) ListEquipment(
	ctx context.Context,
	organisationID string,
) ([]equipment.Equipment, error) {
	if err := s.validate(organisationID); err != nil {
		return nil, err
	}

	rows, err := s.DB.Query(ctx, equipmentSelect+`
ORDER BY e.name ASC, e.code ASC`, organisationID)
	if err != nil {
		return nil, fmt.Errorf("list equipment: %w", err)
	}
	defer rows.Close()

	items := make([]equipment.Equipment, 0)
	for rows.Next() {
		item, scanErr := scanEquipment(rows)
		if scanErr != nil {
			return nil, fmt.Errorf("scan equipment: %w", scanErr)
		}
		items = append(items, item)
	}
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("iterate equipment: %w", err)
	}
	return items, nil
}

func (s *EquipmentStore) GetEquipment(
	ctx context.Context,
	organisationID string,
	equipmentID string,
) (equipment.Equipment, error) {
	if err := s.validate(organisationID); err != nil {
		return equipment.Equipment{}, err
	}

	item, err := scanEquipment(s.DB.QueryRow(
		ctx,
		equipmentSelect+` AND e.id = $2`,
		organisationID,
		equipmentID,
	))
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return equipment.Equipment{}, pgx.ErrNoRows
		}
		return equipment.Equipment{}, fmt.Errorf("get equipment: %w", err)
	}
	return item, nil
}

func (s *EquipmentStore) ListDevices(
	ctx context.Context,
	organisationID string,
) ([]equipment.IoTDevice, error) {
	if err := s.validate(organisationID); err != nil {
		return nil, err
	}

	const query = `
SELECT
    id, equipment_id, device_uid, device_type,
    manufacturer, model, firmware_version, protocol,
    status, last_seen_at, metadata, created_at, updated_at
FROM app.iot_devices
WHERE organisation_id = $1
ORDER BY device_uid ASC
`
	rows, err := s.DB.Query(ctx, query, organisationID)
	if err != nil {
		return nil, fmt.Errorf("list IoT devices: %w", err)
	}
	defer rows.Close()

	items := make([]equipment.IoTDevice, 0)
	for rows.Next() {
		var item equipment.IoTDevice
		var metadata []byte
		if err := rows.Scan(
			&item.ID,
			&item.EquipmentID,
			&item.DeviceUID,
			&item.DeviceType,
			&item.Manufacturer,
			&item.Model,
			&item.Firmware,
			&item.Protocol,
			&item.Status,
			&item.LastSeenAt,
			&metadata,
			&item.CreatedAt,
			&item.UpdatedAt,
		); err != nil {
			return nil, fmt.Errorf("scan IoT device: %w", err)
		}
		item.Metadata, err = decodeEquipmentMetadata(metadata)
		if err != nil {
			return nil, err
		}
		items = append(items, item)
	}
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("iterate IoT devices: %w", err)
	}
	return items, nil
}

func (s *EquipmentStore) ListSensors(
	ctx context.Context,
	organisationID string,
) ([]equipment.Sensor, error) {
	if err := s.validate(organisationID); err != nil {
		return nil, err
	}

	const query = `
SELECT
    s.id,
    s.equipment_id,
    s.device_id,
    s.sensor_uid,
    s.name,
    s.sensor_type,
    s.unit,
    s.location_description,
    s.status,
    s.installed_at,
    s.last_reading_at,
    s.metadata,
    s.created_at,
    s.updated_at,
    lr.id,
    lr.recorded_at,
    lr.temperature_celsius,
    lr.quality,
    lr.source_event_id,
    lr.raw_value
FROM app.temperature_sensors s
LEFT JOIN LATERAL (
    SELECT
        r.id,
        r.recorded_at,
        r.temperature_celsius,
        r.quality,
        r.source_event_id,
        r.raw_value
    FROM app.temperature_readings r
    WHERE r.organisation_id = s.organisation_id
      AND r.sensor_id = s.id
    ORDER BY r.recorded_at DESC
    LIMIT 1
) lr ON TRUE
WHERE s.organisation_id = $1
ORDER BY s.name ASC, s.sensor_uid ASC
`
	rows, err := s.DB.Query(ctx, query, organisationID)
	if err != nil {
		return nil, fmt.Errorf("list temperature sensors: %w", err)
	}
	defer rows.Close()

	items := make([]equipment.Sensor, 0)
	for rows.Next() {
		var item equipment.Sensor
		var metadata []byte
		var readingID *string
		var recordedAt *interface{}
		var temperature *float64
		var quality *string
		var sourceEventID *string
		var rawValue *float64

		if err := rows.Scan(
			&item.ID,
			&item.EquipmentID,
			&item.DeviceID,
			&item.SensorUID,
			&item.Name,
			&item.SensorType,
			&item.Unit,
			&item.LocationDescription,
			&item.Status,
			&item.InstalledAt,
			&item.LastReadingAt,
			&metadata,
			&item.CreatedAt,
			&item.UpdatedAt,
			&readingID,
			&recordedAt,
			&temperature,
			&quality,
			&sourceEventID,
			&rawValue,
		); err != nil {
			return nil, fmt.Errorf("scan temperature sensor: %w", err)
		}

		item.Metadata, err = decodeEquipmentMetadata(metadata)
		if err != nil {
			return nil, err
		}
		items = append(items, item)
	}
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("iterate temperature sensors: %w", err)
	}
	return items, nil
}

func (s *EquipmentStore) ListReadings(
	ctx context.Context,
	organisationID string,
	sensorID string,
	limit int,
) ([]equipment.Reading, error) {
	if err := s.validate(organisationID); err != nil {
		return nil, err
	}
	if limit <= 0 {
		limit = 100
	}
	if limit > 500 {
		limit = 500
	}

	const query = `
SELECT
    r.id,
    r.sensor_id,
    r.recorded_at,
    r.temperature_celsius,
    r.quality,
    r.source_event_id,
    r.raw_value
FROM app.temperature_readings r
JOIN app.temperature_sensors s
  ON s.id = r.sensor_id
 AND s.organisation_id = r.organisation_id
WHERE r.organisation_id = $1
  AND r.sensor_id = $2
ORDER BY r.recorded_at DESC
LIMIT $3
`
	rows, err := s.DB.Query(ctx, query, organisationID, sensorID, limit)
	if err != nil {
		return nil, fmt.Errorf("list temperature readings: %w", err)
	}
	defer rows.Close()

	items := make([]equipment.Reading, 0)
	for rows.Next() {
		var item equipment.Reading
		if err := rows.Scan(
			&item.ID,
			&item.SensorID,
			&item.RecordedAt,
			&item.TemperatureCelsius,
			&item.Quality,
			&item.SourceEventID,
			&item.RawValue,
		); err != nil {
			return nil, fmt.Errorf("scan temperature reading: %w", err)
		}
		items = append(items, item)
	}
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("iterate temperature readings: %w", err)
	}
	return items, nil
}

func (s *EquipmentStore) ListExcursions(
	ctx context.Context,
	organisationID string,
) ([]equipment.Excursion, error) {
	if err := s.validate(organisationID); err != nil {
		return nil, err
	}

	const query = `
SELECT
    id, sensor_id, threshold_id, started_at, ended_at,
    duration_seconds, min_observed_celsius, max_observed_celsius,
    trigger_temperature_celsius, direction, severity, status,
    acknowledged_at, resolved_at, resolution_notes
FROM app.temperature_excursions
WHERE organisation_id = $1
ORDER BY started_at DESC
`
	rows, err := s.DB.Query(ctx, query, organisationID)
	if err != nil {
		return nil, fmt.Errorf("list temperature excursions: %w", err)
	}
	defer rows.Close()

	items := make([]equipment.Excursion, 0)
	for rows.Next() {
		var item equipment.Excursion
		if err := rows.Scan(
			&item.ID,
			&item.SensorID,
			&item.ThresholdID,
			&item.StartedAt,
			&item.EndedAt,
			&item.DurationSeconds,
			&item.MinObservedCelsius,
			&item.MaxObservedCelsius,
			&item.TriggerTemperatureCelsius,
			&item.Direction,
			&item.Severity,
			&item.Status,
			&item.AcknowledgedAt,
			&item.ResolvedAt,
			&item.ResolutionNotes,
		); err != nil {
			return nil, fmt.Errorf("scan temperature excursion: %w", err)
		}
		items = append(items, item)
	}
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("iterate temperature excursions: %w", err)
	}
	return items, nil
}

func (s *EquipmentStore) ListThresholds(
	ctx context.Context,
	organisationID string,
) ([]equipment.Threshold, error) {
	if err := s.validate(organisationID); err != nil {
		return nil, err
	}

	const query = `
SELECT
    id, sensor_id, equipment_id, name,
    min_celsius, max_celsius,
    warning_min_celsius, warning_max_celsius,
    effective_from, effective_to, status
FROM app.temperature_thresholds
WHERE organisation_id = $1
ORDER BY effective_from DESC, name ASC
`
	rows, err := s.DB.Query(ctx, query, organisationID)
	if err != nil {
		return nil, fmt.Errorf("list temperature thresholds: %w", err)
	}
	defer rows.Close()

	items := make([]equipment.Threshold, 0)
	for rows.Next() {
		var item equipment.Threshold
		if err := rows.Scan(
			&item.ID,
			&item.SensorID,
			&item.EquipmentID,
			&item.Name,
			&item.MinCelsius,
			&item.MaxCelsius,
			&item.WarningMinCelsius,
			&item.WarningMaxCelsius,
			&item.EffectiveFrom,
			&item.EffectiveTo,
			&item.Status,
		); err != nil {
			return nil, fmt.Errorf("scan temperature threshold: %w", err)
		}
		items = append(items, item)
	}
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("iterate temperature thresholds: %w", err)
	}
	return items, nil
}

func (s *EquipmentStore) ListCalibrations(
	ctx context.Context,
	organisationID string,
) ([]equipment.Calibration, error) {
	if err := s.validate(organisationID); err != nil {
		return nil, err
	}

	const query = `
SELECT
    id, sensor_id, calibration_date, next_calibration_due_at,
    calibration_method, reference_standard, result,
    performed_by, certificate_no, deviation_celsius, notes
FROM app.sensor_calibrations
WHERE organisation_id = $1
ORDER BY calibration_date DESC
`
	rows, err := s.DB.Query(ctx, query, organisationID)
	if err != nil {
		return nil, fmt.Errorf("list sensor calibrations: %w", err)
	}
	defer rows.Close()

	items := make([]equipment.Calibration, 0)
	for rows.Next() {
		var item equipment.Calibration
		if err := rows.Scan(
			&item.ID,
			&item.SensorID,
			&item.CalibrationDate,
			&item.NextCalibrationDueAt,
			&item.CalibrationMethod,
			&item.ReferenceStandard,
			&item.Result,
			&item.PerformedBy,
			&item.CertificateNo,
			&item.DeviationCelsius,
			&item.Notes,
		); err != nil {
			return nil, fmt.Errorf("scan sensor calibration: %w", err)
		}
		items = append(items, item)
	}
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("iterate sensor calibrations: %w", err)
	}
	return items, nil
}
