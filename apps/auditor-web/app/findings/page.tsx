"use client";
import { useEffect, useState } from "react";

export default function FindingsPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData([
        { id: '...0001', type: 'Compliance', severity: 'Critical', status: 'Open', title: 'Incomplete Halal Certificate', date: 'Nov 10, 2026' },
        { id: '...0002', type: 'Temperature', severity: 'Medium', status: 'Resolved', title: 'Cold Room Temperature Excursion', date: 'Nov 06, 2026' },
        { id: '...0003', type: 'Documentation', severity: 'Low', status: 'Closed', title: 'Missing Signature on Log', date: 'Oct 27, 2026' },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "24px", color: "#111827" }}>Findings</h1>
      <div style={{ background: "white", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: "18px", fontWeight: 700, color: "#111827" }}>Findings Data</div>
          <div style={{ fontSize: "14px", color: "#6b7280" }}>Live operational records for this workspace.</div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead style={{ background: "#f9fafb" }}>
            <tr>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>ID</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>TYPE</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>SEVERITY</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>TITLE</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>STATUS</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>DATE</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ padding: "40px", textAlign: "center" }}>Loading data...</td></tr>
            ) : data.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#374151" }}>{item.id}</td>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#374151" }}>{item.type}</td>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: item.severity === 'Critical' ? '#b91c1c' : '#374151', fontWeight: 600 }}>{item.severity}</td>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#374151" }}>{item.title}</td>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#374151" }}>{item.status}</td>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#374151" }}>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
