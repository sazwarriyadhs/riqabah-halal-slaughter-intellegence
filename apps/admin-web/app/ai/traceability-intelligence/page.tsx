"use client";
import { useState, useEffect } from "react";
import { Network, Search, CheckCircle2, Clock } from "lucide-react";
import { translations, Language } from "@/components/commander/dictionaries";

export default function TraceabilityPage() {
  const [lang, setLang] = useState<Language>('en');
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
          <Network className="text-emerald-600" size={24} /> {t.tr_title}
        </h1>
        <p style={{ color: "#64748b", marginTop: 4, fontSize: 14 }}>{t.tr_desc}</p>
      </div>
      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", background: "white", border: "1px solid #e2e8f0", borderRadius: 8, padding: "0 16px" }}>
          <Search size={18} className="text-slate-400" />
          <input type="text" placeholder={t.tr_search} style={{ flex: 1, border: "none", outline: "none", padding: 12, fontSize: 14 }} />
        </div>
      </div>
      <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", padding: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", marginBottom: 24 }}>{t.tr_timeline}</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, position: "relative" }}>
          <div style={{ position: "absolute", left: 15, top: 10, bottom: 10, width: 2, background: "#e2e8f0" }} />
          {[
            { title: t.tr_origin, value: t.tr_origin_val, date: t.tr_date1, status: "verified" },
            { title: t.tr_arrival, value: t.tr_arrival_val, date: t.tr_date2, status: "verified" },
            { title: t.tr_slaughter, value: t.tr_slaughter_val, date: t.tr_date3, status: "pending" },
            { title: t.tr_export, value: t.tr_export_val, date: t.tr_date4, status: "pending" },
          ].map((step, i) => (
            <div key={i} style={{ display: "flex", gap: 24, position: "relative", zIndex: 1 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: step.status === "verified" ? "#ecfdf5" : "white", border: step.status === "verified" ? "2px solid #059669" : "2px solid #cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {step.status === "verified" ? <CheckCircle2 size={16} className="text-emerald-600" /> : <Clock size={16} className="text-slate-400" />}
              </div>
              <div style={{ paddingTop: 4 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", marginBottom: 4 }}>{step.title}</div>
                <div style={{ fontSize: 13, color: "#64748b" }}>{step.value} • {step.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
