"use client";
import { useState, useEffect } from "react";
import { ShieldAlert, Eye, CheckCircle2 } from "lucide-react";
import { translations, Language } from "@/components/commander/dictionaries";

export default function RiskIntelligencePage() {
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang] || translations.en;
  useEffect(() => {
    const u = () => { const c = localStorage.getItem('app_lang') as Language; if (c && translations[c]) setLang(c); };
    u();
    window.addEventListener('languageChanged', u);
    window.addEventListener('storage', u);
    return () => { window.removeEventListener('languageChanged', u); window.removeEventListener('storage', u); };
  }, []);

  const risks = [
    { id: "RSK-001", cat: t.ri_coldchain, desc: t.ri_item1, sev: t.ri_critical, color: "#ef4444", status: t.ri_open },
    { id: "RSK-002", cat: t.ri_halal, desc: t.ri_item2, sev: t.ri_high, color: "#f97316", status: t.ri_open },
    { id: "RSK-003", cat: t.ri_equipment, desc: t.ri_item3, sev: t.ri_medium, color: "#eab308", status: t.ri_mitigated },
    { id: "RSK-004", cat: t.ri_trace, desc: t.ri_item4, sev: t.ri_low, color: "#3b82f6", status: t.ri_mitigated },
  ];

  return (
    <div className="page">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", display: "flex", alignItems: "center", gap: 8 }}>
          <ShieldAlert className="text-emerald-600" size={24} /> {t.ri_title}
        </h1>
        <p style={{ color: "#64748b", marginTop: 4, fontSize: 14 }}>{t.ri_desc}</p>
      </div>
      <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
            <tr>
              {[t.ri_id, t.ri_category, t.ri_desc_col, t.ri_severity, t.ri_status, t.ri_action].map((h) => (
                <th key={h} style={{ padding: 16, fontSize: 13, fontWeight: 600, color: "#475569" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {risks.map((r, i) => (
              <tr key={r.id} style={{ borderBottom: i === risks.length - 1 ? "none" : "1px solid #e2e8f0" }}>
                <td style={{ padding: 16, fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{r.id}</td>
                <td style={{ padding: 16, fontSize: 13, color: "#475569" }}>{r.cat}</td>
                <td style={{ padding: 16, fontSize: 13, color: "#475569" }}>{r.desc}</td>
                <td style={{ padding: 16 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: r.color, background: `${r.color}15`, padding: "4px 10px", borderRadius: 99 }}>{r.sev}</span>
                </td>
                <td style={{ padding: 16 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 500, color: r.status === t.ri_open ? "#dc2626" : "#059669" }}>
                    {r.status === t.ri_open ? <ShieldAlert size={14} /> : <CheckCircle2 size={14} />} {r.status}
                  </span>
                </td>
                <td style={{ padding: 16 }}>
                  <button style={{ background: "none", border: "none", color: "#059669", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600 }}>
                    <Eye size={14} /> {t.ri_view}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
