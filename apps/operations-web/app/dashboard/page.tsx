"use client";

import { Activity, AlertTriangle, ClipboardCheck, Factory, Package, RefreshCw } from "lucide-react";
import { OperationsShell } from "@/components/layout/OperationsShell";
import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:8094";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("riqabah_access_token");
        const res = await fetch(`${API_BASE}/api/v1/dashboard/summary`, {
          headers: {
            "Accept": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {})
          }
        });
        if (res.ok) {
          const json = await res.json();
          setData(json.data);
        }
      } catch (err) {
        console.error("Gagal ambil data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const kpis = [
    {
      label: "Animals Received",
      value: loading ? "..." : data?.operations?.slaughtered_today ?? 0,
      meta: "Total animals in today's batch",
      icon: <Activity size={18} />,
    },
    {
      label: "Slaughter Completed",
      value: loading ? "..." : data?.operations?.slaughtered_today ?? 0,
      meta: "Halal slaughter events recorded",
      icon: <ClipboardCheck size={18} />,
    },
    {
      label: "Carcass Processed",
      value: loading ? "..." : data?.operations?.slaughtered_today ?? 0,
      meta: "Carcasses in cold storage",
      icon: <Factory size={18} />,
    },
    {
      label: "Meat Batches",
      value: loading ? "..." : data?.meat_production?.quantity_today ?? 0,
      meta: "kg of meat produced today",
      icon: <Package size={18} />,
    },
  ];

  const flow = [
    "Animal Intake",
    "Ante-Mortem",
    "Slaughter",
    "Post-Mortem",
    "Carcass",
    "Cutting",
    "Meat Batch",
    "Release",
  ];

  return (
    <OperationsShell>
      <div className="operations-page">
        
        {/* HERO */}
        <div className="operations-hero">
          <div className="operations-hero-copy">
            <div className="operations-eyebrow">RIQABAH Operations</div>
            <h1 className="operations-title">Operations Command Center</h1>
            <p className="operations-subtitle">
              Daily RPH operational overview from animal intake through slaughter, processing, traceability and release.
            </p>
          </div>
          <div className="operations-hero-status">
            <div className="operations-status-label">SYSTEM STATUS</div>
            <div className="operations-status-value">
              {loading ? "CONNECTING..." : "API READY · LIVE DATA"}
            </div>
          </div>
        </div>

        {/* KPI GRID */}
        <div className="operations-kpi-grid">
          {kpis.map((kpi, idx) => (
            <div key={idx} className="operations-kpi-card">
              <div className="operations-kpi-icon">{kpi.icon}</div>
              <div className="operations-kpi-label">{kpi.label}</div>
              <div className="operations-kpi-value">{kpi.value}</div>
              <div className="operations-kpi-meta">{kpi.meta}</div>
            </div>
          ))}
        </div>

        {/* PRODUCTION FLOW */}
        <div className="operations-panel">
          <div className="operations-panel-header">
            <div>
              <div className="operations-panel-title">Production Flow</div>
              <div className="operations-panel-subtitle">Operational lifecycle from animal intake to released meat batch.</div>
            </div>
          </div>
          <table className="operations-table">
            <thead>
              <tr>
                <th>STAGE</th>
                <th>RECORDS</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {flow.map((stage, idx) => (
                <tr key={idx}>
                  <td>{stage}</td>
                  <td>{loading ? "—" : (idx < 3 ? (data?.operations?.slaughtered_today ?? 0) : 0)}</td>
                  <td>
                    <span className={`operations-badge ${idx < 3 ? "badge-green" : "badge-gray"}`}>
                      {idx < 3 ? "ACTIVE" : "PENDING"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </OperationsShell>
  );
}
