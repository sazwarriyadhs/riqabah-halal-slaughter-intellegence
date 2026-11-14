"use client";
import { useState, useEffect } from "react";
import { Users, Plus } from "lucide-react";
import { translations, Language } from "@/components/commander/dictionaries";

export default function UsersPage() {
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang] || translations.en;
  useEffect(() => {
    const u = () => { const c = localStorage.getItem('app_lang') as Language; if (c && translations[c]) setLang(c); };
    u(); window.addEventListener('languageChanged', u); window.addEventListener('storage', u);
    return () => { window.removeEventListener('languageChanged', u); window.removeEventListener('storage', u); };
  }, []);

  const users = [
    { name: "Commander TC", email: "owner@riqabah.sa", role: t.us_admin, status: t.us_active, color: "#059669" },
    { name: "Ahmed Al-Sayed", email: "ahmed@riqabah.sa", role: t.us_operator, status: t.us_active, color: "#059669" },
    { name: "Fatima Hassan", email: "fatima@riqabah.sa", role: t.us_auditor, status: t.us_active, color: "#059669" },
    { name: "Khalid Ibrahim", email: "khalid@riqabah.sa", role: t.us_viewer, status: t.us_inactive, color: "#94a3b8" },
  ];

  return (
    <div className="page">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", display: "flex", alignItems: "center", gap: 8 }}>
            <Users className="text-emerald-600" size={24} /> {t.us_title}
          </h1>
          <p style={{ color: "#64748b", marginTop: 4, fontSize: 14 }}>{t.us_desc}</p>
        </div>
        <button style={{ background: "#059669", color: "white", border: "none", padding: "10px 16px", borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
          <Plus size={16} /> {t.us_add}
        </button>
      </div>

      <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
            <tr>
              {[t.us_name, t.us_email, t.us_role, t.us_status].map((h, i) => (
                <th key={i} style={{ padding: 16, textAlign: "left", fontSize: 13, fontWeight: 600, color: "#475569" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: 16, fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{u.name}</td>
                <td style={{ padding: 16, fontSize: 13, color: "#475569" }}>{u.email}</td>
                <td style={{ padding: 16, fontSize: 13, color: "#475569" }}>{u.role}</td>
                <td style={{ padding: 16 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: u.color, background: `${u.color}15`, padding: "4px 10px", borderRadius: 99 }}>{u.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
