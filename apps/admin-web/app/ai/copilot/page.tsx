"use client";
import { useState, useEffect } from "react";
import { Bot, Send, User, Sparkles } from "lucide-react";
import { translations, Language } from "@/components/commander/dictionaries";

export default function AICopilotPage() {
  const [lang, setLang] = useState<Language>('en');
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const t = translations[lang] || translations.en;

  useEffect(() => {
    const u = () => { const c = localStorage.getItem('app_lang') as Language; if (c && translations[c]) setLang(c); };
    u();
    window.addEventListener('languageChanged', u);
    window.addEventListener('storage', u);
    return () => { window.removeEventListener('languageChanged', u); window.removeEventListener('storage', u); };
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    setMessages(p => [...p, { role: "user", content: input }]);
    setInput(""); setIsLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    let reply = t.demo_reply;
    const low = input.toLowerCase();
    if (low.includes("halal")) reply = t.halal_reply;
    else if (low.includes("alert")) reply = t.alert_reply;
    else if (low.includes("batch")) reply = t.batch_reply;
    setMessages(p => [...p, { role: "assistant", content: reply }]);
    setIsLoading(false);
  };

  return (
    <div className="page" style={{ height: "calc(100vh - 100px)", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div style={{ padding: 10, background: "#ecfdf5", borderRadius: 12 }}><Sparkles className="text-emerald-600" size={24} /></div>
        <div><h1 style={{ fontSize: 20, fontWeight: 700 }}>{t.ai_copilot_title}</h1><p style={{ fontSize: 13, color: "#64748b" }}>{t.ai_copilot_desc}</p></div>
      </div>
      <div style={{ flex: 1, background: "white", borderRadius: 12, border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ flex: 1, overflowY: "auto", padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#ecfdf5", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center" }}><Bot size={20} /></div>
            <div style={{ maxWidth: "75%", padding: "12px 16px", borderRadius: 12, borderTopLeftRadius: 4, background: "white", border: "1px solid #ecfdf5", fontSize: 14 }}>{t.welcome_msg}</div>
          </div>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", gap: 16, flexDirection: m.role === "user" ? "row-reverse" : "row" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: m.role === "user" ? "#0f172a" : "#ecfdf5", color: m.role === "user" ? "white" : "#059669", display: "flex", alignItems: "center", justifyContent: "center" }}>{m.role === "user" ? <User size={18} /> : <Bot size={20} />}</div>
              <div style={{ maxWidth: "75%", padding: "12px 16px", borderRadius: 12, background: m.role === "user" ? "#f8fafc" : "white", border: "1px solid #e2e8f0", fontSize: 14 }}>{m.content}</div>
            </div>
          ))}
          {isLoading && <div style={{ fontSize: 13, color: "#64748b" }}>{t.ai_analyzing}</div>}
        </div>
        <div style={{ padding: 16, borderTop: "1px solid #e2e8f0", background: "#f8fafc" }}>
          <div style={{ display: "flex", gap: 12, background: "white", padding: 8, borderRadius: 12, border: "1px solid #e2e8f0" }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSend()} placeholder={t.placeholder_chat} style={{ flex: 1, border: "none", outline: "none", padding: "8px 12px", fontSize: 14 }} />
            <button onClick={handleSend} disabled={!input.trim() || isLoading} style={{ padding: "10px 16px", background: "#059669", color: "white", border: "none", borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontWeight: 600 }}><Send size={16} /> {t.send_btn}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
