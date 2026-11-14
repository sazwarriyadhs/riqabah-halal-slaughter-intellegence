"use client";
import { useEffect, useState } from "react";

export default function SlaughterSessionsPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData([
        { 
          id: 'SES-001', 
          batch: 'BATCH-DEMO-001', 
          date: 'Nov 11, 2026',
          line: 'SL-01',
          animals: 8,
          status: 'In Progress',
          supervisor: 'RIQABAH Demo Halal Officer'
        },
        { 
          id: 'SES-002', 
          batch: 'BATCH-DEMO-002', 
          date: 'Nov 10, 2026',
          line: 'SL-02',
          animals: 12,
          status: 'Completed',
          supervisor: 'Ahmed Al-Farsi'
        },
        { 
          id: 'SES-003', 
          batch: 'BATCH-DEMO-003', 
          date: 'Nov 12, 2026',
          line: 'SL-01',
          animals: 15,
          status: 'Planned',
          supervisor: 'Ahmed Al-Farsi'
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "24px", color: "#111827" }}>Slaughter Sessions</h1>
      
      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "24px" }}>
        <div style={{ background: "white", padding: "24px", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>Active Sessions</div>
          <div style={{ fontSize: "36px", fontWeight: 800, color: "#b45309" }}>{loading ? "..." : data.filter(d => d.status === 'In Progress').length}</div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>Currently in progress</div>
        </div>
        <div style={{ background: "white", padding: "24px", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>Completed</div>
          <div style={{ fontSize: "36px", fontWeight: 800, color: "#065f46" }}>{loading ? "..." : data.filter(d => d.status === 'Completed').length}</div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>Sessions closed</div>
        </div>
        <div style={{ background: "white", padding: "24px", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>Total Animals</div>
          <div style={{ fontSize: "36px", fontWeight: 800, color: "#07553A" }}>{loading ? "..." : data.reduce((acc, curr) => acc + curr.animals, 0)}</div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>Scheduled for slaughter</div>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "white", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: "18px", fontWeight: 700, color: "#111827" }}>Slaughter Session Data</div>
          <div style={{ fontSize: "14px", color: "#6b7280" }}>Operational schedule and status.</div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead style={{ background: "#f9fafb" }}>
            <tr>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>SESSION ID</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>BATCH</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>LINE</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>ANIMALS</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>SUPERVISOR</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>STATUS</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>DATE</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} style={{ padding: "40px", textAlign: "center" }}>Loading data...</td></tr>
            ) : data.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#111827", fontWeight: 600 }}>{item.id}</td>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#374151" }}>{item.batch}</td>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#374151" }}>{item.line}</td>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#374151" }}>{item.animals}</td>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#374151" }}>{item.supervisor}</td>
                <td style={{ padding: "16px 24px", fontSize: "14px" }}>
                  <span style={{ 
                    padding: "4px 10px", borderRadius: "99px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase",
                    background: item.status === 'In Progress' ? "#fef3c7" : item.status === 'Completed' ? "#d1fae5" : "#f3f4f6",
                    color: item.status === 'In Progress' ? "#b45309" : item.status === 'Completed' ? "#065f46" : "#6b7280"
                  }}>
                    {item.status}
                  </span>
                </td>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#374151" }}>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
