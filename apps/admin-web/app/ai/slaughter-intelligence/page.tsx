"use client";
import { useState, useEffect } from "react";
import { Activity, TrendingUp, CheckCircle2, Clock, Sparkles, Bot, Zap } from "lucide-react";
import { translations, Language } from "@/components/commander/dictionaries";

export default function SlaughterIntelligencePage() {
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang] || translations.en;
  useEffect(() => {
    const u = () => { const c = localStorage.getItem('app_lang') as Language; if (c && translations[c]) setLang(c); };
    u();
    window.addEventListener('languageChanged', u);
    window.addEventListener('storage', u);
    return () => { window.removeEventListener('languageChanged', u); window.removeEventListener('storage', u); };
  }, []);

  const kpis = [
    { label: t.si_total_today, value: "0", icon: <Activity size={20} className="text-emerald-600" />, color: "#059669" },
    { label: t.si_avg_time, value: "—", sub: t.si_minutes, icon: <Clock size={20} className="text-blue-600" />, color: "#2563eb" },
    { label: t.si_stun_success, value: "—", sub: "%", icon: <CheckCircle2 size={20} className="text-purple-600" />, color: "#7c3aed" },
    { label: t.si_halal_checks, value: "0", icon: <ShieldCheckIcon />, color: "#059669" },
  ];

  const species = [
    { name: t.si_cattle, count: 0, color: "#059669", percent: 0 },
    { name: t.si_sheep, count: 0, color: "#10b981", percent: 0 },
    { name: t.si_goat, count: 0, color: "#14b8a6", percent: 0 },
    { name: t.si_camel, count: 0, color: "#06b6d4", percent: 0 },
  ];

  return (
    <div className="page">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", display: "flex", alignItems: "center", gap: 8 }}>
          <Activity className="text-emerald-600" size={24} /> {t.si_title}
        </h1>
        <p style={{ color: "#64748b", marginTop: 4, fontSize: 14 }}>{t.si_desc}</p>
      </div>

      {/* AI Insight Banner */}
      <div style={{ background: "linear-gradient(90deg, #064e3b 0%, #047857 100%)", padding: "20px 24px", borderRadius: 12, color: "white", marginBottom: 24, display: "flex", gap: 16, alignItems: "flex-start" }}>
        <Bot size={32} style={{ flexShrink: 0, opacity: 0.9 }} />
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{t.si_ai_insight}</h3>
          <p style={{ fontSize: 14, opacity: 0.9, lineHeight: 1.5 }}>{t.si_ai_insight_desc}</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {kpis.map((kpi, i) => (
          <div key={i} style={{ background: "white", borderRadius: 12, padding: 20, border: "1px solid #e2e8f0" }}>
            <div style={{ padding: 10, background: `${kpi.color}15`, borderRadius: 10, marginBottom: 12, width: "fit-content" }}>{kpi.icon}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", marginBottom: 4 }}>{kpi.label}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#0f172a" }}>{kpi.value} <span style={{ fontSize: 14, color: "#64748b", fontWeight: 500 }}>{kpi.sub || ""}</span></div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        {/* Trend Chart Placeholder */}
        <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", display: "flex", alignItems: "center", gap: 8 }}>
              <TrendingUp size={18} className="text-emerald-600" /> {t.si_trend}
            </h3>
          </div>
          <div style={{ height: 240, display: "flex", alignItems: "flex-end", gap: 12, paddingTop: 20, borderBottom: "1px solid #e2e8f0", position: "relative" }}>
            {[40, 65, 45, 80, 55, 70, 90].map((h, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ width: "100%", height: `${h}%`, background: "linear-gradient(180deg, #10b981 0%, #059669 100%)", borderRadius: "6px 6px 0 0", minHeight: 20 }}></div>
                <span style={{ fontSize: 11, color: "#64748b" }}>D-{6 - i}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Species Breakdown */}
        <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 20 }}>{t.si_species}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {species.map((s, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                  <span style={{ color: "#0f172a", fontWeight: 500 }}>{s.name}</span>
                  <span style={{ color: "#64748b" }}>{s.count} {t.si_animals}</span>
                </div>
                <div style={{ height: 8, background: "#f1f5f9", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${s.percent}%`, background: s.color, transition: "width 0.3s" }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ShieldCheckIcon() {
  return <Zap size={20} className="text-emerald-600" />;
}
