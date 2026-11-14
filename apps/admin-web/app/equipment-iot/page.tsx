"use client";
import { useState, useEffect } from "react";
import { Gauge, Wifi, WifiOff, Thermometer, Video, Droplets, Signal } from "lucide-react";
import { translations, Language } from "@/components/commander/dictionaries";

export default function EquipmentPage() {
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang] || translations.en;
  useEffect(() => {
    const u = () => { const c = localStorage.getItem('app_lang') as Language; if (c && translations[c]) setLang(c); };
    u(); window.addEventListener('languageChanged', u); window.addEventListener('storage', u);
    return () => { window.removeEventListener('languageChanged', u); window.removeEventListener('storage', u); };
  }, []);

  const devices = [
    { id: "SEN-001", name: "Temp Sensor A1", type: "Sensor", status: "online", value: "2.5°C", icon: <Thermometer size={20} />, color: "#059669" },
    { id: "SEN-002", name: "Temp Sensor B1", type: "Sensor", status: "online", value: "2.8°C", icon: <Thermometer size={20} />, color: "#059669" },
    { id: "SEN-003", name: "Temp Sensor B2", type: "Sensor", status: "offline", value: "--", icon: <Thermometer size={20} />, color: "#dc2626" },
    { id: "CAM-001", name: "Camera 01 - Slaughter", type: "Camera", status: "online", value: "1080p", icon: <Video size={20} />, color: "#059669" },
    { id: "CAM-002", name: "Camera 02 - Cold Storage", type: "Camera", status: "online", value: "1080p", icon: <Video size={20} />, color: "#059669" },
    { id: "CHL-001", name: "Chiller Area A", type: "Chiller", status: "online", value: "2.4°C", icon: <Gauge size={20} />, color: "#059669" },
    { id: "CHL-002", name: "Chiller Area B", type: "Chiller", status: "online", value: "2.6°C", icon: <Gauge size={20} />, color: "#059669" },
    { id: "HUM-001", name: "Humidity Sensor A", type: "Sensor", status: "online", value: "65%", icon: <Droplets size={20} />, color: "#059669" },
  ];

  return (
    <div className="page">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", display: "flex", alignItems: "center", gap: 8 }}>
          <Gauge className="text-emerald-600" size={24} /> {t.eq_title}
        </h1>
        <p style={{ color: "#64748b", marginTop: 4, fontSize: 14 }}>{t.eq_desc}</p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: t.eq_devices, value: "8", icon: <Gauge size={20} />, color: "#059669", bg: "#d1fae5" },
          { label: t.eq_sensors, value: "4", icon: <Thermometer size={20} />, color: "#0d9488", bg: "#ccfbf1" },
          { label: t.eq_cameras, value: "2", icon: <Video size={20} />, color: "#65a30d", bg: "#ecfccb" },
          { label: t.eq_chillers, value: "2", icon: <Gauge size={20} />, color: "#d97706", bg: "#fef3c7" },
        ].map((k, i) => (
          <div key={i} style={{ background: "white", borderRadius: 12, padding: 20, border: "1px solid #e2e8f0" }}>
            <div style={{ padding: 10, background: k.bg, borderRadius: 10, marginBottom: 12, width: "fit-content", color: k.color }}>{k.icon}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", marginBottom: 4 }}>{k.label}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#0f172a" }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Device Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        {devices.map((d, i) => (
          <div key={i} style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ padding: 10, background: d.status === "online" ? "#d1fae5" : "#fee2e2", borderRadius: 10, color: d.status === "online" ? "#059669" : "#dc2626" }}>
                {d.icon}
              </div>
              <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, color: d.status === "online" ? "#059669" : "#dc2626" }}>
                {d.status === "online" ? <Wifi size={12} /> : <WifiOff size={12} />}
                {d.status === "online" ? t.eq_online : t.eq_offline}
              </span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{d.name}</div>
            <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{d.id} · {d.type}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, paddingTop: 12, borderTop: "1px solid #f1f5f9" }}>
              <span style={{ fontSize: 11, color: "#64748b" }}>{t.eq_last_reading}</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>{d.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
