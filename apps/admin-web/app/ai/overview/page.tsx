"use client";

import { Sparkles, Activity, ShieldCheck, AlertTriangle, TrendingUp, Bot, FileCheck2, Network, ArrowUpRight } from "lucide-react";

export default function AIOverviewPage() {
  return (
    <div className="page">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", display: "flex", alignItems: "center", gap: 8 }}>
          <Sparkles className="text-emerald-600" size={24} /> AI Overview
        </h1>
        <p style={{ color: "#64748b", marginTop: 4, fontSize: 14 }}>Monitor the status of all RIQABAH AI engines and live operational analytics.</p>
      </div>

      <div style={{ background: "linear-gradient(90deg, #064e3b 0%, #047857 100%)", padding: "20px 24px", borderRadius: 12, color: "white", marginBottom: 24, display: "flex", gap: 16, alignItems: "flex-start", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
        <Bot size={32} style={{ flexShrink: 0, opacity: 0.9 }} />
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>AI Operational Insight</h3>
          <p style={{ fontSize: 14, opacity: 0.9, lineHeight: 1.5 }}>
            System is running optimally. There are no critical alerts requiring immediate action at this time. Operations are running according to standards.
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 24 }}>
        <EngineCard 
          icon={<Activity className="text-blue-600" />} 
          title="AI Copilot" 
          desc="Operational assistant" 
          status="Online" 
        />
        <EngineCard 
          icon={<ShieldCheck className="text-emerald-600" />} 
          title="Halal Compliance" 
          desc="Rate: 0%" 
          status="Active" 
        />
        <EngineCard 
          icon={<AlertTriangle className="text-amber-600" />} 
          title="Risk Intelligence" 
          desc="0 Critical Alerts" 
          status="Monitoring" 
        />
        <EngineCard 
          icon={<TrendingUp className="text-purple-600" />} 
          title="Predictive Analytics" 
          desc="Forecast throughput" 
          status="Ready" 
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
        <div style={{ background: "white", padding: 24, borderRadius: 12, border: "1px solid #e2e8f0" }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <Sparkles size={18} className="text-emerald-600" /> AI Action Recommendations
          </h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <ActionItem 
              icon={<FileCheck2 size={18} className="text-blue-500" />}
              title="Certification Document Validation"
              desc="AI detected 3 incoming animal documents that require manual verification by the halal team."
              tag="Document Intelligence"
            />
            <ActionItem 
              icon={<Network size={18} className="text-indigo-500" />}
              title="Traceability Check"
              desc="There is an anomaly in the supply chain of batch #B-2026-11-12. It is recommended to check the travel log."
              tag="Traceability"
            />
            <ActionItem 
              icon={<AlertTriangle size={18} className="text-amber-500" />}
              title="Cold Chain Temperature Warning"
              desc="The temperature of chiller area B is approaching the upper limit (2.5°C). Ensure the compressor is functioning normally."
              tag="Risk Intelligence"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function EngineCard({ icon, title, desc, status }: { icon: React.ReactNode, title: string, desc: string, status: string }) {
  return (
    <div style={{ background: "white", padding: 20, borderRadius: 12, border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: 12, transition: "all 0.2s" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ padding: 10, background: "#f8fafc", borderRadius: 10 }}>{icon}</div>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#059669", background: "#d1fae5", padding: "4px 10px", borderRadius: 99, display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 6, height: 6, background: "#059669", borderRadius: "50%" }}></span>
          {status}
        </span>
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: 15, color: "#0f172a" }}>{title}</div>
        <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>{desc}</div>
      </div>
    </div>
  );
}

function ActionItem({ icon, title, desc, tag }: { icon: React.ReactNode, title: string, desc: string, tag: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: 16, background: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0" }}>
      <div style={{ padding: 8, background: "white", borderRadius: 8, border: "1px solid #e2e8f0" }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: "#0f172a" }}>{title}</div>
          <span style={{ fontSize: 10, fontWeight: 600, color: "#475569", background: "#e2e8f0", padding: "2px 8px", borderRadius: 4 }}>{tag}</span>
        </div>
        <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5 }}>{desc}</div>
      </div>
      <button style={{ background: "none", border: "none", color: "#059669", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600 }}>
        Follow Up <ArrowUpRight size={14} />
      </button>
    </div>
  );
}
