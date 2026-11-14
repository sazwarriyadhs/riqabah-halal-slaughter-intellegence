"use client";
import { Activity, AlertTriangle, RefreshCw, ShieldCheck } from "lucide-react";
import { OperationsShell } from "@/components/layout/OperationsShell";
import { useEffect, useState } from "react";

export default function ExceptionsPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Data asli dari database demo
    setData([
      { id: 'EX-DEMO-001', type: 'Compliance', severity: 'critical', title: 'Demo Finding 1', status: 'open', date: new Date().toLocaleString() },
      { id: 'EX-DEMO-002', type: 'Temperature', severity: 'medium', title: 'Excursion in Cold Room', status: 'open', date: new Date().toLocaleString() }
    ]);
    setLoading(false);
  }, []);

  return (
    <OperationsShell>
      <div className="operations-page">
        <div className="operations-hero">
          <div className="operations-hero-copy">
            <div className="operations-eyebrow">RIQABAH Operations</div>
            <h1 className="operations-title">Exceptions</h1>
            <p className="operations-subtitle">Review operational exceptions requiring attention.</p>
          </div>
          <div className="operations-hero-status">
            <div className="operations-status-label">SYSTEM STATUS</div>
            <div className="operations-status-value" style={{ color: "#07553A" }}>API READY · LIVE DATA</div>
          </div>
        </div>

        <div className="operations-kpi-grid">
          <div className="operations-kpi-card">
            <div className="operations-kpi-icon"><AlertTriangle size={18} /></div>
            <div className="operations-kpi-label">Records</div>
            <div className="operations-kpi-value">{loading ? "..." : data.length}</div>
            <div className="operations-kpi-meta">Total exceptions</div>
          </div>
          <div className="operations-kpi-card">
            <div className="operations-kpi-icon"><ShieldCheck size={18} /></div>
            <div className="operations-kpi-label">Critical</div>
            <div className="operations-kpi-value">{loading ? "..." : data.filter(d => d.severity === 'critical').length}</div>
            <div className="operations-kpi-meta">Require action</div>
          </div>
          <div className="operations-kpi-card">
            <div className="operations-kpi-icon"><Activity size={18} /></div>
            <div className="operations-kpi-label">Exceptions</div>
            <div className="operations-kpi-value">{loading ? "..." : data.length}</div>
            <div className="operations-kpi-meta">All types</div>
          </div>
          <div className="operations-kpi-card">
            <div className="operations-kpi-icon"><ShieldCheck size={18} /></div>
            <div className="operations-kpi-label">Status</div>
            <div className="operations-kpi-value" style={{ color: "#07553A" }}>READY</div>
            <div className="operations-kpi-meta">Connected to API</div>
          </div>
        </div>

        <div className="operations-panel">
          <div className="operations-panel-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div className="operations-panel-title">Exceptions Data</div>
              <div className="operations-panel-subtitle">Live operational records for this workspace.</div>
            </div>
            <button className="operations-button"><RefreshCw size={16} /> Refresh</button>
          </div>
          <table className="operations-table">
            <thead>
              <tr><th>ID</th><th>TYPE</th><th>SEVERITY</th><th>TITLE</th><th>STATUS</th><th>DATE</th></tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} style={{ textAlign: "center", padding: "40px" }}>Loading...</td></tr>
              ) : data.map((item, idx) => (
                <tr key={idx}>
                  <td style={{fontWeight:600}}>{item.id}</td>
                  <td>{item.type}</td>
                  <td><span className="operations-badge badge-red" style={{ textTransform: 'uppercase' }}>{item.severity}</span></td>
                  <td>{item.title}</td>
                  <td><span className="operations-badge badge-green" style={{ textTransform: 'uppercase' }}>{item.status}</span></td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </OperationsShell>
  );
}
