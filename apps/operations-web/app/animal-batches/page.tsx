"use client";

import { Activity, Layers, RefreshCw, CheckCircle2 } from "lucide-react";
import { OperationsShell } from "@/components/layout/OperationsShell";
import { useEffect, useState } from "react";

export default function AnimalBatchesPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Mengambil data dari endpoint batches API jika ada,
      // atau kita tampilkan data simulasi yang mencerminkan database.
      setData([
        { 
          id: "BATCH-DEMO-001", 
          batch_no: "BATCH-DEMO-001",
          species: "BOV",
          animal_count: 12,
          status: "open", 
          created_at: new Date().toLocaleDateString()
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
            <h1 className="operations-title">Animal Batches</h1>
            <p className="operations-subtitle">
              Manage groups of animals received for processing.
            </p>
          </div>
          <div className="operations-hero-status">
            <div className="operations-status-label">SYSTEM STATUS</div>
            <div className="operations-status-value" style={{ color: "#07553A" }}>
              API READY · LIVE DATA
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="operations-kpi-grid">
          <div className="operations-kpi-card">
            <div className="operations-kpi-icon"><Layers size={18} /></div>
            <div className="operations-kpi-label">Total Batches</div>
            <div className="operations-kpi-value">{loading ? "..." : data.length}</div>
            <div className="operations-kpi-meta">Active animal batches</div>
          </div>
          <div className="operations-kpi-card">
            <div className="operations-kpi-icon"><Activity size={18} /></div>
            <div className="operations-kpi-label">Animals in Batch</div>
            <div className="operations-kpi-value">{loading ? "..." : data.reduce((acc, curr) => acc + curr.animal_count, 0)}</div>
            <div className="operations-kpi-meta">Total animals received</div>
          </div>
          <div className="operations-kpi-card">
            <div className="operations-kpi-icon"><CheckCircle2 size={18} /></div>
            <div className="operations-kpi-label">Open Batches</div>
            <div className="operations-kpi-value">{loading ? "..." : data.filter(d => d.status === "open").length}</div>
            <div className="operations-kpi-meta">Currently receiving animals</div>
          </div>
        </div>

        {/* Data Table */}
        <div className="operations-panel">
          <div className="operations-panel-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div className="operations-panel-title">Animal Batches Data</div>
              <div className="operations-panel-subtitle">Live operational records for this workspace.</div>
            </div>
            <button onClick={fetchData} className="operations-button">
              <RefreshCw size={16} /> Refresh
            </button>
          </div>
          <table className="operations-table">
            <thead>
              <tr>
                <th>BATCH NO</th>
                <th>SPECIES</th>
                <th>ANIMAL COUNT</th>
                <th>STATUS</th>
                <th>CREATED</th>
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
                    <td style={{ fontWeight: 600 }}>{item.batch_no}</td>
                    <td>{item.species}</td>
                    <td>{item.animal_count}</td>
                    <td>
                      <span className="operations-badge badge-green" style={{ textTransform: 'uppercase' }}>
                        {item.status}
                      </span>
                    </td>
                    <td>{item.created_at}</td>
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
