"use client";
import { useEffect, useState } from "react";

export default function CapaPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData([
        { 
          id: 'CAPA-2026-001', 
          finding: 'Incomplete Halal Certificate', 
          action: 'Upload missing halal certificate to document repository.', 
          status: 'Open', 
          due: 'Nov 17, 2026',
          owner: 'auditor@riqabah.sa'
        },
        { 
          id: 'CAPA-2026-002', 
          finding: 'Cold Room Temperature Excursion', 
          action: 'Recalibrate temperature sensor and verify readings.', 
          status: 'Verified', 
          due: 'Nov 10, 2026',
          owner: 'ops@riqabah.sa'
        },
        { 
          id: 'CAPA-2026-003', 
          finding: 'Missing Signature on Log', 
          action: 'Re-train staff on documentation SOP.', 
          status: 'Verified', 
          due: 'Nov 06, 2026',
          owner: 'auditor@riqabah.sa'
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "24px", color: "#111827" }}>Corrective Actions</h1>
      
      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "24px" }}>
        <div style={{ background: "white", padding: "24px", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>Total CAPA</div>
          <div style={{ fontSize: "36px", fontWeight: 800, color: "#07553A" }}>{loading ? "..." : data.length}</div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>All corrective actions</div>
        </div>
        <div style={{ background: "white", padding: "24px", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>Open</div>
          <div style={{ fontSize: "36px", fontWeight: 800, color: "#b45309" }}>{loading ? "..." : data.filter(d => d.status === 'Open').length}</div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>Awaiting action</div>
        </div>
        <div style={{ background: "white", padding: "24px", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>Verified</div>
          <div style={{ fontSize: "36px", fontWeight: 800, color: "#065f46" }}>{loading ? "..." : data.filter(d => d.status === 'Verified').length}</div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>Successfully closed</div>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "white", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: "18px", fontWeight: 700, color: "#111827" }}>CAPA Data</div>
          <div style={{ fontSize: "14px", color: "#6b7280" }}>Live operational records for this workspace.</div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead style={{ background: "#f9fafb" }}>
            <tr>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>CAPA ID</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>FINDING</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>ACTION</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>OWNER</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>STATUS</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>DUE DATE</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ padding: "40px", textAlign: "center" }}>Loading data...</td></tr>
            ) : data.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#111827", fontWeight: 600 }}>{item.id}</td>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#374151" }}>{item.finding}</td>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#374151" }}>{item.action}</td>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#374151" }}>{item.owner}</td>
                <td style={{ padding: "16px 24px", fontSize: "14px" }}>
                  <span style={{ 
                    padding: "4px 10px", borderRadius: "99px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase",
                    background: item.status === 'Open' ? "#fef3c7" : "#d1fae5",
                    color: item.status === 'Open' ? "#b45309" : "#065f46"
                  }}>
                    {item.status}
                  </span>
                </td>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#374151" }}>{item.due}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
