"use client";
import { useState, useEffect } from "react";
import { Settings, Save } from "lucide-react";
import { translations, Language } from "@/components/commander/dictionaries";

export default function SettingsPage() {
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
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", display: "flex", alignItems: "center", gap: 8 }}><Settings className="text-emerald-600" size={24} /> {t.se_title}</h1>
        <p style={{ color: "#64748b", marginTop: 4, fontSize: 14 }}>{t.se_desc}</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
        {[
          { title: t.se_general, items: [{ label: t.se_company, value: "RIQABAH Halal Slaughter" }, { label: t.se_language, value: "EN / ID / AR" }] },
          { title: t.se_notifications, items: [{ label: "Email Alerts", value: "Enabled" }, { label: "SMS Alerts", value: "Disabled" }] },
          { title: t.se_security, items: [{ label: "Two-Factor Auth", value: "Enabled" }, { label: "Session Timeout", value: "15 min" }] },
        ].map((section, i) => (
          <div key={i} style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>{section.title}</h3>
            {section.items.map((item, j) => (
              <div key={j} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: j === section.items.length - 1 ? "none" : "1px solid #f1f5f9" }}>
                <span style={{ fontSize: 13, color: "#475569" }}>{item.label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{item.value}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}>
        <button style={{ background: "#059669", color: "white", border: "none", padding: "12px 24px", borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
          <Save size={16} /> {t.se_save}
        </button>
      </div>
    </div>
  );
}
