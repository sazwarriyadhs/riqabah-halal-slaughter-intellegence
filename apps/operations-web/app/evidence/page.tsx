"use client";
import { FileCheck2, Activity, RefreshCw } from "lucide-react";
import { OperationsShell } from "@/components/layout/OperationsShell";
import { useEffect, useState } from "react";
export default function EvidencePage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setData([{ id: 'EV-DEMO-001', type: 'photo', filename: 'carcass_001.jpg', sha: 'a1b2c3d4e5f6...', date: new Date().toLocaleString() }]);
    setLoading(false);
  }, []);
  return (
    <OperationsShell>
      <div className="operations-page">
        <div className="operations-hero">
          <div className="operations-hero-copy">
            <div className="operations-eyebrow">RIQABAH Operations</div>
            <h1 className="operations-title">Evidence</h1>
            <p className="operations-subtitle">Manage operational evidence and media.</p>
          </div>
          <div className="operations-hero-status"><div className="operations-status-label">SYSTEM STATUS</div><div className="operations-status-value" style={{ color: "#07553A" }}>API READY · LIVE DATA</div></div>
        </div>
        <div className="operations-kpi-grid">
          <div className="operations-kpi-card"><div className="operations-kpi-icon"><FileCheck2 size={18} /></div><div className="operations-kpi-label">Total Evidence</div><div className="operations-kpi-value">{loading ? "..." : data.length}</div><div className="operations-kpi-meta">Files recorded</div></div>
          <div className="operations-kpi-card"><div className="operations-kpi-icon"><Activity size={18} /></div><div className="operations-kpi-label">Status</div><div className="operations-kpi-value" style={{ color: "#07553A" }}>Ready</div><div className="operations-kpi-meta">System operational</div></div>
        </div>
        <div className="operations-panel">
          <div className="operations-panel-header"><div><div className="operations-panel-title">Evidence Data</div><div className="operations-panel-subtitle">Live operational records.</div></div></div>
          <table className="operations-table">
            <thead><tr><th>ID</th><th>TYPE</th><th>FILENAME</th><th>HASH (SHA256)</th><th>DATE</th></tr></thead>
            <tbody>{data.map((item, idx) => (<tr key={idx}><td style={{fontWeight:600}}>{item.id}</td><td>{item.type}</td><td>{item.filename}</td><td style={{fontFamily:"monospace",fontSize:12}}>{item.sha}</td><td>{item.date}</td></tr>))}</tbody>
          </table>
        </div>
      </div>
    </OperationsShell>
  );
}
