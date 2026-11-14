"use client";
import { useState, useEffect } from "react";
import { ClipboardCheck, Plus } from "lucide-react";
import { translations, Language } from "@/components/commander/dictionaries";

export default function SlaughterOpsPage() {
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang] || translations.en;
  useEffect(() => {
    const u = () => { const c = localStorage.getItem('app_lang') as Language; if (c && translations[c]) setLang(c); };
    u(); window.addEventListener('languageChanged', u); window.addEventListener('storage', u);
    return () => { window.removeEventListener('languageChanged', u); window.removeEventListener('storage', u); };
  }, []);
  const sessions = [
    { id: "SES-001", date: "2026-11-12", line: "Line A", status: t.so_active, color: "#059669", count: 45, total: 120 },
    { id: "SES-002", date: "2026-11-12", line: "Line B", status: t.so_completed, color: "#3b82f6", count: 100, total: 100 },
    { id: "SES-003", date: "2026-11-12", line: "Line C", status: t.so_pending, color: "#d97706", count: 0, total: 80 },
  ];
  return (
    <div className="page">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", display: "flex", alignItems: "center", gap: 8 }}><ClipboardCheck className="text-emerald-600" size={24} /> {t.so_title}</h1>
          <p style={{ color: "#64748b", marginTop: 4, fontSize: 14 }}>{t.so_desc}</p>
        </div>
        <button style={{ background: "#059669", color: "white", border: "none", padding: "10px 16px", borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}><Plus size={16} /> {t.so_new}</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
        {sessions.map((s, i) => (
          <div key={i} style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div><div style={{ fontSize: 11, color: "#64748b", fontWeight: 600 }}>{s.id}</div><div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginTop: 2 }}>{s.line}</div></div>
              <span style={{ fontSize: 11, fontWeight: 600, color: s.color, background: `${s.color}15`, padding: "4px 10px", borderRadius: 99 }}>{s.status}</span>
            </div>
            <div style={{ fontSize: 12, color: "#64748b", marginBottom: 8 }}>{s.date}</div>
            <div style={{ height: 6, background: "#f1f5f9", borderRadius: 3, overflow: "hidden", marginBottom: 8 }}>
              <div style={{ height: "100%", width: `${(s.count / s.total) * 100}%`, background: s.color, transition: "width 0.3s" }}></div>
            </div>
            <div style={{ fontSize: 12, color: "#64748b" }}>{s.count} / {s.total} {t.so_animals}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
