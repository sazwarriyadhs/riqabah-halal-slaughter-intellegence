"use client";
import { useState, useEffect } from "react";
import { Globe, Package, CheckCircle2, Clock, TrendingUp, Bot } from "lucide-react";
import { translations, Language } from "@/components/commander/dictionaries";

export default function ExportCompliancePage() {
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
    { label: t.ec_total_shipments, value: "12", icon: <Package size={20} />, color: "#059669", bg: "#d1fae5" },
    { label: t.ec_pending, value: "3", icon: <Clock size={20} />, color: "#d97706", bg: "#fef3c7" },
    { label: t.ec_approved, value: "9", icon: <CheckCircle2 size={20} />, color: "#059669", bg: "#d1fae5" },
    { label: t.ec_countries, value: "5", icon: <Globe size={20} />, color: "#0d9488", bg: "#ccfbf1" },
  ];

  const markets = [
    { region: t.ec_gcc, count: 8, icon: <Globe size={18} />, color: "#059669", bg: "#d1fae5" },
    { region: t.ec_asia, count: 3, icon: <Globe size={18} />, color: "#0d9488", bg: "#ccfbf1" },
    { region: t.ec_europe, count: 2, icon: <Globe size={18} />, color: "#65a30d", bg: "#ecfccb" },
    { region: t.ec_me, count: 4, icon: <Globe size={18} />, color: "#d97706", bg: "#fef3c7" },
  ];

  const shipments = [
    { id: "SH-998", dest: "Saudi Arabia", status: t.ec_approved_status, color: "#059669", bg: "#d1fae5", eta: "2026-11-15" },
    { id: "SH-999", dest: "UAE", status: t.ec_approved_status, color: "#059669", bg: "#d1fae5", eta: "2026-11-16" },
    { id: "SH-1000", dest: "Malaysia", status: t.ec_pending_status, color: "#d97706", bg: "#fef3c7", eta: "2026-11-18" },
    { id: "SH-1001", dest: "Germany", status: t.ec_pending_status, color: "#d97706", bg: "#fef3c7", eta: "2026-11-20" },
    { id: "SH-1002", dest: "Qatar", status: t.ec_approved_status, color: "#059669", bg: "#d1fae5", eta: "2026-11-14" },
  ];

  return (
    <div className="page">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", display: "flex", alignItems: "center", gap: 8 }}>
          <Globe className="text-emerald-600" size={24} /> {t.ec_title}
        </h1>
        <p style={{ color: "#64748b", marginTop: 4, fontSize: 14 }}>{t.ec_desc}</p>
      </div>

      {/* AI Advisory Banner - HIJAU */}
      <div style={{ background: "linear-gradient(90deg, #064e3b 0%, #047857 100%)", padding: "20px 24px", borderRadius: 12, color: "white", marginBottom: 24, display: "flex", gap: 16, alignItems: "flex-start" }}>
        <Bot size={32} style={{ flexShrink: 0, opacity: 0.9 }} />
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{t.ec_ai_insight}</h3>
          <p style={{ fontSize: 14, opacity: 0.9, lineHeight: 1.5 }}>{t.ec_ai_insight_desc}</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {kpis.map((kpi, i) => (
          <div key={i} style={{ background: "white", borderRadius: 12, padding: 20, border: "1px solid #e2e8f0" }}>
            <div style={{ padding: 10, background: kpi.bg, borderRadius: 10, marginBottom: 12, width: "fit-content", color: kpi.color }}>{kpi.icon}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", marginBottom: 4 }}>{kpi.label}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#0f172a" }}>{kpi.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16 }}>
        {/* Markets */}
        <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
            <TrendingUp size={18} className="text-emerald-600" /> {t.ec_countries}
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {markets.map((m, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, background: m.bg, borderRadius: 8, border: `1px solid ${m.color}30` }}>
                <div style={{ color: m.color }}>{m.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{m.region}</div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>{m.count} {t.ec_total_shipments.toLowerCase()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipments Table */}
        <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 20 }}>{t.ec_total_shipments}</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                <th style={{ padding: "8px 0", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#64748b" }}>{t.ec_ship_id}</th>
                <th style={{ padding: "8px 0", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#64748b" }}>{t.ec_dest}</th>
                <th style={{ padding: "8px 0", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#64748b" }}>{t.ec_status}</th>
                <th style={{ padding: "8px 0", textAlign: "right", fontSize: 12, fontWeight: 600, color: "#64748b" }}>{t.ec_eta}</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((s, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "12px 0", fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{s.id}</td>
                  <td style={{ padding: "12px 0", fontSize: 13, color: "#475569" }}>{s.dest}</td>
                  <td style={{ padding: "12px 0" }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: s.color, background: s.bg, padding: "4px 10px", borderRadius: 99 }}>{s.status}</span>
                  </td>
                  <td style={{ padding: "12px 0", fontSize: 12, color: "#64748b", textAlign: "right" }}>{s.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
