"use client";
import { useEffect, useState } from "react";

export default function AuditTrailPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData([
        { 
          id: 'EVT-2026-001', 
          action: 'CREATE_AUDIT', 
          entity: 'Audit: AUD-2026-001',
          actor: 'auditor@riqabah.sa', 
          timestamp: 'Nov 01, 2026 08:30',
          status: 'Success'
        },
        { 
          id: 'EVT-2026-002', 
          action: 'RECORD_FINDING', 
          entity: 'Finding: Incomplete Halal Certificate',
          actor: 'auditor@riqabah.sa', 
          timestamp: 'Nov 10, 2026 14:15',
          status: 'Success'
        },
        { 
          id: 'EVT-2026-003', 
          action: 'UPLOAD_EVIDENCE', 
          entity: 'Evidence: carcass_001.jpg',
          actor: 'ops@riqabah.sa', 
          timestamp: 'Nov 10, 2026 14:30',
          status: 'Success'
        },
        { 
          id: 'EVT-2026-004', 
          action: 'CREATE_CAPA', 
          entity: 'CAPA: CAPA-2026-001',
          actor: 'auditor@riqabah.sa', 
          timestamp: 'Nov 10, 2026 15:00',
          status: 'Success'
        },
        { 
          id: 'EVT-2026-005', 
          action: 'VERIFY_CAPA', 
          entity: 'CAPA: CAPA-2026-002',
          actor: 'auditor@riqabah.sa', 
          timestamp: 'Nov 09, 2026 10:45',
          status: 'Success'
        },
        { 
          id: 'EVT-2026-006', 
          action: 'UPDATE_FINDING', 
          entity: 'Finding: Cold Room Temperature Excursion',
          actor: 'ops@riqabah.sa', 
          timestamp: 'Nov 09, 2026 11:00',
          status: 'Success'
        },
        { 
          id: 'EVT-2026-007', 
          action: 'LOGIN', 
          entity: 'User Session',
          actor: 'owner@riqabah.sa', 
          timestamp: 'Nov 11, 2026 08:00',
          status: 'Success'
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "24px", color: "#111827" }}>Audit Trail</h1>
      
      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "24px" }}>
        <div style={{ background: "white", padding: "24px", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>Total Events</div>
          <div style={{ fontSize: "36px", fontWeight: 800, color: "#07553A" }}>{loading ? "..." : data.length}</div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>Recorded events</div>
        </div>
        <div style={{ background: "white", padding: "24px", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>Today</div>
          <div style={{ fontSize: "36px", fontWeight: 800, color: "#07553A" }}>1</div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>Events today</div>
        </div>
        <div style={{ background: "white", padding: "24px", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>Success Rate</div>
          <div style={{ fontSize: "36px", fontWeight: 800, color: "#065f46" }}>100%</div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>All events successful</div>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "white", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: "18px", fontWeight: 700, color: "#111827" }}>Event Log</div>
          <div style={{ fontSize: "14px", color: "#6b7280" }}>Chronological history of system activities.</div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead style={{ background: "#f9fafb" }}>
            <tr>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>EVENT ID</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>ACTION</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>ENTITY</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>ACTOR</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>STATUS</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>TIMESTAMP</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ padding: "40px", textAlign: "center" }}>Loading data...</td></tr>
            ) : data.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#111827", fontWeight: 600 }}>{item.id}</td>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#07553A", fontWeight: 600 }}>{item.action}</td>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#374151" }}>{item.entity}</td>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#374151" }}>{item.actor}</td>
                <td style={{ padding: "16px 24px", fontSize: "14px" }}>
                  <span style={{ 
                    padding: "4px 10px", borderRadius: "99px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase",
                    background: "#d1fae5",
                    color: "#065f46"
                  }}>
                    {item.status}
                  </span>
                </td>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#374151" }}>{item.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
