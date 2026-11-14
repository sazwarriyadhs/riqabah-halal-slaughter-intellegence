"use client";
import { useEffect, useState } from "react";

export default function EvidencePage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData([
        { id: '...0001', type: 'photo', file: 'carcass_001.jpg', hash: 'a1b2c3d4e5f6...', date: 'Nov 10, 2026' },
        { id: '...0002', type: 'document', file: 'halal_cert_2026.pdf', hash: 'j1k2l3m4n5o6...', date: 'Nov 09, 2026' },
        { id: '...0003', type: 'video', file: 'slaughter_line_demo.mp4', hash: 't1u2v3w4x5y6...', date: 'Nov 11, 2026' },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "24px", color: "#111827" }}>Evidence</h1>
      <div style={{ background: "white", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: "18px", fontWeight: 700, color: "#111827" }}>Evidence Data</div>
          <div style={{ fontSize: "14px", color: "#6b7280" }}>Live operational records for this workspace.</div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead style={{ background: "#f9fafb" }}>
            <tr>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>ID</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>TYPE</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>FILE NAME</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>HASH</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>DATE</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={{ padding: "40px", textAlign: "center" }}>Loading data...</td></tr>
            ) : data.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#374151" }}>{item.id}</td>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#374151" }}>{item.type}</td>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#374151" }}>{item.file}</td>
                <td style={{ padding: "16px 24px", fontSize: "14px", fontFamily: "monospace", color: "#374151" }}>{item.hash}</td>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#374151" }}>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
