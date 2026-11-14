"use client";
import { useState, useEffect } from "react";
import { Video, Camera, Maximize2, Play, Square } from "lucide-react";
import { translations, Language } from "@/components/commander/dictionaries";

export default function CctvPage() {
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang] || translations.en;
  useEffect(() => {
    const u = () => { const c = localStorage.getItem('app_lang') as Language; if (c && translations[c]) setLang(c); };
    u(); window.addEventListener('languageChanged', u); window.addEventListener('storage', u);
    return () => { window.removeEventListener('languageChanged', u); window.removeEventListener('storage', u); };
  }, []);

  const cameras = [
    { id: "CAM-01", name: "Slaughter Line A", loc: "Building 1", status: "live", color: "#059669" },
    { id: "CAM-02", name: "Slaughter Line B", loc: "Building 1", status: "live", color: "#059669" },
    { id: "CAM-03", name: "Cold Storage", loc: "Building 2", status: "live", color: "#059669" },
    { id: "CAM-04", name: "Loading Dock", loc: "Building 3", status: "offline", color: "#dc2626" },
    { id: "CAM-05", name: "Receiving Area", loc: "Building 1", status: "live", color: "#059669" },
    { id: "CAM-06", name: "Export Exit", loc: "Building 3", status: "live", color: "#059669" },
  ];

  return (
    <div className="page">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", display: "flex", alignItems: "center", gap: 8 }}>
          <Video className="text-emerald-600" size={24} /> {t.cv_title}
        </h1>
        <p style={{ color: "#64748b", marginTop: 4, fontSize: 14 }}>{t.cv_desc}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {cameras.map((c, i) => (
          <div key={i} style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden", cursor: "pointer", transition: "transform 0.2s" }}>
            <div style={{ background: "#0f172a", height: 200, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <Camera size={40} style={{ color: "#475569" }} />
              <span style={{ position: "absolute", top: 12, left: 12, background: c.status === "live" ? "#dc2626" : "#475569", color: "white", padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                {c.status === "live" && <span style={{ width: 6, height: 6, background: "white", borderRadius: "50%" }}></span>}
                {c.status === "live" ? t.cv_live : t.cv_offline}
              </span>
              <span style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.7)", color: "white", padding: "4px 8px", borderRadius: 6, fontSize: 11 }}>
                <Maximize2 size={12} />
              </span>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{c.name}</div>
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{c.id} · {c.loc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
