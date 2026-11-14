"use client";
import { useEffect, useState } from "react";

export default function NotificationsPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData([
        { id: 'NTF-001', title: 'New CAPA Submitted', message: 'CAPA-2026-001 awaiting verification.', type: 'info', time: '2 hours ago', read: false },
        { id: 'NTF-002', title: 'Critical Finding Detected', message: 'Incomplete Halal Certificate for Batch BATCH-DEMO-001.', type: 'critical', time: '1 day ago', read: false },
        { id: 'NTF-003', title: 'Audit Completed', message: 'Annual Halal Compliance Audit has been completed.', type: 'success', time: '2 days ago', read: true },
        { id: 'NTF-004', title: 'Temperature Excursion Resolved', message: 'Cold Room Temperature issue has been resolved.', type: 'success', time: '3 days ago', read: true },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "24px", color: "#111827" }}>Notifications</h1>
      <div style={{ background: "white", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "18px", fontWeight: 700, color: "#111827" }}>Notification Center</div>
            <div style={{ fontSize: "14px", color: "#6b7280" }}>All system alerts and updates.</div>
          </div>
          <span style={{ background: "#fee2e2", color: "#991b1b", padding: "4px 12px", borderRadius: "99px", fontSize: "12px", fontWeight: 700 }}>
            {data.filter(d => !d.read).length} Unread
          </span>
        </div>
        <div>
          {loading ? (
            <div style={{ padding: "40px", textAlign: "center" }}>Loading notifications...</div>
          ) : data.map((item, idx) => (
            <div key={idx} style={{ padding: "16px 24px", borderBottom: "1px solid #e5e7eb", display: "flex", gap: "16px", alignItems: "flex-start", background: item.read ? "white" : "#f9fafb" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: item.type === 'critical' ? "#fee2e2" : item.type === 'success' ? "#d1fae5" : "#dbeafe", color: item.type === 'critical' ? "#991b1b" : item.type === 'success' ? "#065f46" : "#1e40af", fontWeight: 700 }}>
                {item.type === 'critical' ? '!' : item.type === 'success' ? '✓' : 'i'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: "#111827", marginBottom: "4px" }}>{item.title}</div>
                <div style={{ fontSize: "14px", color: "#6b7280" }}>{item.message}</div>
              </div>
              <div style={{ fontSize: "12px", color: "#9ca3af", whiteSpace: "nowrap" }}>{item.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
