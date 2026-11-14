"use client";
import { useState, useEffect, useRef } from "react";
import { ShieldCheck, Send, User, Sparkles } from "lucide-react";
import { translations, Language } from "@/components/commander/dictionaries";

export default function HalalCopilotPage() {
  const [lang, setLang] = useState<Language>('en');
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = translations[lang] || translations.en;

  useEffect(() => {
    const u = () => { const c = localStorage.getItem('app_lang') as Language; if (c && translations[c]) setLang(c); };
    u();
    window.addEventListener('languageChanged', u);
    window.addEventListener('storage', u);
    return () => { window.removeEventListener('languageChanged', u); window.removeEventListener('storage', u); };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (textOverride?: string) => {
    const msg = textOverride || input;
    if (!msg.trim() || isLoading) return;
    
    setMessages(p => [...p, { role: "user", content: msg }]);
    setInput(""); 
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    
    let reply = t.hc_welcome;
    const low = msg.toLowerCase();
    
    if (low.includes("sertifikat") || low.includes("certificate") || low.includes("شهادة")) {
      reply = lang === 'id' ? "Sertifikat halal untuk Batch #B-2026-11-12 telah diverifikasi oleh Saudi Halal Authority (SHA). Berlaku hingga 12 November 2027. Semua dokumen lengkap." : 
              lang === 'ar' ? "تم التحقق من شهادة الحلال للدفعة #B-2026-11-12 من قبل هيئة الحلال السعودية. صالحة حتى 12 نوفمبر 2027. جميع الوثائق مكتملة." : 
              "Halal certificate for Batch #B-2026-11-12 verified by Saudi Halal Authority (SHA). Valid until 12 November 2027. All documents complete.";
    } else if (low.includes("expired") || low.includes("kadaluwarsa") || low.includes("انتهاء")) {
      reply = lang === 'id' ? "Ada 2 sertifikat yang akan kadaluwarsa dalam 30 hari: Batch #B-2026-10-05 (5 hari lagi) dan Batch #B-2026-10-20 (18 hari lagi). Segera lakukan renewal." :
              lang === 'ar' ? "هناك شهادتان ستنتهي صلاحيتهما خلال 30 يومًا: الدفعة #B-2026-10-05 (5 أيام) والدفعة #B-2026-10-20 (18 يومًا). يرجى التجديد فورًا." :
              "There are 2 certificates expiring within 30 days: Batch #B-2026-10-05 (5 days left) and Batch #B-2026-10-20 (18 days left). Please renew soon.";
    } else if (low.includes("audit") || low.includes("jadwal") || low.includes("تدقيق")) {
      reply = lang === 'id' ? "Audit halal berikutnya dijadwalkan pada 25 November 2026. Pastikan semua batch memiliki sertifikat valid dan catatan penyembelihan lengkap. Tim Halal Assurance siap membantu." :
              lang === 'ar' ? "من المقرر إجراء التدقيق الحلال التالي في 25 نوفمبر 2026. تأكد من أن جميع الدفعات لديها شهادات صالحة وسجلات ذبح كاملة." :
              "Next halal audit scheduled on 25 November 2026. Ensure all batches have valid certificates and complete slaughter records.";
    } else if (low.includes("batch") || low.includes("دفعة")) {
      reply = lang === 'id' ? "Batch #B-2026-11-12 saat ini berstatus 'Completed'. Sertifikat halal sudah valid, log penyembelihan lengkap, dan traceability terverifikasi. Aman untuk ekspor." :
              lang === 'ar' ? "الدفعة #B-2026-11-12 حاليًا بحالة 'مكتمل'. شهادة الحلال صالحة، سجل الذبح مكتمل، والتتبع تم التحقق منه. آمنة للتصدير." :
              "Batch #B-2026-11-12 is currently 'Completed'. Halal certificate is valid, slaughter log is complete, and traceability is verified. Safe for export.";
    } else {
      reply = lang === 'id' ? "Saya Halal Copilot, spesialis sertifikasi & kepatuhan halal. Saya bisa membantu: cek sertifikat batch, daftar sertifikat akan expired, syarat audit halal, atau verifikasi dokumen." :
              lang === 'ar' ? "أنا مساعد الحلال، متخصص في الشهادات والامتثال. يمكنني المساعدة في: التحقق من الشهادات، قائمة الشهادات المنتهية، متطلبات التدقيق." :
              "I am Halal Copilot, specialized in halal certification & compliance. I can help: check batch certificate, list expiring certificates, halal audit requirements, or verify documents.";
    }
    
    setMessages(p => [...p, { role: "assistant", content: reply }]);
    setIsLoading(false);
  };

  const suggestions = lang === 'id' ? [
    "Cek sertifikat Batch #B-2026-11-12",
    "Daftar sertifikat akan kadaluwarsa",
    "Syarat audit halal JAKIM",
    "Verifikasi dokumen batch terbaru"
  ] : lang === 'ar' ? [
    "التحقق من شهادة الدفعة #B-2026-11-12",
    "قائمة الشهادات المنتهية",
    "متطلبات التدقيق الحلال",
    "التحقق من أحدث وثائق الدفعة"
  ] : [
    "Check certificate for Batch #B-2026-11-12",
    "List expiring certificates",
    "Halal audit requirements",
    "Verify latest batch documents"
  ];

  return (
    <div className="page" style={{ height: "calc(100vh - 100px)", display: "flex", flexDirection: "column" }}>
      {/* Header HIJAU (sebelumnya emas) */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div style={{ padding: 10, background: "#d1fae5", borderRadius: 12 }}>
          <ShieldCheck size={24} style={{ color: "#059669" }} />
        </div>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a" }}>{t.hc_title}</h1>
          <p style={{ fontSize: 13, color: "#64748b" }}>{t.hc_desc}</p>
        </div>
      </div>

      <div style={{ flex: 1, background: "white", borderRadius: 12, border: "1px solid #d1fae5", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ flex: 1, overflowY: "auto", padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
          
          {/* Pesan Sambutan - HIJAU */}
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#d1fae5", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <ShieldCheck size={20} />
            </div>
            <div style={{ maxWidth: "75%", padding: "12px 16px", borderRadius: 12, borderTopLeftRadius: 4, background: "#f0fdf4", border: "1px solid #d1fae5", color: "#1e293b", fontSize: 14, lineHeight: 1.6 }}>
              {t.hc_welcome}
            </div>
          </div>

          {/* Suggestion Chips - HIJAU */}
          {messages.length === 0 && (
            <div style={{ marginLeft: 52, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(s)}
                  style={{ padding: "8px 14px", background: "#f0fdf4", border: "1px solid #a7f3d0", borderRadius: 20, fontSize: 13, color: "#065f46", cursor: "pointer", fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}
                >
                  <Sparkles size={12} /> {s}
                </button>
              ))}
            </div>
          )}

          {/* Chat Messages */}
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", gap: 16, flexDirection: m.role === "user" ? "row-reverse" : "row" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: m.role === "user" ? "#0f172a" : "#d1fae5", color: m.role === "user" ? "white" : "#059669", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {m.role === "user" ? <User size={18} /> : <ShieldCheck size={20} />}
              </div>
              <div style={{ maxWidth: "75%", padding: "12px 16px", borderRadius: 12, borderTopLeftRadius: m.role === "assistant" ? 4 : 12, borderTopRightRadius: m.role === "user" ? 4 : 12, background: m.role === "user" ? "#f8fafc" : "#f0fdf4", border: m.role === "user" ? "1px solid #e2e8f0" : "1px solid #d1fae5", color: "#1e293b", fontSize: 14, lineHeight: 1.6 }}>
                {m.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div style={{ display: "flex", gap: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#d1fae5", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ShieldCheck size={20} />
              </div>
              <div style={{ padding: "12px 16px", borderRadius: 12, background: "#f0fdf4", border: "1px solid #d1fae5", color: "#059669", display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#059669", animation: "pulse 1s infinite" }}></span>
                {lang === 'id' ? "Memverifikasi dokumen halal..." : lang === 'ar' ? "التحقق من وثائق الحلال..." : "Verifying halal documents..."}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area - HIJAU */}
        <div style={{ padding: 16, borderTop: "1px solid #d1fae5", background: "#f0fdf4" }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-end", background: "white", padding: 8, borderRadius: 12, border: "1px solid #d1fae5" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={t.hc_placeholder}
              style={{ flex: 1, border: "none", outline: "none", padding: "10px 12px", fontSize: 14, background: "transparent" }}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              style={{ padding: "10px 16px", background: input.trim() && !isLoading ? "#059669" : "#cbd5e1", color: "white", border: "none", borderRadius: 8, cursor: input.trim() && !isLoading ? "pointer" : "not-allowed", display: "flex", alignItems: "center", gap: 6, fontWeight: 600 }}
            >
              <Send size={16} /> {t.hc_send}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
