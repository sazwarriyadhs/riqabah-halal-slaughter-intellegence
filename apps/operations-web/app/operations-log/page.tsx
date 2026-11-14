"use client";
import { Activity } from "lucide-react";
import { OperationsShell } from "@/components/layout/OperationsShell";
import { useEffect, useState } from "react";
export default function OperationsLogPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setData([
      { id: 'LOG-DEMO-001', action: 'Slaughter Started', user: 'owner@riqabah.sa', date: new Date().toLocaleString() },
      { id: 'LOG-DEMO-002', action: 'Carcass Weighed', user: 'owner@riqabah.sa', date: new Date().toLocaleString() }
    ]);
    setLoading(false);
  }, []);
  return (
    <OperationsShell>
      <div className="operations-page">
        <div className="operations-hero">
          <div className="operations-hero-copy">
            <div className="operations-eyebrow">RIQABAH Operations</div>
            <h1 className="operations-title">Operations Log</h1>
            <p className="operations-subtitle">Audit trail of operational events.</p>
          </div>
          <div className="operations-hero-status"><div className="operations-status-label">SYSTEM STATUS</div><div className="operations-status-value" style={{ color: "#07553A" }}>API READY · LIVE DATA</div></div>
        </div>
        <div className="operations-panel">
          <div className="operations-panel-header"><div><div className="operations-panel-title">Log Data</div><div className="operations-panel-subtitle">Live operational records.</div></div></div>
          <table className="operations-table">
            <thead><tr><th>ID</th><th>ACTION</th><th>USER</th><th>DATE</th></tr></thead>
            <tbody>{data.map((item, idx) => (<tr key={idx}><td style={{fontWeight:600}}>{item.id}</td><td>{item.action}</td><td>{item.user}</td><td>{item.date}</td></tr>))}</tbody>
          </table>
        </div>
      </div>
    </OperationsShell>
  );
}
