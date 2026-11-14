"use client";
import { Send, FileSpreadsheet, FileText, DownloadCloud, CheckCircle2 } from "lucide-react";
import { OperationsShell } from "@/components/layout/OperationsShell";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ReportsPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [requestTarget, setRequestTarget] = useState("Admin Web");
  const [pendingRequest, setPendingRequest] = useState<string | null>(null);

  // Simulasi pengecekan request dari Admin setiap 2 detik
  useEffect(() => {
    const checkPending = () => {
      const pending = localStorage.getItem("riqabah_pending_request");
      setPendingRequest(pending);
    };
    checkPending();
    const interval = setInterval(checkPending, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setData([
        { id: 'RPT-2026-11-HALAL-01', type: 'Halal Compliance', period: 'Nov 01 - Nov 15, 2026', metric: '98.5% Pass Rate', status: 'Compliant', generatedBy: 'owner@riqabah.sa', date: '2026-11-15' },
        { id: 'RPT-2026-11-PROD-02', type: 'Production & Yield', period: 'Nov 01 - Nov 15, 2026', metric: '450 kg Yield', status: 'Compliant', generatedBy: 'ops@riqabah.sa', date: '2026-11-15' },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleRequest = () => {
    alert(`📤 Permintaan terkirim ke ${requestTarget}!`);
  };

  // Fungsi saat Operations-Web menerima request dari Admin
  const handleAcceptRequest = () => {
    // Kirim data ke Admin
    const existing = JSON.parse(localStorage.getItem("riqabah_sent_reports") || "[]");
    const newReports = data.map(item => ({
      ...item,
      reportFrom: "Operations Web",
      sentAt: new Date().toLocaleString()
    }));
    localStorage.setItem("riqabah_sent_reports", JSON.stringify([...existing, ...newReports]));
    
    // Hapus status pending (artinya request sudah di-accept)
    localStorage.removeItem("riqabah_pending_request");
    setPendingRequest(null);
    
    alert("✅ Request diterima! Laporan berhasil dikirim ke Admin (Commander).");
  };

  const sendToCommander = () => {
    const existing = JSON.parse(localStorage.getItem("riqabah_sent_reports") || "[]");
    const newReports = data.map(item => ({
      ...item,
      reportFrom: "Operations Web",
      sentAt: new Date().toLocaleString()
    }));
    localStorage.setItem("riqabah_sent_reports", JSON.stringify([...existing, ...newReports]));
    alert("✅ Laporan berhasil dikirim ke Commander (Admin-Web)!");
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reports");
    XLSX.writeFile(wb, "RIQABAH_Operations_Reports.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    const img = new Image();
    img.src = "/riqabah-logo.png";
    img.onload = () => {
      doc.addImage(img, "PNG", 14, 10, 35, 15);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("RIQABAH OPERATIONS REPORT", 55, 18);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text("Saudi Halal Slaughter Intelligence", 55, 24);
      doc.setDrawColor(7, 85, 58);
      doc.setLineWidth(1);
      doc.line(14, 30, 196, 30);
      autoTable(doc, {
        startY: 42,
        head: [['ID', 'Type', 'Period', 'Key Metric', 'Status']],
        body: data.map(item => [item.id, item.type, item.period, item.metric, item.status]),
        theme: 'grid',
        headStyles: { fillColor: [7, 85, 58], textColor: 255, fontStyle: 'bold' },
        styles: { fontSize: 8, cellPadding: 3 },
      });
      doc.save("RIQABAH_Operations_Reports.pdf");
    };
  };

  return (
    <OperationsShell>
      <div className="operations-page">
        <div className="operations-hero">
          <div className="operations-hero-copy">
            <div className="operations-eyebrow">RIQABAH Operations</div>
            <h1 className="operations-title">Reports</h1>
            <p className="operations-subtitle">Generate and download operational reports.</p>
          </div>
          <div className="operations-hero-status">
            <div className="operations-status-label">SYSTEM STATUS</div>
            <div className="operations-status-value" style={{ color: "#07553A" }}>API READY · LIVE DATA</div>
          </div>
        </div>

        {/* NOTIFIKASI ACCEPT REQUEST (Hanya muncul jika ada request dari Admin) */}
        {pendingRequest && (
          <div style={{ background: "#fef3c7", border: "1px solid #f59e0b", padding: "16px", borderRadius: "8px", marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#b45309", fontWeight: 600 }}>
              <DownloadCloud size={20} />
              <span>Admin Web meminta laporan terbaru Anda.</span>
            </div>
            <button onClick={handleAcceptRequest} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", background: "#f59e0b", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: 600 }}>
              <CheckCircle2 size={18} /> Accept Request
            </button>
          </div>
        )}

        {/* Tombol Aksi */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "16px", flexWrap: "wrap", alignItems: "center" }}>
          
          {/* Dropdown Request */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#f9fafb", padding: "6px 6px 6px 16px", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
            <DownloadCloud size={20} color="#1d4ed8" />
            <select 
              value={requestTarget}
              onChange={(e) => setRequestTarget(e.target.value)}
              style={{ border: "none", background: "transparent", padding: "8px 12px", fontSize: "14px", fontWeight: 600, outline: "none", cursor: "pointer", color: "#374151" }}
            >
              <option value="Admin Web">Request from: Admin Web</option>
              <option value="Auditor Web">Request from: Auditor Web</option>
              <option value="Surveillance Web">Request from: Surveillance Web</option>
            </select>
            <button onClick={handleRequest} style={{ padding: "8px 16px", background: "#1d4ed8", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: 600, fontSize: "14px" }}>
              Request
            </button>
          </div>

          {/* Tombol Send to Commander */}
          <button onClick={sendToCommander} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 20px", background: "#d97706", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: 600 }}>
            <CheckCircle2 size={18} /> Accept Request & Send
          </button>

          {/* Tombol Export */}
          <button onClick={exportExcel} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 20px", background: "#07553A", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: 600 }}>
            <FileSpreadsheet size={18} /> Export Excel
          </button>
          <button onClick={exportPDF} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 20px", background: "#d32f2f", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: 600 }}>
            <FileText size={18} /> Export PDF
          </button>
        </div>

        {/* Tabel */}
        <div className="operations-panel">
          <div className="operations-panel-header">
            <div>
              <div className="operations-panel-title">Executive Report Data</div>
              <div className="operations-panel-subtitle">Available generated reports for export & compliance.</div>
            </div>
          </div>
          <table className="operations-table">
            <thead>
              <tr>
                <th>REPORT ID</th>
                <th>TYPE</th>
                <th>PERIOD</th>
                <th>KEY METRIC</th>
                <th>COMPLIANCE STATUS</th>
                <th>GENERATED BY</th>
                <th>DATE</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} style={{ textAlign: "center", padding: "40px" }}>Loading data...</td></tr>
              ) : data.map((item, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600 }}>{item.id}</td>
                  <td>{item.type}</td>
                  <td>{item.period}</td>
                  <td style={{ fontWeight: 600, color: "#07553A" }}>{item.metric}</td>
                  <td>
                    <span className={`operations-badge ${item.status === 'Compliant' ? 'badge-green' : item.status === 'Minor NC' ? 'badge-red' : 'badge-gray'}`} style={{ textTransform: 'uppercase' }}>
                      {item.status}
                    </span>
                  </td>
                  <td>{item.generatedBy}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </OperationsShell>
  );
}

