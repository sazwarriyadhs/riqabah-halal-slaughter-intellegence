"use client";
import { useState, useEffect } from "react";
import { FileCheck2, UploadCloud, FileText } from "lucide-react";
import { translations, Language } from "@/components/commander/dictionaries";

export default function DocumentIntelligencePage() {
  const [lang, setLang] = useState<Language>('en');
  const [dragging, setDragging] = useState(false);
  const t = translations[lang] || translations.en;
  useEffect(() => {
    const u = () => { const c = localStorage.getItem('app_lang') as Language; if (c && translations[c]) setLang(c); };
    u();
    window.addEventListener('languageChanged', u);
    window.addEventListener('storage', u);
    return () => { window.removeEventListener('languageChanged', u); window.removeEventListener('storage', u); };
  }, []);

  return (
    <div className="page">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", display: "flex", alignItems: "center", gap: 8 }}>
          <FileCheck2 className="text-emerald-600" size={24} /> {t.di_title}
        </h1>
        <p style={{ color: "#64748b", marginTop: 4, fontSize: 14 }}>{t.di_desc}</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(e) => { e.preventDefault(); setDragging(false); }}
          style={{ background: "white", borderRadius: 12, border: dragging ? "2px dashed #059669" : "2px dashed #cbd5e1", padding: 40, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", transition: "all 0.2s", cursor: "pointer" }}>
          <div style={{ padding: 16, background: "#ecfdf5", borderRadius: "50%", marginBottom: 16 }}>
            <UploadCloud className="text-emerald-600" size={32} />
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", marginBottom: 8 }}>{t.di_drag}</h3>
          <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>{t.di_supported}</p>
          <button style={{ padding: "10px 24px", background: "#059669", color: "white", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>{t.di_upload}</button>
        </div>
        <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
            <FileText size={18} className="text-blue-600" /> {t.di_extracted}
          </h3>
          {[{ l: t.di_cert, v: "HL-2026-88912" }, { l: t.di_owner, v: "Al-Baraka Farms" }, { l: t.di_issuer, v: "Saudi Halal Authority" }, { l: t.di_expiry, v: "2027-11-12" }].map((item, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: "#64748b" }}>{item.l}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{item.v}</span>
            </div>
          ))}
          <div style={{ marginTop: 12, padding: 16, background: "#ecfdf5", borderRadius: 8, display: "flex", alignItems: "center", gap: 8, color: "#059669", fontSize: 13, fontWeight: 600 }}>
            <FileCheck2 size={16} /> {t.di_success}
          </div>
        </div>
      </div>
    </div>
  );
}
