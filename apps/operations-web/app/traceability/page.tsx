"use client";
import { GitBranch } from "lucide-react";
import { OperationsShell } from "@/components/layout/OperationsShell";
import { useEffect, useState } from "react";
export default function TraceabilityPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setData([{ id: 'TL-DEMO-001', from: 'ANIMAL-001', to: 'CARCASS-001', relationship: 'slaughtered', date: new Date().toLocaleString() }]);
    setLoading(false);
  }, []);
  return (
    <OperationsShell>
      <div className="operations-page">
        <div className="operations-hero">
          <div className="operations-hero-copy">
            <div className="operations-eyebrow">RIQABAH Operations</div>
            <h1 className="operations-title">Traceability</h1>
            <p className="operations-subtitle">Trace animals from farm to export.</p>
          </div>
          <div className="operations-hero-status"><div className="operations-status-label">SYSTEM STATUS</div><div className="operations-status-value" style={{ color: "#07553A" }}>API READY · LIVE DATA</div></div>
        </div>
        <div className="operations-kpi-grid">
          <div className="operations-kpi-card"><div className="operations-kpi-icon"><GitBranch size={18} /></div><div className="operations-kpi-label">Trace Links</div><div className="operations-kpi-value">{loading ? "..." : data.length}</div><div className="operations-kpi-meta">Connections recorded</div></div>
        </div>
        <div className="operations-panel">
          <div className="operations-panel-header"><div><div className="operations-panel-title">Traceability Data</div><div className="operations-panel-subtitle">Live operational records.</div></div></div>
          <table className="operations-table">
            <thead><tr><th>LINK ID</th><th>FROM</th><th>TO</th><th>RELATIONSHIP</th><th>DATE</th></tr></thead>
            <tbody>{data.map((item, idx) => (<tr key={idx}><td style={{fontWeight:600}}>{item.id}</td><td>{item.from}</td><td>{item.to}</td><td><span className="operations-badge badge-green">{item.relationship}</span></td><td>{item.date}</td></tr>))}</tbody>
          </table>
        </div>
      </div>
    </OperationsShell>
  );
}
