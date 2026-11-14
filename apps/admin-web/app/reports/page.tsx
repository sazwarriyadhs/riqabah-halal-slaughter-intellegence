"use client";

import { useState, useEffect } from "react";
import { FileCheck2, Plus, Download, FileText, Inbox, Send, CheckCircle2, Clock, X, Loader2 } from "lucide-react";
import { translations, Language } from "@/components/commander/dictionaries";
import { generateReportPDF } from "@/lib/reportTemplate";

type ReportStatus = "pending" | "processing" | "ready" | "delivered";

type Report = {
  id: string;
  name: string;
  type: string;
  source: string;
  sourceColor: string;
  date: string;
  status: ReportStatus;
  requestedBy?: string;
};

const APP_COLORS: Record<string, string> = {
  "Auditor Web": "#2563eb",
  "Operations Web": "#d97706",
  "Surveillance Web": "#7c3aed",
  "Public Verification": "#0d9488",
  "Mobile App": "#dc2626",
  "Commander": "#059669",
};

const REPORT_TYPES_BY_APP: Record<string, string[]> = {
  "Auditor Web": ["Compliance", "Audit Trail", "Certification", "Non-Conformance"],
  "Operations Web": ["Operational", "Production", "Cold Chain", "Export", "Line Performance"],
  "Surveillance Web": ["Security", "Sensor Alert", "Device Uptime", "Anomaly Detection"],
  "Public Verification": ["Verification Traffic", "Certificate Scan", "Public Inquiry", "Fraud Detection"],
  "Mobile App": ["Field Visit", "Mobile Inspection", "Photo Evidence", "GPS Tracking"],
  "Commander": ["Executive", "System Health", "User Activity", "Alert Summary"],
};

const APP_LIST = Object.keys(REPORT_TYPES_BY_APP);

