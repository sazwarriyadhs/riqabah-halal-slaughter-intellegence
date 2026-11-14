"use client";
import { useEffect, useState } from "react";

export function LanguageSwitcher() {
  const [lang, setLang] = useState<"en" | "id" | "ar">("en");

  useEffect(() => {
    localStorage.setItem('app_lang', lang);
    window.dispatchEvent(new Event('languageChanged'));
    if (!window.hasOwnProperty("_originalTexts")) {
      const elements = document.querySelectorAll("h1, h2, h3, p, span, button, a, div");
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
        "Executive Reports": "Laporan Eksekutif",
        "Generate and download official compliance and operational reports.": "Hasilkan dan unduh laporan kepatuhan dan operasional resmi.",
        "Report ID": "ID Laporan",
        "Report From": "Laporan Dari",
        "Type": "Tipe",
        "Period": "Periode",
        "Key Metric": "Metrik Utama",
        "Status": "Status",
        "Compliant": "Patuh",
        "Minor NC": "Ketidaksesuaian Minor",
        "Archived": "Diarsipkan",
        "Back to Dashboard": "Kembali ke Dasbor",
        "Export Excel": "Ekspor Excel",
        "Export PDF": "Ekspor PDF",
        "Compliance Dept": "Dept. Kepatuhan",
        "Operations Dept": "Dept. Operasional",
        "Quality Control": "Kontrol Kualitas",
        "Traceability Team": "Tim Ketertelusuran",
        "AI Engine": "Mesin AI",
        "Operations Web": "Web Operasional",
        "Good Morning, Commander": "Selamat Pagi, Komandan",
        "Dashboard": "Dasbor",
        "Live Monitor": "Monitor Langsung",
        "Batches": "Batch Ternak",
        "Alerts": "Peringatan",
        "Slaughter Ops": "Operasi Sembelih",
        "Compliance": "Kepatuhan",
        "Analytics": "Analitik",
        "Equipment / IoT": "Peralatan / IoT",
        "CCTV & Media": "CCTV & Media",
        "Users & Roles": "Pengguna & Peran",
        "Settings": "Pengaturan",
        "Sign out": "Keluar",
        "SYSTEM STATUS": "STATUS SISTEM",
        "API": "API",
        "DATABASE": "DATABASE",
        "REGION": "WILAYAH",
        "ARRIVALS TODAY": "KEDATANGAN HARI INI",
        "SLAUGHTERED TODAY": "DISEMBELIH HARI INI",
        "HALAL COMPLIANCE": "KEPATUHAN HALAL",
        "ACTIVE SESSIONS": "SESI AKTIF",
        "No active alerts": "Tidak ada peringatan",
        "Search animals, batches, sessions...": "Cari hewan, batch, sesi...",
        "AI Overview": "Ringkasan AI",
        "AI Copilot": "AI Copilot",
        "Document Intelligence": "Kecerdasan Dokumen",
        "Risk Intelligence": "Kecerdasan Risiko",
        "Halal Copilot": "Halal Copilot",
        "Traceability Intelligence": "Kecerdasan Traceability",
        "Slaughter Intelligence": "Kecerdasan Penyembelihan",
        "Export Compliance": "Kepatuhan Ekspor",
        "AI INTELLIGENCE": "KECERDASAN AI",
        "AI Operational Insight": "Analisis Operasional AI",
        "Sistem berjalan optimal. Tidak ada alert kritis yang memerlukan tindakan segera saat ini. Operasional berjalan sesuai standar.": "Sistem berjalan optimal. Tidak ada alert kritis yang memerlukan tindakan segera saat ini. Operasional berjalan sesuai standar.",
        "Rekomendasi Tindakan AI": "Rekomendasi Tindakan AI",
        "Asisten cerdas RIQABAH untuk operasional Anda.": "Asisten cerdas RIQABAH untuk operasional Anda.",
      
      },
      "ar": {
        "Executive Reports": "التقارير التنفيذية",
        "Generate and download official compliance and operational reports.": "إنشاء وتنزيل تقارير الامتثال والعمليات الرسمية.",
        "Report ID": "معرف التقرير",
        "Report From": "تقرير من",
        "Type": "النوع",
        "Period": "الفترة",
        "Key Metric": "المقياس الرئيسي",
        "Status": "الحالة",
        "Compliant": "ممتثل",
        "Minor NC": "عدم مطابقة بسيط",
        "Archived": "مؤرشف",
        "Back to Dashboard": "العودة إلى لوحة القيادة",
        "Export Excel": "تصدير إكسل",
        "Export PDF": "تصدير PDF",
        "Compliance Dept": "قسم الامتثال",
        "Operations Dept": "قسم العمليات",
        "Quality Control": "مراقبة الجودة",
        "Traceability Team": "فريق التتبع",
        "AI Engine": "محرك الذكاء الاصطناعي",
        "Operations Web": "ويب العمليات",
        "Good Morning, Commander": "صباح الخير، أيها القائد",
        "Dashboard": "لوحة القيادة",
        "Live Monitor": "المراقبة المباشرة",
        "Batches": "دفعات الحيوانات",
        "Alerts": "التنبيهات",
        "Slaughter Ops": "عمليات الذبح",
        "Compliance": "الامتثال",
        "Analytics": "التحليلات",
        "Equipment / IoT": "المعدات / إنترنت الأشياء",
        "CCTV & Media": "كاميرات المراقبة والوسائط",
        "Users & Roles": "المستخدمين والأدوار",
        "Settings": "الإعدادات",
        "Sign out": "تسجيل الخروج",
        "SYSTEM STATUS": "حالة النظام",
        "API": "واجهة برمجة التطبيقات",
        "DATABASE": "قاعدة البيانات",
        "REGION": "المنطقة",
        "ARRIVALS TODAY": "الوصول اليوم",
        "SLAUGHTERED TODAY": "المذبوح اليوم",
        "HALAL COMPLIANCE": "الامتثال الحلال",
        "ACTIVE SESSIONS": "الجلسات النشطة",
        "No active alerts": "لا توجد تنبيهات نشطة",
        "Search animals, batches, sessions...": "ابحث عن الحيوانات، الدفعات، الجلسات...",
        "AI Overview": "نظرة عامة على الذكاء الاصطناعي",
        "AI Copilot": "مساعد الذكاء الاصطناعي",
        "Document Intelligence": "ذكاء الوثائق",
        "Risk Intelligence": "ذكاء المخاطر",
        "Halal Copilot": "مساعد الحلال",
        "Traceability Intelligence": "ذكاء التتبع",
        "Slaughter Intelligence": "ذكاء الذبح",
        "Export Compliance": "الامتثال للتصدير",
        "AI INTELLIGENCE": "الذكاء الاصطناعي",
        "AI Operational Insight": "التحليل التشغيلي للذكاء الاصطناعي",
        "Sistem berjalan optimal. Tidak ada alert kritis yang memerlukan tindakan segera saat ini. Operasional berjalan sesuai standar.": "النظام يعمل بشكل مثالي. لا توجد تنبيهات حرجة تتطلب إجراءً فوريًا. العمليات تسير وفقًا للمعايير.",
        "Rekomendasi Tindakan AI": "توصيات إجراءات الذكاء الاصطناعي",
        "Asisten cerdas RIQABAH untuk operasional Anda.": "مساعد RIQABAH الذكي لعملياتك.",
      
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
    <div style={{ display: "flex", gap: "2px", background: "#f3f4f6", padding: "4px", borderRadius: "8px" }}>
      <button onClick={() => setLang("en")} style={{ padding: "6px 10px", borderRadius: "6px", background: lang === "en" ? "#07553A" : "transparent", color: lang === "en" ? "#fff" : "#6b7280", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "12px" }}>EN</button>
      <button onClick={() => setLang("id")} style={{ padding: "6px 10px", borderRadius: "6px", background: lang === "id" ? "#07553A" : "transparent", color: lang === "id" ? "#fff" : "#6b7280", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "12px" }}>ID</button>
      <button onClick={() => setLang("ar")} style={{ padding: "6px 10px", borderRadius: "6px", background: lang === "ar" ? "#07553A" : "transparent", color: lang === "ar" ? "#fff" : "#6b7280", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "12px" }}>AR</button>
    </div>
  );
}







