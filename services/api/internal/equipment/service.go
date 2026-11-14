package equipment

import (
	"context"
	"errors"
	"strings"
)

type Store interface {
	GetOverview(ctx context.Context, organisationID string) (Overview, error)
	ListEquipment(ctx context.Context, organisationID string) ([]Equipment, error)
	GetEquipment(ctx context.Context, organisationID, equipmentID string) (Equipment, error)
	ListDevices(ctx context.Context, organisationID string) ([]IoTDevice, error)
	ListSensors(ctx context.Context, organisationID string) ([]Sensor, error)
	ListReadings(ctx context.Context, organisationID, sensorID string, limit int) ([]Reading, error)
	ListExcursions(ctx context.Context, organisationID string) ([]Excursion, error)
	ListThresholds(ctx context.Context, organisationID string) ([]Threshold, error)
	ListCalibrations(ctx context.Context, organisationID string) ([]Calibration, error)
}

type Service struct {
	Store Store
}

func (s Service) validateOrganisation(organisationID string) (string, error) {
	organisationID = strings.TrimSpace(organisationID)
	if organisationID == "" {
		return "", errors.New("organisation id is required")
	}
	if s.Store == nil {
		return "", errors.New("equipment store is not configured")
	}
	return organisationID, nil
}

func (s Service) GetOverview(ctx context.Context, organisationID string) (OverviewResponse, error) {
	organisationID, err := s.validateOrganisation(organisationID)
	if err != nil {
		return OverviewResponse{}, err
	}

	data, err := s.Store.GetOverview(ctx, organisationID)
	if err != nil {
		return OverviewResponse{}, err
	}

	return OverviewResponse{
		Data: data,
		Meta: Meta{Status: "ok"},
	}, nil
}

func (s Service) ListEquipment(ctx context.Context, organisationID string) (ListResponse[Equipment], error) {
	organisationID, err := s.validateOrganisation(organisationID)
	if err != nil {
		return ListResponse[Equipment]{}, err
	}

	items, err := s.Store.ListEquipment(ctx, organisationID)
	if err != nil {
		return ListResponse[Equipment]{}, err
	}

	return ListResponse[Equipment]{
		Data: items,
		Meta: Meta{Status: "ok", Count: len(items)},
	}, nil
}

func (s Service) GetEquipment(ctx context.Context, organisationID, equipmentID string) (Equipment, error) {
	organisationID, err := s.validateOrganisation(organisationID)
	if err != nil {
		return Equipment{}, err
	}

	equipmentID = strings.TrimSpace(equipmentID)
	if equipmentID == "" {
		return Equipment{}, errors.New("equipment id is required")
	}

	return s.Store.GetEquipment(ctx, organisationID, equipmentID)
}

func (s Service) ListDevices(ctx context.Context, organisationID string) (ListResponse[IoTDevice], error) {
	organisationID, err := s.validateOrganisation(organisationID)
	if err != nil {
		return ListResponse[IoTDevice]{}, err
	}

	items, err := s.Store.ListDevices(ctx, organisationID)
	if err != nil {
		return ListResponse[IoTDevice]{}, err
	}

	return ListResponse[IoTDevice]{
		Data: items,
		Meta: Meta{Status: "ok", Count: len(items)},
	}, nil
}

func (s Service) ListSensors(ctx context.Context, organisationID string) (ListResponse[Sensor], error) {
	organisationID, err := s.validateOrganisation(organisationID)
	if err != nil {
		return ListResponse[Sensor]{}, err
	}

	items, err := s.Store.ListSensors(ctx, organisationID)
	if err != nil {
		return ListResponse[Sensor]{}, err
	}

	return ListResponse[Sensor]{
		Data: items,
		Meta: Meta{Status: "ok", Count: len(items)},
	}, nil
}

func (s Service) ListReadings(
	ctx context.Context,
	organisationID string,
	sensorID string,
	limit int,
) (ReadingsResponse, error) {
	organisationID, err := s.validateOrganisation(organisationID)
	if err != nil {
		return ReadingsResponse{}, err
	}

	sensorID = strings.TrimSpace(sensorID)
	if sensorID == "" {
		return ReadingsResponse{}, errors.New("sensor id is required")
	}

	if limit <= 0 {
		limit = 100
	}
	if limit > 500 {
		limit = 500
	}

	items, err := s.Store.ListReadings(ctx, organisationID, sensorID, limit)
	if err != nil {
		return ReadingsResponse{}, err
	}

	return ReadingsResponse{
		SensorID: sensorID,
		Items:    items,
	}, nil
}

func (s Service) ListExcursions(ctx context.Context, organisationID string) (ListResponse[Excursion], error) {
	organisationID, err := s.validateOrganisation(organisationID)
	if err != nil {
		return ListResponse[Excursion]{}, err
	}

	items, err := s.Store.ListExcursions(ctx, organisationID)
	if err != nil {
		return ListResponse[Excursion]{}, err
	}

	return ListResponse[Excursion]{
		Data: items,
		Meta: Meta{Status: "ok", Count: len(items)},
	}, nil
}

func (s Service) ListThresholds(ctx context.Context, organisationID string) (ListResponse[Threshold], error) {
	organisationID, err := s.validateOrganisation(organisationID)
	if err != nil {
		return ListResponse[Threshold]{}, err
	}

	items, err := s.Store.ListThresholds(ctx, organisationID)
	if err != nil {
		return ListResponse[Threshold]{}, err
	}

	return ListResponse[Threshold]{
		Data: items,
		Meta: Meta{Status: "ok", Count: len(items)},
	}, nil
}

func (s Service) ListCalibrations(ctx context.Context, organisationID string) (ListResponse[Calibration], error) {
	organisationID, err := s.validateOrganisation(organisationID)
	if err != nil {
		return ListResponse[Calibration]{}, err
	}

	items, err := s.Store.ListCalibrations(ctx, organisationID)
	if err != nil {
		return ListResponse[Calibration]{}, err
	}

	return ListResponse[Calibration]{
		Data: items,
		Meta: Meta{Status: "ok", Count: len(items)},
	}, nil
}
