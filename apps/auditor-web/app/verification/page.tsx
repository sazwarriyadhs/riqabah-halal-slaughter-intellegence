"use client";
import { useEffect, useState } from "react";

export default function VerificationPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData([
        { 
          id: 'CAPA-2026-001', 
          action: 'Upload missing halal certificate', 
          submittedBy: 'ops@riqabah.sa', 
          submittedAt: 'Nov 12, 2026',
          status: 'Pending',
          evidence: 'halal_cert_2026.pdf'
        },
        { 
          id: 'CAPA-2026-002', 
          action: 'Recalibrate temperature sensor', 
          submittedBy: 'ops@riqabah.sa', 
          submittedAt: 'Nov 09, 2026',
          status: 'Verified',
          evidence: 'sensor_calibration.pdf'
        },
        { 
          id: 'CAPA-2026-003', 
          action: 'Re-train staff on documentation SOP', 
          submittedBy: 'auditor@riqabah.sa', 
          submittedAt: 'Nov 05, 2026',
          status: 'Verified',
          evidence: 'training_record.pdf'
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "24px", color: "#111827" }}>Verification</h1>
      
      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "24px" }}>
        <div style={{ background: "white", padding: "24px", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>Pending Verification</div>
          <div style={{ fontSize: "36px", fontWeight: 800, color: "#b45309" }}>{loading ? "..." : data.filter(d => d.status === 'Pending').length}</div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>Awaiting review</div>
        </div>
        <div style={{ background: "white", padding: "24px", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>Verified</div>
          <div style={{ fontSize: "36px", fontWeight: 800, color: "#065f46" }}>{loading ? "..." : data.filter(d => d.status === 'Verified').length}</div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>Successfully approved</div>
        </div>
        <div style={{ background: "white", padding: "24px", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>Rejected</div>
          <div style={{ fontSize: "36px", fontWeight: 800, color: "#b91c1c" }}>{loading ? "..." : data.filter(d => d.status === 'Rejected').length}</div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>Requires rework</div>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "white", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: "18px", fontWeight: 700, color: "#111827" }}>Verification Queue</div>
          <div style={{ fontSize: "14px", color: "#6b7280" }}>CAPA submissions awaiting verification.</div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead style={{ background: "#f9fafb" }}>
            <tr>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>CAPA ID</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>ACTION</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>SUBMITTED BY</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>EVIDENCE</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>STATUS</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>DATE</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ padding: "40px", textAlign: "center" }}>Loading data...</td></tr>
            ) : data.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#111827", fontWeight: 600 }}>{item.id}</td>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#374151" }}>{item.action}</td>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#374151" }}>{item.submittedBy}</td>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#07553A" }}>{item.evidence}</td>
                <td style={{ padding: "16px 24px", fontSize: "14px" }}>
                  <span style={{ 
                    padding: "4px 10px", borderRadius: "99px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase",
                    background: item.status === 'Pending' ? "#fef3c7" : item.status === 'Verified' ? "#d1fae5" : "#fee2e2",
                    color: item.status === 'Pending' ? "#b45309" : item.status === 'Verified' ? "#065f46" : "#991b1b"
                  }}>
                    {item.status}
                  </span>
                </td>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#374151" }}>{item.submittedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
