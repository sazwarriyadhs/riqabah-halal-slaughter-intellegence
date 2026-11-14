"use client";
import { useEffect, useState } from "react";

export default function FacilitiesPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData([
        { 
          id: 'FAC-001', 
          name: 'Riyadh Halal Processing Facility', 
          type: 'Processing Plant', 
          location: 'Riyadh, Saudi Arabia',
          status: 'Active',
          approved: 'Halal Approved'
        },
        { 
          id: 'FAC-002', 
          name: 'Jeddah Cold Storage', 
          type: 'Cold Store', 
          location: 'Jeddah, Saudi Arabia',
          status: 'Active',
          approved: 'Halal Approved'
        },
        { 
          id: 'FAC-003', 
          name: 'Dammam Export Facility', 
          type: 'Export Facility', 
          location: 'Dammam, Saudi Arabia',
          status: 'Under Review',
          approved: 'Pending'
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "24px", color: "#111827" }}>Facilities</h1>
      
      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "24px" }}>
        <div style={{ background: "white", padding: "24px", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>Total Facilities</div>
          <div style={{ fontSize: "36px", fontWeight: 800, color: "#07553A" }}>{loading ? "..." : data.length}</div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>Registered facilities</div>
        </div>
        <div style={{ background: "white", padding: "24px", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>Halal Approved</div>
          <div style={{ fontSize: "36px", fontWeight: 800, color: "#065f46" }}>{loading ? "..." : data.filter(d => d.approved === 'Halal Approved').length}</div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>Approved premises</div>
        </div>
        <div style={{ background: "white", padding: "24px", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>Under Review</div>
          <div style={{ fontSize: "36px", fontWeight: 800, color: "#b45309" }}>{loading ? "..." : data.filter(d => d.status === 'Under Review').length}</div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>Pending review</div>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "white", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: "18px", fontWeight: 700, color: "#111827" }}>Facilities Data</div>
          <div style={{ fontSize: "14px", color: "#6b7280" }}>Registered facilities and premises across the RIQABAH network.</div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead style={{ background: "#f9fafb" }}>
            <tr>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>FACILITY ID</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>NAME</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>TYPE</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>LOCATION</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={{ padding: "40px", textAlign: "center" }}>Loading data...</td></tr>
            ) : data.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#111827", fontWeight: 600 }}>{item.id}</td>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#374151" }}>{item.name}</td>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#374151" }}>{item.type}</td>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#374151" }}>{item.location}</td>
                <td style={{ padding: "16px 24px", fontSize: "14px" }}>
                  <span style={{ 
                    padding: "4px 10px", borderRadius: "99px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase",
                    background: item.approved === 'Halal Approved' ? "#d1fae5" : "#fef3c7",
                    color: item.approved === 'Halal Approved' ? "#065f46" : "#b45309"
                  }}>
                    {item.approved}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
