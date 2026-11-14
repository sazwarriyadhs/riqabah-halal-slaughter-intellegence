"use client";
import { Activity, Settings, ShieldCheck, RefreshCw, AlertTriangle, Users } from "lucide-react";
import { OperationsShell } from "@/components/layout/OperationsShell";
import { useState } from "react";

export default function ControlPage() {
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <OperationsShell>
      <div className="operations-page">
        <div className="operations-hero">
          <div className="operations-hero-copy">
            <div className="operations-eyebrow">RIQABAH Operations</div>
            <h1 className="operations-title">Control Center</h1>
            <p className="operations-subtitle">
              Centralised control for operations, security, and access management.
            </p>
          </div>
          <div className="operations-hero-status">
            <div className="operations-status-label">SYSTEM STATUS</div>
            <div className="operations-status-value" style={{ color: "#07553A" }}>API READY · LIVE DATA</div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="operations-kpi-grid">
          <div className="operations-kpi-card">
            <div className="operations-kpi-icon"><Activity size={18} /></div>
            <div className="operations-kpi-label">System Health</div>
            <div className="operations-kpi-value" style={{ color: "#07553A" }}>100%</div>
            <div className="operations-kpi-meta">All systems operational</div>
          </div>
          <div className="operations-kpi-card">
            <div className="operations-kpi-icon"><Users size={18} /></div>
            <div className="operations-kpi-label">Active Users</div>
            <div className="operations-kpi-value">3</div>
            <div className="operations-kpi-meta">Currently online</div>
          </div>
          <div className="operations-kpi-card">
            <div className="operations-kpi-icon"><ShieldCheck size={18} /></div>
            <div className="operations-kpi-label">Security</div>
            <div className="operations-kpi-value">Secure</div>
            <div className="operations-kpi-meta">All security protocols active</div>
          </div>
          <div className="operations-kpi-card">
            <div className="operations-kpi-icon"><AlertTriangle size={18} /></div>
            <div className="operations-kpi-label">Alerts</div>
            <div className="operations-kpi-value">0</div>
            <div className="operations-kpi-meta">No active alerts</div>
          </div>
        </div>

        {/* Panel Control */}
        <div className="operations-panel">
          <div className="operations-panel-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div className="operations-panel-title">Operational Control</div>
              <div className="operations-panel-subtitle">Manage global settings and system control.</div>
            </div>
            <button onClick={handleRefresh} className="operations-button">
              <RefreshCw size={16} className={loading ? "spin" : ""} /> Refresh
            </button>
          </div>
          
          <div style={{ padding: "24px", display: "grid", gap: "16px" }}>
            <div style={{ padding: "16px", border: "1px solid #e5e7eb", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 600 }}>Equipment / IoT Connectivity</div>
                <div style={{ fontSize: "13px", color: "#6b7280" }}>Monitor all devices and sensors</div>
              </div>
              <span className="operations-badge badge-green">CONNECTED</span>
            </div>

            <div style={{ padding: "16px", border: "1px solid #e5e7eb", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 600 }}>Halal Compliance Engine</div>
                <div style={{ fontSize: "13px", color: "#6b7280" }}>Verify SFDA and GSO compliance</div>
              </div>
              <span className="operations-badge badge-green">ACTIVE</span>
            </div>

            <div style={{ padding: "16px", border: "1px solid #e5e7eb", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 600 }}>Traceability Ledger</div>
                <div style={{ fontSize: "13px", color: "#6b7280" }}>Immutable records for export assurance</div>
              </div>
              <span className="operations-badge badge-green">SYNCED</span>
            </div>
          </div>
        </div>
      </div>
    </OperationsShell>
  );
}
