CREATE TABLE app.requirements (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), framework_id uuid REFERENCES app.compliance_frameworks(id), code text NOT NULL, title text NOT NULL, description text, source_uri text,
 version text NOT NULL DEFAULT '1', effective_from date, effective_to date, mandatory boolean NOT NULL DEFAULT true, requirement_type text NOT NULL DEFAULT 'control', metadata jsonb NOT NULL DEFAULT '{}'::jsonb, UNIQUE(framework_id,code,version)
);
CREATE TABLE app.requirement_controls (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), requirement_id uuid NOT NULL REFERENCES app.requirements(id) ON DELETE CASCADE, control_point_id uuid REFERENCES app.halal_control_points(id), evidence_type text, frequency text, owner_role text, acceptance_criteria text);
