"use client";
import { useState, useEffect } from "react";
import { ShieldCheck, CheckCircle2, AlertTriangle, Clock } from "lucide-react";
import { translations, Language } from "@/components/commander/dictionaries";

export default function CompliancePage() {
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang] || translations.en;
  useEffect(() => {
    const u = () => { const c = localStorage.getItem('app_lang') as Language; if (c && translations[c]) setLang(c); };
    u(); window.addEventListener('languageChanged', u); window.addEventListener('storage', u);
    return () => { window.removeEventListener('languageChanged', u); window.removeEventListener('storage', u); };
  }, []);
  const kpis = [
    { label: t.co_checks_today, value: "0", icon: <ClipboardIcon />, color: "#059669", bg: "#d1fae5" },
    { label: t.co_passed, value: "0", icon: <CheckCircle2 size={20} />, color: "#059669", bg: "#d1fae5" },
    { label: t.co_failed, value: "0", icon: <AlertTriangle size={20} />, color: "#dc2626", bg: "#fee2e2" },
    { label: t.co_pending, value: "0", icon: <Clock size={20} />, color: "#d97706", bg: "#fef3c7" },
  ];
  const logs = [
    { id: "CHK-001", type: "Slaughter Pre-check", result: "Passed", color: "#059669", time: "10:00" },
    { id: "CHK-002", type: "Equipment Sanitation", result: "Passed", color: "#059669", time: "09:30" },
    { id: "CHK-003", type: "Cold Chain Verification", result: "Failed", color: "#dc2626", time: "09:00" },
  ];
  return (
    <div className="page">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", display: "flex", alignItems: "center", gap: 8 }}><ShieldCheck className="text-emerald-600" size={24} /> {t.co_title}</h1>
        <p style={{ color: "#64748b", marginTop: 4, fontSize: 14 }}>{t.co_desc}</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {kpis.map((k, i) => (
          <div key={i} style={{ background: "white", borderRadius: 12, padding: 20, border: "1px solid #e2e8f0" }}>
            <div style={{ padding: 10, background: k.bg, borderRadius: 10, marginBottom: 12, width: "fit-content", color: k.color }}>{k.icon}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", marginBottom: 4 }}>{k.label}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#0f172a" }}>{k.value}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", padding: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 20 }}>{t.co_log_title}</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ borderBottom: "1px solid #e2e8f0" }}>
            <th style={{ padding: "10px 0", textAlign: "left", fontSize: 12, color: "#64748b" }}>{t.co_log_id}</th>
            <th style={{ padding: "10px 0", textAlign: "left", fontSize: 12, color: "#64748b" }}>{t.co_log_type}</th>
            <th style={{ padding: "10px 0", textAlign: "left", fontSize: 12, color: "#64748b" }}>{t.co_log_result}</th>
            <th style={{ padding: "10px 0", textAlign: "right", fontSize: 12, color: "#64748b" }}>{t.co_log_time}</th>
          </tr></thead>
          <tbody>{logs.map((l, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
              <td style={{ padding: "12px 0", fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{l.id}</td>
              <td style={{ padding: "12px 0", fontSize: 13, color: "#475569" }}>{l.type}</td>
              <td style={{ padding: "12px 0" }}><span style={{ fontSize: 11, fontWeight: 600, color: l.color, background: `${l.color}15`, padding: "4px 10px", borderRadius: 99 }}>{l.result}</span></td>
              <td style={{ padding: "12px 0", textAlign: "right", fontSize: 12, color: "#64748b" }}>{l.time}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
function ClipboardIcon() { return <ShieldCheck size={20} />; }
