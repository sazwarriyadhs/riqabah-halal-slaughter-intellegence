"use client";

export default function SettingsPage() {
  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "24px", color: "#111827" }}>Settings</h1>
      
      <div style={{ display: "grid", gap: "16px" }}>
        <div style={{ background: "white", padding: "24px", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: "18px", fontWeight: 700, color: "#111827", marginBottom: "16px" }}>Profile Settings</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", marginBottom: "8px" }}>Email</div>
              <div style={{ fontSize: "14px", color: "#374151" }}>auditor@riqabah.sa</div>
            </div>
            <div>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", marginBottom: "8px" }}>Role</div>
              <div style={{ fontSize: "14px", color: "#374151" }}>Auditor</div>
            </div>
            <div>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", marginBottom: "8px" }}>Organisation</div>
              <div style={{ fontSize: "14px", color: "#374151" }}>RIQABAH Demo Saudi Ltd</div>
            </div>
            <div>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", marginBottom: "8px" }}>Region</div>
              <div style={{ fontSize: "14px", color: "#374151" }}>Saudi Arabia (Asia/Riyadh)</div>
            </div>
          </div>
        </div>

        <div style={{ background: "white", padding: "24px", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: "18px", fontWeight: 700, color: "#111827", marginBottom: "16px" }}>Notification Preferences</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: "14px", color: "#374151" }}>Email notifications for critical findings</div>
              <span style={{ color: "#065f46", fontWeight: 600 }}>Enabled</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: "14px", color: "#374151" }}>CAPA reminders</div>
              <span style={{ color: "#065f46", fontWeight: 600 }}>Enabled</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: "14px", color: "#374151" }}>Weekly audit summary</div>
              <span style={{ color: "#6b7280", fontWeight: 600 }}>Disabled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
