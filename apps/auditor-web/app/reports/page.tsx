"use client";
import { useState } from "react";
import { Send, CheckCircle2, FileSpreadsheet, FileText } from "lucide-react";

export default function ReportsPage() {
  const [data] = useState<any[]>([
    { id: 'RPT-2026-11-AUD-01', type: 'Audit Report', period: 'Nov 01 - Nov 15, 2026', metric: '98.5% Pass Rate', status: 'Compliant' },
    { id: 'RPT-2026-11-CAPA-02', type: 'CAPA Verification', period: 'Nov 01 - Nov 15, 2026', metric: '2 Verified', status: 'Compliant' },
    { id: 'RPT-2026-10-AUD-06', type: 'Audit Report', period: 'Oct 2026', metric: '97.8% Pass Rate', status: 'Compliant' },
  ]);

  const [hasPendingRequest, setHasPendingRequest] = useState(true);

  const handleAccept = () => {
    alert("✅ Request accepted! Report sent to Admin (Commander).");
    setHasPendingRequest(false);
  };

  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "24px", color: "#111827" }}>Reports</h1>

      <div style={{ display: "flex", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
        {hasPendingRequest ? (
          <button onClick={handleAccept} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 20px", background: "#d97706", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: 600 }}>
            <CheckCircle2 size={18} /> Accept Request & Send
          </button>
        ) : (
          <button onClick={() => alert("Report sent to Commander.")} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 20px", background: "#07553A", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: 600 }}>
            <Send size={18} /> Send to Commander
          </button>
        )}
        <button onClick={() => alert("Excel downloaded.")} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 20px", background: "#07553A", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: 600 }}>
          <FileSpreadsheet size={18} /> Export Excel
        </button>
        <button onClick={() => alert("PDF downloaded.")} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 20px", background: "#d32f2f", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: 600 }}>
          <FileText size={18} /> Export PDF
        </button>
      </div>

      <div style={{ background: "white", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: "18px", fontWeight: 700, color: "#111827" }}>Report Data</div>
          <div style={{ fontSize: "14px", color: "#6b7280" }}>Available generated audit reports.</div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead style={{ background: "#f9fafb" }}>
            <tr>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>Report ID</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>Type</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>Period</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>Key Metric</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "16px 24px", fontWeight: 600 }}>{item.id}</td>
                <td style={{ padding: "16px 24px" }}>{item.type}</td>
                <td style={{ padding: "16px 24px" }}>{item.period}</td>
                <td style={{ padding: "16px 24px", fontWeight: 600, color: "#07553A" }}>{item.metric}</td>
                <td style={{ padding: "16px 24px" }}>
                  <span style={{ padding: "4px 10px", borderRadius: "99px", fontSize: "11px", fontWeight: 700, background: "#d1fae5", color: "#065f46" }}>{item.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
