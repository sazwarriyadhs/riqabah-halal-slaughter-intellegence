"use client";

import { useEffect, useState } from "react";
import { Package, Search, Plus, Eye } from "lucide-react";
import { translations, Language } from "@/components/commander/dictionaries";

export default function BatchesPage() {
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

  const batches = [
    { id: "B-2026-11-12", date: "2026-11-12", origin: "Al-Baraka Farms", count: 120, status: t.b_completed, color: "#059669" },
    { id: "B-2026-11-11", date: "2026-11-11", origin: "Green Valley Ranch", count: 85, status: t.b_in_process, color: "#eab308" },
    { id: "B-2026-11-10", date: "2026-11-10", origin: "Sunrise Livestock", count: 150, status: t.b_completed, color: "#059669" },
    { id: "B-2026-11-09", date: "2026-11-09", origin: "Al-Baraka Farms", count: 95, status: t.b_pending, color: "#3b82f6" },
    { id: "B-2026-11-08", date: "2026-11-08", origin: "Desert Oasis Farm", count: 200, status: t.b_completed, color: "#059669" },
  ];

  return (
    <div className="page">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", display: "flex", alignItems: "center", gap: 8 }}>
            <Package className="text-emerald-600" size={24} /> {t.b_title}
          </h1>
          <p style={{ color: "#64748b", marginTop: 4, fontSize: 14 }}>{t.b_desc}</p>
        </div>
        <button style={{ background: "#059669", color: "white", border: "none", padding: "10px 16px", borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
          <Plus size={16} /> {t.b_new}
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", background: "white", border: "1px solid #e2e8f0", borderRadius: 8, padding: "0 16px", marginBottom: 16 }}>
        <Search size={18} className="text-slate-400" />
        <input type="text" placeholder={t.b_search} style={{ flex: 1, border: "none", outline: "none", padding: 12, fontSize: 14 }} />
      </div>

      <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
            <tr>
              <th style={{ padding: 16, textAlign: "left", fontSize: 13, fontWeight: 600, color: "#475569" }}>{t.b_id}</th>
              <th style={{ padding: 16, textAlign: "left", fontSize: 13, fontWeight: 600, color: "#475569" }}>{t.b_date}</th>
              <th style={{ padding: 16, textAlign: "left", fontSize: 13, fontWeight: 600, color: "#475569" }}>{t.b_origin}</th>
              <th style={{ padding: 16, textAlign: "right", fontSize: 13, fontWeight: 600, color: "#475569" }}>{t.b_count}</th>
              <th style={{ padding: 16, textAlign: "left", fontSize: 13, fontWeight: 600, color: "#475569" }}>{t.b_status}</th>
              <th style={{ padding: 16, textAlign: "left", fontSize: 13, fontWeight: 600, color: "#475569" }}>{t.b_action}</th>
            </tr>
          </thead>
          <tbody>
            {batches.map((b, i) => (
              <tr key={i} style={{ borderBottom: i === batches.length - 1 ? "none" : "1px solid #e2e8f0" }}>
                <td style={{ padding: 16, fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{b.id}</td>
                <td style={{ padding: 16, fontSize: 13, color: "#475569" }}>{b.date}</td>
                <td style={{ padding: 16, fontSize: 13, color: "#475569" }}>{b.origin}</td>
                <td style={{ padding: 16, textAlign: "right", fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{b.count}</td>
                <td style={{ padding: 16 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: b.color, background: `${b.color}15`, padding: "4px 10px", borderRadius: 99 }}>{b.status}</span>
                </td>
                <td style={{ padding: 16 }}>
                  <button style={{ background: "none", border: "none", color: "#059669", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600 }}>
                    <Eye size={14} /> {t.b_view}
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
