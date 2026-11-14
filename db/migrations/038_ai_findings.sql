CREATE TABLE app.ai_findings (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), assessment_id uuid NOT NULL REFERENCES app.ai_assessments(id) ON DELETE CASCADE, finding_code text NOT NULL, severity text NOT NULL, title text NOT NULL, explanation text NOT NULL,
 evidence_refs jsonb NOT NULL DEFAULT '[]'::jsonb, affected_entities jsonb NOT NULL DEFAULT '[]'::jsonb, human_status text NOT NULL DEFAULT 'unreviewed', created_at timestamptz NOT NULL DEFAULT now()
);
