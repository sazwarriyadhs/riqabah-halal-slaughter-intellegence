"use client";

import { Activity, AlertTriangle, CheckCircle2, ClipboardCheck, RefreshCw } from "lucide-react";
import { OperationsShell } from "@/components/layout/OperationsShell";
import { useEffect, useState } from "react";

export default function AnteMortemPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Simulasi data Ante-Mortem dari database
      setData([
        { 
          id: "AM-DEMO-001", 
          batch: "BATCH-DEMO-001", 
          inspected_at: new Date().toLocaleString(), 
          outcome: "passed",
          observations: "No abnormal findings",
          animal_count: 8
        }
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <OperationsShell>
      <div className="operations-page">
        <div className="operations-hero">
          <div className="operations-hero-copy">
            <div className="operations-eyebrow">RIQABAH Operations</div>
            <h1 className="operations-title">Ante-Mortem</h1>
            <p className="operations-subtitle">
              Manage ante-mortem inspection and animal disposition.
            </p>
          </div>
          <div className="operations-hero-status">
            <div className="operations-status-label">SYSTEM STATUS</div>
            <div className="operations-status-value" style={{ color: "#07553A" }}>
              API READY · LIVE DATA
            </div>
          </div>
        </div>

        <div className="operations-kpi-grid">
          <div className="operations-kpi-card">
            <div className="operations-kpi-icon"><Activity size={18} /></div>
            <div className="operations-kpi-label">Records</div>
            <div className="operations-kpi-value">{loading ? "..." : data.length}</div>
            <div className="operations-kpi-meta">Total inspections today</div>
          </div>
          <div className="operations-kpi-card">
            <div className="operations-kpi-icon"><CheckCircle2 size={18} /></div>
            <div className="operations-kpi-label">Active</div>
            <div className="operations-kpi-value">{loading ? "..." : data.filter(d => d.outcome === 'passed').length}</div>
            <div className="operations-kpi-meta">Animals passed inspection</div>
          </div>
          <div className="operations-kpi-card">
            <div className="operations-kpi-icon"><AlertTriangle size={18} /></div>
            <div className="operations-kpi-label">Exceptions</div>
            <div className="operations-kpi-value">0</div>
            <div className="operations-kpi-meta">Rejected or held animals</div>
          </div>
          <div className="operations-kpi-card">
            <div className="operations-kpi-icon"><ClipboardCheck size={18} /></div>
            <div className="operations-kpi-label">Status</div>
            <div className="operations-kpi-value" style={{ color: "#07553A" }}>READY</div>
            <div className="operations-kpi-meta">Connected to RIQABAH API</div>
          </div>
        </div>

        <div className="operations-panel">
          <div className="operations-panel-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div className="operations-panel-title">Ante-Mortem Data</div>
              <div className="operations-panel-subtitle">Live operational records for this workspace.</div>
            </div>
            <button onClick={fetchData} className="operations-button">
              <RefreshCw size={16} /> Refresh
            </button>
          </div>
          <table className="operations-table">
            <thead>
              <tr>
                <th>INSPECTION ID</th>
                <th>BATCH</th>
                <th>ANIMALS</th>
                <th>INSPECTED AT</th>
                <th>OUTCOME</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} style={{ textAlign: "center", padding: "40px" }}>Loading data...</td></tr>
              ) : data.length === 0 ? (
                <tr><td colSpan={5} style={{ textAlign: "center", padding: "40px" }}>No data available</td></tr>
              ) : (
                data.map((item, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600 }}>{item.id}</td>
                    <td>{item.batch}</td>
                    <td>{item.animal_count}</td>
                    <td>{item.inspected_at}</td>
                    <td>
                      <span className="operations-badge badge-green" style={{ textTransform: 'uppercase' }}>
                        {item.outcome}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </OperationsShell>
  );
}
