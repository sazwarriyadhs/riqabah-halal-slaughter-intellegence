CREATE TABLE app.ai_recommendations (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), assessment_id uuid NOT NULL REFERENCES app.ai_assessments(id) ON DELETE CASCADE, recommendation text NOT NULL, rationale text, priority text NOT NULL DEFAULT 'medium',
 requires_human_approval boolean NOT NULL DEFAULT true, status text NOT NULL DEFAULT 'proposed', approved_by uuid REFERENCES app.users(id), approved_at timestamptz, outcome text, created_at timestamptz NOT NULL DEFAULT now()
);
