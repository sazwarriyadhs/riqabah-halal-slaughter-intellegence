"use client";
import { useEffect, useState } from "react";

export default function TraceabilityPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData([
        { 
          id: 'TL-2026-001', 
          fromType: 'Animal', 
          fromId: 'ANIMAL-001', 
          toType: 'Carcass', 
          toId: 'CARCASS-001', 
          relationship: 'Slaughtered', 
          date: 'Nov 11, 2026',
          status: 'Verified'
        },
        { 
          id: 'TL-2026-002', 
          fromType: 'Carcass', 
          fromId: 'CARCASS-001', 
          toType: 'Meat Batch', 
          toId: 'MEAT-BATCH-001', 
          relationship: 'Processed', 
          date: 'Nov 11, 2026',
          status: 'Verified'
        },
        { 
          id: 'TL-2026-003', 
          fromType: 'Animal', 
          fromId: 'ANIMAL-002', 
          toType: 'Carcass', 
          toId: 'CARCASS-002', 
          relationship: 'Slaughtered', 
          date: 'Nov 11, 2026',
          status: 'Verified'
        },
        { 
          id: 'TL-2026-004', 
          fromType: 'Carcass', 
          fromId: 'CARCASS-002', 
          toType: 'Meat Batch', 
          toId: 'MEAT-BATCH-001', 
          relationship: 'Processed', 
          date: 'Nov 11, 2026',
          status: 'Verified'
        },
        { 
          id: 'TL-2026-005', 
          fromType: 'Animal', 
          fromId: 'ANIMAL-003', 
          toType: 'Carcass', 
          toId: 'CARCASS-003', 
          relationship: 'Slaughtered', 
          date: 'Nov 11, 2026',
          status: 'Pending'
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "24px", color: "#111827" }}>Traceability</h1>
      
      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "24px" }}>
        <div style={{ background: "white", padding: "24px", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>Trace Links</div>
          <div style={{ fontSize: "36px", fontWeight: 800, color: "#07553A" }}>{loading ? "..." : data.length}</div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>Total connections</div>
        </div>
        <div style={{ background: "white", padding: "24px", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>Verified</div>
          <div style={{ fontSize: "36px", fontWeight: 800, color: "#065f46" }}>{loading ? "..." : data.filter(d => d.status === 'Verified').length}</div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>Traceability verified</div>
        </div>
        <div style={{ background: "white", padding: "24px", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>Pending</div>
          <div style={{ fontSize: "36px", fontWeight: 800, color: "#b45309" }}>{loading ? "..." : data.filter(d => d.status === 'Pending').length}</div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>Awaiting verification</div>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "white", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: "18px", fontWeight: 700, color: "#111827" }}>Traceability Links</div>
          <div style={{ fontSize: "14px", color: "#6b7280" }}>Complete farm-to-fork trace chain.</div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead style={{ background: "#f9fafb" }}>
            <tr>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>LINK ID</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>FROM</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>TO</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>RELATIONSHIP</th>
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
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#374151" }}>{item.fromType}: <strong>{item.fromId}</strong></td>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#374151" }}>{item.toType}: <strong>{item.toId}</strong></td>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#07553A", fontWeight: 600 }}>{item.relationship}</td>
                <td style={{ padding: "16px 24px", fontSize: "14px" }}>
                  <span style={{ 
                    padding: "4px 10px", borderRadius: "99px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase",
                    background: item.status === 'Pending' ? "#fef3c7" : "#d1fae5",
                    color: item.status === 'Pending' ? "#b45309" : "#065f46"
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
