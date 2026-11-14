"use client";
import { Activity, Package, RefreshCw } from "lucide-react";
import { OperationsShell } from "@/components/layout/OperationsShell";
import { useEffect, useState } from "react";

export default function MeatBatchesPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setData([{ id: 'MEAT-DEMO-001', quantity: '561.7 kg', halal: 'supported', status: 'available', date: new Date().toLocaleString() }]);
    setLoading(false);
  }, []);

  return (
    <OperationsShell>
      <div className="operations-page">
        <div className="operations-hero">
          <div className="operations-hero-copy">
            <div className="operations-eyebrow">RIQABAH Operations</div>
            <h1 className="operations-title">Meat Batches</h1>
            <p className="operations-subtitle">Monitor meat production batches.</p>
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
            <div className="operations-kpi-meta">Total meat batches today</div>
          </div>
          <div className="operations-kpi-card">
            <div className="operations-kpi-icon"><Package size={18} /></div>
            <div className="operations-kpi-label">Quantity</div>
            <div className="operations-kpi-value">561.7</div>
            <div className="operations-kpi-meta">kg produced today</div>
          </div>
        </div>
        <div className="operations-panel">
          <div className="operations-panel-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div className="operations-panel-title">Meat Batches Data</div>
              <div className="operations-panel-subtitle">Live operational records for this workspace.</div>
            </div>
            <button className="operations-button"><RefreshCw size={16} /> Refresh</button>
          </div>
          <table className="operations-table">
            <thead>
              <tr><th>BATCH NO</th><th>QUANTITY</th><th>HALAL STATUS</th><th>STATUS</th><th>DATE</th></tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600 }}>{item.id}</td><td>{item.quantity}</td>
                  <td><span className="operations-badge badge-green" style={{ textTransform: 'uppercase' }}>{item.halal}</span></td>
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