export default function ReportsPage() {
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang] || translations.en;
  const [activeTab, setActiveTab] = useState<"inbox" | "request" | "outbox">("inbox");
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    const u = () => { const c = localStorage.getItem('app_lang') as Language; if (c && translations[c]) setLang(c); };
    u(); window.addEventListener('languageChanged', u); window.addEventListener('storage', u);
    return () => { window.removeEventListener('languageChanged', u); window.removeEventListener('storage', u); };
  }, []);

  const [inboxReports] = useState<Report[]>([
    { id: "RPT-001", name: "Halal Compliance Summary", type: "Compliance", source: "Auditor Web", sourceColor: "#2563eb", date: "2026-11-12", status: "ready" },
    { id: "RPT-002", name: "Weekly Throughput Report", type: "Operational", source: "Operations Web", sourceColor: "#d97706", date: "2026-11-11", status: "ready" },
    { id: "RPT-003", name: "CCTV Incident Log Q4", type: "Security", source: "Surveillance Web", sourceColor: "#7c3aed", date: "2026-11-10", status: "processing" },
    { id: "RPT-004", name: "Mobile Field Report Nov", type: "Field Visit", source: "Mobile App", sourceColor: "#dc2626", date: "2026-11-09", status: "ready" },
    { id: "RPT-005", name: "Public Verification Cert", type: "Certificate Scan", source: "Public Verification", sourceColor: "#0d9488", date: "2026-11-08", status: "ready" },
    { id: "RPT-006", name: "Executive Summary Oct", type: "Executive", source: "Commander", sourceColor: "#059669", date: "2026-11-07", status: "delivered" },
    { id: "RPT-007", name: "Cold Chain Audit", type: "Cold Chain", source: "Operations Web", sourceColor: "#d97706", date: "2026-11-06", status: "ready" },
  ]);

  const [outboxReports, setOutboxReports] = useState<Report[]>([
    { id: "REQ-001", name: "Monthly Halal Audit", type: "Audit Trail", source: "Auditor Web", sourceColor: "#2563eb", date: "2026-11-12", status: "pending", requestedBy: "Commander TC" },
    { id: "REQ-002", name: "Line A Performance", type: "Line Performance", source: "Operations Web", sourceColor: "#d97706", date: "2026-11-11", status: "processing", requestedBy: "Commander TC" },
    { id: "REQ-003", name: "Mobile GPS Tracking", type: "GPS Tracking", source: "Mobile App", sourceColor: "#dc2626", date: "2026-11-10", status: "ready", requestedBy: "Commander TC" },
  ]);

  const [formApp, setFormApp] = useState("Auditor Web");
  const [formType, setFormType] = useState("Compliance");
  const [formPeriod, setFormPeriod] = useState("This Month");
  const [formNote, setFormNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const types = REPORT_TYPES_BY_APP[formApp] || [];
    if (!types.includes(formType)) setFormType(types[0] || "");
  }, [formApp]);

  const handleDownload = async (report: Report) => {
    setDownloading(report.id);
    try {
      await generateReportPDF({
        id: report.id,
        name: report.name,
        type: report.type,
        source: report.source,
        date: report.date,
        requestedBy: report.requestedBy,
        period: "This Month",
      });
    } catch (err) {
      console.error("Download failed:", err);
      alert("Gagal download PDF. Cek console untuk detail.");
    } finally {
      setDownloading(null);
    }
  };

  const handleRequestSubmit = async () => {
    if (!formNote.trim() || !formType) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    const newReq: Report = {
      id: `REQ-${String(outboxReports.length + 1).padStart(3, "0")}`,
      name: `${formType} Report — ${formPeriod}`,
      type: formType,
      source: formApp,
      sourceColor: APP_COLORS[formApp] || "#059669",
      date: new Date().toISOString().split("T")[0],
      status: "pending",
      requestedBy: "Commander TC",
    };
    setOutboxReports(prev => [newReq, ...prev]);
    setSubmitting(false);
    setShowRequestModal(false);
    setFormNote("");
    setActiveTab("outbox");
  };

  const statusConfig: Record<ReportStatus, { label: string; color: string; bg: string; icon: any }> = {
    pending: { label: "Pending", color: "#d97706", bg: "#fef3c7", icon: <Clock size={12} /> },
    processing: { label: "Processing", color: "#2563eb", bg: "#dbeafe", icon: <Clock size={12} /> },
    ready: { label: "Ready", color: "#059669", bg: "#d1fae5", icon: <CheckCircle2 size={12} /> },
    delivered: { label: "Delivered", color: "#64748b", bg: "#f1f5f9", icon: <CheckCircle2 size={12} /> },
  };

  const tabs = [
    { id: "inbox" as const, label: "Inbox", icon: <Inbox size={16} />, count: inboxReports.length },
    { id: "request" as const, label: "Request Report", icon: <Plus size={16} /> },
    { id: "outbox" as const, label: "Outbox (Requested)", icon: <Send size={16} />, count: outboxReports.length },
  ];

  const renderReportTypeOptions = () =>
    (REPORT_TYPES_BY_APP[formApp] || []).map(type => <option key={type}>{type}</option>);

  return (
    <div className="page">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", display: "flex", alignItems: "center", gap: 8 }}>
            <FileCheck2 className="text-emerald-600" size={24} /> Report Hub
          </h1>
          <p style={{ color: "#64748b", marginTop: 4, fontSize: 14 }}>Centralized reports from all RIQABAH apps. Request and manage reports.</p>
        </div>
        <button onClick={() => setShowRequestModal(true)} style={{ background: "#059669", color: "white", border: "none", padding: "10px 16px", borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
          <Plus size={16} /> Request Report
        </button>
      </div>

      <div style={{ display: "flex", gap: 4, background: "#f1f5f9", padding: 4, borderRadius: 10, marginBottom: 20, width: "fit-content" }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: "10px 16px", borderRadius: 8, border: "none", background: activeTab === tab.id ? "white" : "transparent", color: activeTab === tab.id ? "#0f172a" : "#64748b", fontWeight: 600, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, boxShadow: activeTab === tab.id ? "0 1px 3px rgba(0,0,0,0.1)" : "none" }}>
            {tab.icon} {tab.label}
            {tab.count !== undefined && (
              <span style={{ background: activeTab === tab.id ? "#059669" : "#cbd5e1", color: "white", fontSize: 10, padding: "1px 6px", borderRadius: 99 }}>{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      {activeTab === "inbox" && (
        <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
              <tr>
                {["Report ID", "Report Name", "Source App", "Type", "Date", "Status", "Action"].map(h => (
                  <th key={h} style={{ padding: 16, textAlign: "left", fontSize: 13, fontWeight: 600, color: "#475569" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {inboxReports.map(r => {
                const cfg = statusConfig[r.status];
                return (
                  <tr key={r.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: 16, fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{r.id}</td>
                    <td style={{ padding: 16, fontSize: 13, color: "#475569", display: "flex", alignItems: "center", gap: 8 }}>
                      <FileText size={16} className="text-slate-400" /> {r.name}
                    </td>
                    <td style={{ padding: 16 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: r.sourceColor, background: `${r.sourceColor}15`, padding: "4px 10px", borderRadius: 99 }}>{r.source}</span>
                    </td>
                    <td style={{ padding: 16, fontSize: 13, color: "#475569" }}>{r.type}</td>
                    <td style={{ padding: 16, fontSize: 13, color: "#475569" }}>{r.date}</td>
                    <td style={{ padding: 16 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, color: cfg.color, background: cfg.bg, padding: "4px 10px", borderRadius: 99, width: "fit-content" }}>
                        {cfg.icon} {cfg.label}
                      </span>
                    </td>
                    <td style={{ padding: 16 }}>
                      {r.status === "ready" ? (
                        downloading === r.id ? (
                          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "#64748b" }}>
                            <Loader2 size={14} className="animate-spin" /> Generating...
                          </span>
                        ) : (
                          <button onClick={() => handleDownload(r)} style={{ background: "none", border: "none", color: "#059669", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600 }}>
                            <Download size={14} /> Download
                          </button>
                        )
                      ) : (
                        <span style={{ fontSize: 12, color: "#94a3b8" }}>—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "outbox" && (
        <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
              <tr>
                {["Request ID", "Report", "To App", "Requested By", "Date", "Status"].map(h => (
                  <th key={h} style={{ padding: 16, textAlign: "left", fontSize: 13, fontWeight: 600, color: "#475569" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {outboxReports.map(r => {
                const cfg = statusConfig[r.status];
                return (
                  <tr key={r.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: 16, fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{r.id}</td>
                    <td style={{ padding: 16, fontSize: 13, color: "#475569" }}>{r.name}</td>
                    <td style={{ padding: 16 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: r.sourceColor, background: `${r.sourceColor}15`, padding: "4px 10px", borderRadius: 99 }}>{r.source}</span>
                    </td>
                    <td style={{ padding: 16, fontSize: 13, color: "#475569" }}>{r.requestedBy || "—"}</td>
                    <td style={{ padding: 16, fontSize: 13, color: "#475569" }}>{r.date}</td>
                    <td style={{ padding: 16 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, color: cfg.color, background: cfg.bg, padding: "4px 10px", borderRadius: 99, width: "fit-content" }}>
                        {cfg.icon} {cfg.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "request" && (
        <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", padding: 32, maxWidth: 600 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 24 }}>Request Report from App</h3>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 8 }}>Target App</label>
            <select value={formApp} onChange={e => setFormApp(e.target.value)} style={{ width: "100%", padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14 }}>
              {APP_LIST.map(app => <option key={app}>{app}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 8 }}>Report Type</label>
            <select value={formType} onChange={e => setFormType(e.target.value)} style={{ width: "100%", padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14 }}>
              {renderReportTypeOptions()}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 8 }}>Period</label>
            <select value={formPeriod} onChange={e => setFormPeriod(e.target.value)} style={{ width: "100%", padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14 }}>
              <option>This Week</option>
              <option>This Month</option>
              <option>Last Quarter</option>
              <option>This Year</option>
            </select>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 8 }}>Note / Reason</label>
            <textarea value={formNote} onChange={e => setFormNote(e.target.value)} placeholder="e.g., Required for upcoming audit" style={{ width: "100%", padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, minHeight: 80, resize: "vertical" }} />
          </div>
          <button onClick={handleRequestSubmit} disabled={!formNote.trim() || submitting || !formType} style={{ background: formNote.trim() && !submitting && formType ? "#059669" : "#cbd5e1", color: "white", border: "none", padding: "12px 24px", borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: formNote.trim() && !submitting && formType ? "pointer" : "not-allowed", display: "flex", alignItems: "center", gap: 8 }}>
            <Send size={16} /> {submitting ? "Sending..." : "Send Request"}
          </button>
        </div>
      )}

      {showRequestModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }} onClick={() => setShowRequestModal(false)}>
          <div style={{ background: "white", borderRadius: 16, padding: 32, maxWidth: 500, width: "90%" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a" }}>Request Report</h3>
              <button onClick={() => setShowRequestModal(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><X size={20} /></button>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 6 }}>Target App</label>
              <select value={formApp} onChange={e => setFormApp(e.target.value)} style={{ width: "100%", padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14 }}>
                {APP_LIST.map(app => <option key={app}>{app}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 6 }}>Report Type</label>
              <select value={formType} onChange={e => setFormType(e.target.value)} style={{ width: "100%", padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14 }}>
                {renderReportTypeOptions()}
              </select>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 6 }}>Period</label>
              <select value={formPeriod} onChange={e => setFormPeriod(e.target.value)} style={{ width: "100%", padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14 }}>
                <option>This Week</option>
                <option>This Month</option>
                <option>Last Quarter</option>
                <option>This Year</option>
              </select>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 6 }}>Note</label>
              <textarea value={formNote} onChange={e => setFormNote(e.target.value)} placeholder="Reason for request..." style={{ width: "100%", padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, minHeight: 70, resize: "vertical" }} />
            </div>
            <button onClick={handleRequestSubmit} disabled={!formNote.trim() || submitting || !formType} style={{ width: "100%", background: formNote.trim() && !submitting && formType ? "#059669" : "#cbd5e1", color: "white", border: "none", padding: "12px", borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: formNote.trim() && !submitting && formType ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <Send size={16} /> {submitting ? "Sending..." : "Send Request"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
