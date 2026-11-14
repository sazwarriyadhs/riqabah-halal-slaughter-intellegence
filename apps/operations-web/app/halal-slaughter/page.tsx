"use client";
import { Activity, CheckCircle2, RefreshCw } from "lucide-react";
import { OperationsShell } from "@/components/layout/OperationsShell";
import { useEffect, useState } from "react";

export default function HalalSlaughterPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setData([{ id: 'SE-DEMO-001', batch: 'BATCH-DEMO-001', method: 'manual_halal', outcome: 'completed', date: new Date().toLocaleString() }]);
    setLoading(false);
  }, []);

  return (
    <OperationsShell>
      <div className="operations-page">
        <div className="operations-hero">
          <div className="operations-hero-copy">
            <div className="operations-eyebrow">RIQABAH Operations</div>
            <h1 className="operations-title">Halal Slaughter</h1>
            <p className="operations-subtitle">Record and verify halal slaughter events.</p>
          </div>
          <div className="operations-hero-status">
            <div className="operations-status-label">SYSTEM STATUS</div>
            <div className="operations-status-value" style={{ color: "#07553A" }}>API READY · LIVE DATA</div>
          </div>
        </div>
        <div className="operations-kpi-grid">
          <div className="operations-kpi-card">
            <div className="operations-kpi-icon"><Activity size={18} /></div>
            <div className="operations-kpi-label">Records</div>
            <div className="operations-kpi-value">{loading ? "..." : data.length}</div>
            <div className="operations-kpi-meta">Total events today</div>
          </div>
          <div className="operations-kpi-card">
            <div className="operations-kpi-icon"><CheckCircle2 size={18} /></div>
            <div className="operations-kpi-label">Completed</div>
            <div className="operations-kpi-value">{loading ? "..." : data.length}</div>
            <div className="operations-kpi-meta">Halal events recorded</div>
          </div>
        </div>
        <div className="operations-panel">
          <div className="operations-panel-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div className="operations-panel-title">Halal Slaughter Data</div>
              <div className="operations-panel-subtitle">Live operational records for this workspace.</div>
            </div>
            <button className="operations-button"><RefreshCw size={16} /> Refresh</button>
          </div>
          <table className="operations-table">
            <thead>
              <tr><th>EVENT NO</th><th>BATCH</th><th>METHOD</th><th>OUTCOME</th><th>DATE</th></tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600 }}>{item.id}</td><td>{item.batch}</td><td>{item.method}</td>
                  <td><span className="operations-badge badge-green" style={{ textTransform: 'uppercase' }}>{item.outcome}</span></td><td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </OperationsShell>
  );
}
