"use client";
import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, Activity, AlertTriangle } from "lucide-react";
import { translations, Language } from "@/components/commander/dictionaries";

export default function AnalyticsPage() {
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang] || translations.en;
  useEffect(() => {
    const u = () => { const c = localStorage.getItem('app_lang') as Language; if (c && translations[c]) setLang(c); };
    u(); window.addEventListener('languageChanged', u); window.addEventListener('storage', u);
    return () => { window.removeEventListener('languageChanged', u); window.removeEventListener('storage', u); };
  }, []);
  return (
    <div className="page">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", display: "flex", alignItems: "center", gap: 8 }}><BarChart3 className="text-emerald-600" size={24} /> {t.an_title}</h1>
        <p style={{ color: "#64748b", marginTop: 4, fontSize: 14 }}>{t.an_desc}</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}><TrendingUp size={18} className="text-emerald-600" /> {t.an_throughput}</h3>
          <div style={{ height: 300, display: "flex", alignItems: "flex-end", gap: 12, paddingTop: 20, borderBottom: "1px solid #e2e8f0" }}>
            {[40, 65, 45, 80, 55, 70, 90].map((h, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ width: "100%", height: `${h}%`, background: "linear-gradient(180deg, #10b981 0%, #059669 100%)", borderRadius: "6px 6px 0 0", minHeight: 20 }}></div>
                <span style={{ fontSize: 11, color: "#64748b" }}>D-{6-i}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}><AlertTriangle size={18} className="text-amber-600" /> {t.an_alerts}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[{ label: t.ri_critical, value: 2, color: "#dc2626" }, { label: t.ri_high, value: 3, color: "#f97316" }, { label: t.ri_medium, value: 5, color: "#eab308" }, { label: t.ri_low, value: 8, color: "#3b82f6" }].map((s, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}><span style={{ color: "#0f172a" }}>{s.label}</span><span style={{ color: "#64748b" }}>{s.value}</span></div>
                <div style={{ height: 8, background: "#f1f5f9", borderRadius: 4, overflow: "hidden" }}><div style={{ height: "100%", width: `${(s.value/18)*100}%`, background: s.color }}></div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
