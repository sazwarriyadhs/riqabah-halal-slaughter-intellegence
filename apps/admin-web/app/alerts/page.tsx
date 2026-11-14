"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { translations, Language } from "@/components/commander/dictionaries";

export default function AlertsPage() {
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

  const alerts = [
    { id: "ALT-001", title: t.a_alert_1, desc: t.a_alert_1_desc, severity: t.a_critical, color: "#dc2626", status: t.a_open },
    { id: "ALT-002", title: t.a_alert_2, desc: t.a_alert_2_desc, severity: t.a_high, color: "#f97316", status: t.a_open },
    { id: "ALT-003", title: t.a_alert_3, desc: t.a_alert_3_desc, severity: t.a_medium, color: "#eab308", status: t.a_resolved },
  ];

  return (
    <div className="page">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", display: "flex", alignItems: "center", gap: 8 }}>
          <AlertTriangle className="text-emerald-600" size={24} /> {t.a_title}
        </h1>
        <p style={{ color: "#64748b", marginTop: 4, fontSize: 14 }}>{t.a_desc}</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {alerts.map((alert, i) => (
          <div key={i} style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", padding: 20, display: "flex", gap: 16, borderLeft: `4px solid ${alert.color}` }}>
            <div style={{ padding: 10, background: `${alert.color}15`, borderRadius: 8, height: "fit-content" }}>
              <AlertTriangle size={20} style={{ color: alert.color }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#64748b", marginBottom: 4 }}>{alert.id}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>{alert.title}</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: alert.color, background: `${alert.color}15`, padding: "4px 10px", borderRadius: 99 }}>{alert.severity}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: alert.status === t.a_open ? "#dc2626" : "#059669", background: alert.status === t.a_open ? "#fee2e2" : "#d1fae5", padding: "4px 10px", borderRadius: 99 }}>
                    {alert.status === t.a_open ? <Clock size={10} style={{ display: "inline", marginRight: 4 }} /> : <CheckCircle2 size={10} style={{ display: "inline", marginRight: 4 }} />}
                    {alert.status}
                  </span>
                </div>
              </div>
              <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5 }}>{alert.desc}</div>
              {alert.status === t.a_open && (
                <button style={{ marginTop: 12, background: "#059669", color: "white", border: "none", padding: "6px 14px", borderRadius: 6, fontWeight: 600, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                  <CheckCircle2 size={12} /> {t.a_mark_resolved}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
