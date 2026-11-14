"use client";
import { useEffect, useState } from "react";

export function LanguageSwitcher() {
  const [lang, setLang] = useState<"en" | "id" | "ar">("en");

  useEffect(() => {
    if (!window.hasOwnProperty("_originalTexts")) {
      const elements = document.querySelectorAll("h1, h2, h3, p, span, button, a, div, td, th");
      const originals = new Map();
      elements.forEach(el => {
        if (el.children.length === 0 && el.textContent?.trim()) {
          originals.set(el, el.textContent);
        }
      });
      (window as any)._originalTexts = originals;
    }

    const originals = (window as any)._originalTexts as Map<Element, string>;

    const dictionary: Record<string, Record<string, string>> = {
      "id": {
        "Dashboard": "Dasbor",
        "Audits": "Audit",
        "Evidence": "Bukti",
        "Findings": "Temuan",
        "Corrective Actions": "Tindakan Korektif",
        "Verification": "Verifikasi",
        "Traceability": "Ketertelusuran",
        "Audit Trail": "Jejak Audit",
        "Operations": "Operasional",
        "Facilities": "Fasilitas",
        "Slaughter Sessions": "Sesi Sembelih",
        "System": "Sistem",
        "Notifications": "Notifikasi",
        "Settings": "Pengaturan",
        "Good Morning, Auditor": "Selamat Pagi, Auditor",
        "Halal audit and assurance command workspace. Monitor assessments, evidence, findings, corrective actions and traceability from one place.": "Ruang kerja komando audit dan jaminan halal. Pantau penilaian, bukti, temuan, tindakan korektif, dan ketertelusuran dari satu tempat.",
        "ASSESSMENTS": "PENILAIAN",
        "OPEN FINDINGS": "TEMUAN TERBUKA",
        "EVIDENCE": "BUKTI",
        "ASSURANCE STATUS": "STATUS JAMINAN",
        "OPEN CAPA": "CAPA TERBUKA",
        "CAPA VERIFICATION": "VERIFIKASI CAPA",
        "TRACEABILITY": "KETERTELUSURAN",
        "AI RISK ASSESSMENTS": "PENILAIAN RISIKO AI",
        "Attention": "Perhatian",
        "Required": "Diperlukan",
        "SYSTEM STATUS": "STATUS SISTEM",
        "Connected": "Terhubung",
        "PostgreSQL 17": "PostgreSQL 17",
        "SA · Asia/Riyadh": "SA · Asia/Riyadh",
        "Sign out": "Keluar",
        "Search audits, facilities, findings...": "Cari audit, fasilitas, temuan...",
        "AUDITOR · SA · Asia/Riyadh": "AUDITOR · SA · Asia/Riyadh",
        "Module Ready": "Modul Siap",
        "This module is ready for live data integration.": "Modul ini siap untuk integrasi data langsung."
      },
      "ar": {
        "Dashboard": "لوحة القيادة",
        "Audits": "التدقيق",
        "Evidence": "الأدلة",
        "Findings": "النتائج",
        "Corrective Actions": "الإجراءات التصحيحية",
        "Verification": "التحقق",
        "Traceability": "التتبع",
        "Audit Trail": "مسار التدقيق",
        "Operations": "العمليات",
        "Facilities": "المرافق",
        "Slaughter Sessions": "جلسات الذبح",
        "System": "النظام",
        "Notifications": "الإشعارات",
        "Settings": "الإعدادات",
        "Good Morning, Auditor": "صباح الخير، أيها المدقق",
        "Halal audit and assurance command workspace. Monitor assessments, evidence, findings, corrective actions and traceability from one place.": "مساحة عمل قيادة التدقيق وضمان الحلال. راقب التقييمات والأدلة والنتائج والإجراءات التصحيحية والتتبع من مكان واحد.",
        "ASSESSMENTS": "التقييمات",
        "OPEN FINDINGS": "النتائج المفتوحة",
        "EVIDENCE": "الأدلة",
        "ASSURANCE STATUS": "حالة الضمان",
        "OPEN CAPA": "CAPA المفتوحة",
        "CAPA VERIFICATION": "التحقق من CAPA",
        "TRACEABILITY": "التتبع",
        "AI RISK ASSESSMENTS": "تقييمات مخاطر الذكاء الاصطناعي",
        "Attention": "انتباه",
        "Required": "مطلوب",
        "SYSTEM STATUS": "حالة النظام",
        "Connected": "متصل",
        "PostgreSQL 17": "PostgreSQL 17",
        "SA · Asia/Riyadh": "SA · Asia/Riyadh",
        "Sign out": "تسجيل الخروج",
        "Search audits, facilities, findings...": "ابحث عن التدقيقات والمرافق والنتائج...",
        "AUDITOR · SA · Asia/Riyadh": "المدقق · SA · آسيا/الرياض",
        "Module Ready": "الوحدة جاهزة",
        "This module is ready for live data integration.": "هذه الوحدة جاهزة لتكامل البيانات المباشرة."
      }
    };

    originals.forEach((originalText, el) => {
      if (lang === "en") {
        el.textContent = originalText;
      } else {
        const translated = dictionary[lang]?.[originalText.trim()];
        if (translated) el.textContent = translated;
      }
    });
  }, [lang]);

  return (
    <div style={{ display: "flex", gap: "2px", background: "#f3f4f6", padding: "4px", borderRadius: "8px", marginRight: "12px" }}>
      <button onClick={() => setLang("en")} style={{ padding: "6px 10px", borderRadius: "6px", background: lang === "en" ? "#07553A" : "transparent", color: lang === "en" ? "#fff" : "#6b7280", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "12px" }}>EN</button>
      <button onClick={() => setLang("id")} style={{ padding: "6px 10px", borderRadius: "6px", background: lang === "id" ? "#07553A" : "transparent", color: lang === "id" ? "#fff" : "#6b7280", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "12px" }}>ID</button>
      <button onClick={() => setLang("ar")} style={{ padding: "6px 10px", borderRadius: "6px", background: lang === "ar" ? "#07553A" : "transparent", color: lang === "ar" ? "#fff" : "#6b7280", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "12px" }}>AR</button>
    </div>
  );
}
