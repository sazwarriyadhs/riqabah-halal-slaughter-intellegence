INSERT INTO app.roles(code,name,description) VALUES
('owner','Owner','Platform or organisation owner'),('admin','Administrator','Organisation administrator'),('manager','Operations Manager','Operational management'),('halal_officer','Halal Officer','Halal operational control'),('auditor','Auditor','Audit and assurance access'),('operator','Operator','Operational execution'),('viewer','Viewer','Read-only access') ON CONFLICT(code) DO NOTHING;
INSERT INTO app.training_courses(code,name,provider,validity_months) VALUES
('HALAL-BASICS','Halal Slaughter Fundamentals','TIAKI reference',24),('HALAL-EVIDENCE','Halal Evidence & Traceability','TIAKI reference',24),('FOOD-SAFETY','Food Safety Operational Training','TIAKI reference',24) ON CONFLICT(code) DO NOTHING;
INSERT INTO app.compliance_frameworks(code,name,jurisdiction,version) VALUES
('NZ-MPI-HALAL','NZ halal export assurance reference','NZ','reference'),('NZ-ANIMAL-PRODUCTS','NZ animal products operational reference','NZ','reference') ON CONFLICT(code) DO NOTHING;
INSERT INTO ref.species(code,name) VALUES ('BOV','Bovine'),('OVN','Ovine'),('CAP','Caprine'),('CER','Cervine'),('POU','Poultry') ON CONFLICT(code) DO NOTHING;
INSERT INTO ref.countries(code,name) VALUES ('NZ','New Zealand'),('ID','Indonesia'),('AU','Australia'),('MY','Malaysia'),('SG','Singapore') ON CONFLICT(code) DO NOTHING;
INSERT INTO ref.currencies(code,name) VALUES ('NZD','New Zealand Dollar'),('AUD','Australian Dollar'),('USD','United States Dollar'),('IDR','Indonesian Rupiah') ON CONFLICT(code) DO NOTHING;
INSERT INTO ref.timezones(code,name) VALUES ('Pacific/Auckland','Pacific/Auckland'),('Pacific/Chatham','Pacific/Chatham'),('UTC','UTC') ON CONFLICT(code) DO NOTHING;
INSERT INTO ref.facility_types(code,name) VALUES ('processing','Processing Plant'),('slaughterhouse','Slaughterhouse'),('cold_store','Cold Store'),('export','Export Facility') ON CONFLICT(code) DO NOTHING;
INSERT INTO ref.evidence_types(code,name) VALUES ('photo','Photo'),('video','Video'),('document','Document'),('sensor','Sensor Data'),('signature','Signature'),('system_event','System Event') ON CONFLICT(code) DO NOTHING;
INSERT INTO ref.risk_levels(code,name) VALUES ('low','Low'),('medium','Medium'),('high','High'),('critical','Critical') ON CONFLICT(code) DO NOTHING;
INSERT INTO ref.market_codes(code,name,country_code) VALUES ('NZ-DOMESTIC','New Zealand Domestic','NZ'),('ID-EXPORT','Indonesia Export','ID'),('AU-EXPORT','Australia Export','AU'),('MY-EXPORT','Malaysia Export','MY'),('SG-EXPORT','Singapore Export','SG') ON CONFLICT(code) DO NOTHING;
