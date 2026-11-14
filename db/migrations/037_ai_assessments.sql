CREATE TABLE app.ai_assessments (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organisation_id uuid NOT NULL REFERENCES app.organisations(id), subject_type text NOT NULL, subject_id uuid NOT NULL, model_name text NOT NULL, model_version text,
 assessment_type text NOT NULL, risk_score numeric(8,5), confidence numeric(8,5) CHECK(confidence IS NULL OR confidence BETWEEN 0 AND 1), status text NOT NULL DEFAULT 'generated', human_decision text,
 generated_at timestamptz NOT NULL DEFAULT now(), reviewed_at timestamptz, reviewed_by uuid REFERENCES app.users(id), input_refs jsonb NOT NULL DEFAULT '[]'::jsonb, explanation jsonb NOT NULL DEFAULT '{}'::jsonb, model_metadata jsonb NOT NULL DEFAULT '{}'::jsonb
);
