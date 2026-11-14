"use client";

import { useEffect, useState } from "react";
import { Camera, Thermometer, Wifi, Activity, AlertTriangle } from "lucide-react";
import { translations, Language } from "@/components/commander/dictionaries";

export default function LiveMonitorPage() {
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang] || translations.en;

  useEffect(() => {
    const updateLang = () => {
      const currentLang = localStorage.getItem('app_lang') as Language;
      if (currentLang && translations[currentLang]) setLang(currentLang);
    };
    updateLang();
    window.addEventListener('languageChanged', updateLang);
    window.addEventListener('storage', updateLang);
    return () => {
      window.removeEventListener('languageChanged', updateLang);
      window.removeEventListener('storage', updateLang);
    };
  }, []);

  return (
    <div className="page">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", display: "flex", alignItems: "center", gap: 8 }}>
          <Activity className="text-emerald-600" size={24} /> {t.lm_title}
        </h1>
        <p style={{ color: "#64748b", marginTop: 4, fontSize: 14 }}>{t.lm_desc}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        {/* CCTV Feed */}
        <div style={{ background: "black", borderRadius: 12, overflow: "hidden", border: "1px solid #1e293b", position: "relative", minHeight: 400 }}>
          <iframe
            width="100%"
            height="400"
            src="https://www.youtube.com/embed/live_stream?channel=UC8B7S4Q8cVbJvgvV5F5zvKA"
            title="RIQABAH Demo CCTV"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ display: "block" }}
          ></iframe>
          <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(220, 38, 38, 0.9)", color: "white", padding: "6px 12px", borderRadius: 6, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 8, height: 8, background: "white", borderRadius: "50%", animation: "pulse 2s infinite" }}></span> LIVE
          </div>
          <div style={{ position: "absolute", top: 16, right: 16, background: "rgba(0,0,0,0.7)", color: "white", padding: "6px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>
            {t.lm_camera_badge}
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.9))", color: "white", padding: "24px 16px 16px", fontSize: 14 }}>
            <div style={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
              <Camera size={16} /> {t.lm_camera_title}
            </div>
            <div style={{ fontSize: 11, opacity: 0.7, marginTop: 4 }}>{t.lm_camera_source}</div>
          </div>
        </div>

        {/* Sensor Panel */}
        <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", padding: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <Thermometer size={18} className="text-emerald-600" /> {t.lm_sensor_title}
          </h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 12, background: "#f8fafc", borderRadius: 8 }}>
              <div>
                <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>Sensor #S-01 · {t.lm_device_online}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#0f172a" }}>2.5°C</div>
              </div>
              <div style={{ padding: 8, background: "#d1fae5", borderRadius: 8 }}>
                <Thermometer size={18} className="text-emerald-600" />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 12, background: "#f8fafc", borderRadius: 8 }}>
              <div>
                <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>Sensor #S-02 · {t.lm_device_online}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#0f172a" }}>2.8°C</div>
              </div>
              <div style={{ padding: 8, background: "#d1fae5", borderRadius: 8 }}>
                <Thermometer size={18} className="text-emerald-600" />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 12, background: "#fee2e2", borderRadius: 8 }}>
              <div>
                <div style={{ fontSize: 11, color: "#991b1b", marginBottom: 4 }}>Sensor #S-12 · {t.lm_device_offline}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#991b1b" }}>--°C</div>
              </div>
              <div style={{ padding: 8, background: "#fecaca", borderRadius: 8 }}>
                <AlertTriangle size={18} className="text-red-600" />
              </div>
            </div>
          </div>

          <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid #e2e8f0" }}>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
              <Wifi size={14} className="text-emerald-600" /> {t.lm_device_status}
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#475569" }}>
                <span>CCTV Cameras</span>
                <span style={{ color: "#059669", fontWeight: 600 }}>1 {t.lm_device_online}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#475569" }}>
                <span>Temp Sensors</span>
                <span style={{ color: "#059669", fontWeight: 600 }}>2 {t.lm_device_online}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#475569" }}>
                <span>IoT Devices</span>
                <span style={{ color: "#dc2626", fontWeight: 600 }}>1 {t.lm_device_offline}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
