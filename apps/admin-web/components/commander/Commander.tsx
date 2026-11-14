"use client";

import {
  Activity, AlertTriangle, BarChart3, Bell, CalendarDays, Camera,
  CheckCircle2, ChevronDown, ClipboardCheck, Database, FileCheck2,
  Gauge, LayoutDashboard, Menu, Package, RefreshCw, Search, Settings,
  ShieldCheck, Snowflake, Thermometer, Users, Video, Wifi, X, Zap,
  LogOut, Sparkles, Bot, ShieldAlert, Network, Globe
} from "lucide-react";

import Link from "next/link";
import type { ApiState, DashboardResponse, DashboardSummary } from "./dashboard/types";
import { LanguageSwitcher } from './LanguageSwitcher';
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { formatNumber, formatPercent, formatQuantity, formatTemperature, getColdChainMeta } from "./dashboard/helpers";
import { translations, Language } from "./dictionaries";

type IconType = typeof LayoutDashboard;
type NavItem = { label: string; icon: IconType; href: string; badge?: string; };
type NavGroup = { title: string; items: NavItem[]; };

const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:8094";

function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  const storageKeys = ["riqabah_access_token", "accessToken", "token", "auth_token", "jwt"];
  for (const key of storageKeys) {
    const localValue = window.localStorage.getItem(key);
    if (localValue) return localValue;
    const sessionValue = window.sessionStorage.getItem(key);
    if (sessionValue) return sessionValue;
  }
  return null;
}

function Logo() {
  return (
    <div className="commander-logo-wrap">
      <img src="/riqabah-logo.png" alt="RIQABAH — Halal Slaughter Intelligence" width={180} className="commander-logo" />
    </div>
  );
}

// PENTING: Sidebar & Topbar sekarang menerima prop `t` (kamus bahasa)
export function Sidebar({ mobileOpen, onClose, alertCount, t }: { mobileOpen: boolean; onClose: () => void; alertCount: number; t: any; }) {
  const pathname = usePathname();
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/login';
  };

  const navGroups: NavGroup[] = [
    { title: t.command_center, items: [
        { label: t.dashboard, icon: LayoutDashboard, href: "/dashboard" },
        { label: t.live_monitor, icon: Activity, href: "/live-monitor" },
        { label: t.batches, icon: Package, href: "/batches" },
        { label: t.alerts, icon: AlertTriangle, href: "/alerts" },
    ]},
    { title: t.ai_intelligence, items: [
        { label: t.ai_overview, icon: Sparkles, href: "/ai/overview" },
        { label: t.ai_copilot, icon: Bot, href: "/ai/copilot" },
        { label: t.ai_doc, icon: FileCheck2, href: "/ai/document-intelligence" },
        { label: t.ai_risk, icon: ShieldAlert, href: "/ai/risk-intelligence" },
        { label: t.ai_halal, icon: ShieldCheck, href: "/ai/halal-copilot" },
        { label: t.ai_trace, icon: Network, href: "/ai/traceability-intelligence" },
        { label: t.ai_slaughter, icon: Activity, href: "/ai/slaughter-intelligence" },
        { label: t.ai_export, icon: Globe, href: "/ai/export-compliance" },
    ]},
    { title: t.operations, items: [
        { label: t.slaughter_ops, icon: ClipboardCheck, href: "/slaughter-ops" },
        { label: t.compliance, icon: ShieldCheck, href: "/compliance" },
        { label: t.analytics, icon: BarChart3, href: "/analytics" },
        { label: t.reports, icon: FileCheck2, href: "/reports" },
    ]},
    { title: t.quality_control, items: [
        { label: t.equipment_iot, icon: Gauge, href: "/equipment-iot" },
        { label: t.cctv_media, icon: Video, href: "/cctv-media" },
    ]},
    { title: t.administration, items: [
        { label: t.users_roles, icon: Users, href: "/users-roles" },
        { label: t.settings, icon: Settings, href: "/settings" },
    ]},
  ];

  const groups = useMemo(() => navGroups.map((group) => ({
    ...group,
    items: group.items.map((item) => item.label === t.alerts ? { ...item, badge: alertCount > 0 ? String(alertCount) : undefined } : item),
  })), [alertCount, t]);

  return (
    <>
      {mobileOpen && <button type="button" className="sidebar-overlay" aria-label="Close navigation" onClick={onClose} />}
      <aside className={`sidebar ${mobileOpen ? "sidebar-mobile-open" : ""}`}>
        <div className="sidebar-inner" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div className="sidebar-header">
            <Logo />
            <button type="button" className="mobile-close" onClick={onClose} aria-label="Close navigation">
              <X size={19} aria-hidden="true" />
            </button>
          </div>

          <nav className="sidebar-nav" aria-label="Primary navigation" style={{ flex: 1 }}>
            {groups.map((group) => (
              <div className="nav-group" key={group.title}>
                <div className="nav-section-title">{group.title}</div>
                <div className="nav-items">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const active = pathname === item.href;
                    return (
                      <Link href={item.href} key={item.label} className={`commander-nav-item ${active ? "active" : ""}`} aria-current={active ? "page" : undefined} onClick={onClose}>
                        <span className="nav-icon" aria-hidden="true"><Icon size={18} strokeWidth={1.8} focusable="false" /></span>
                        <span className="nav-text">{item.label}</span>
                        {item.badge && <span className="nav-badge" aria-label={`${item.badge} alerts`}>{item.badge}</span>}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="sidebar-user">
            <div className="sidebar-user-avatar">TC</div>
            <div className="sidebar-user-copy">
              <div className="sidebar-user-name">Commander</div>
              <div className="sidebar-user-role">{t.commander_role}</div>
            </div>
            <button type="button" className="sidebar-user-menu" aria-label="Account menu">
              <ChevronDown size={16} aria-hidden="true" />
            </button>
          </div>
          
          <div style={{ padding: '0 16px 16px 16px' }}>
            <button onClick={handleLogout} style={{ width: '100%', padding: '12px', color: '#d32f2f', display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(211, 47, 47, 0.08)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '14px' }}>
              <LogOut size={18} />
              {t.sign_out}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export function Topbar({ onMenu, apiState, onRefresh, alertCount = 0, t }: { onMenu: () => void; apiState: ApiState; onRefresh: () => void; alertCount?: number; t: any; }) {
  const [query, setQuery] = useState("");
  return (
    <header className="topbar">
      <div className="topbar-mobile-menu">
        <button type="button" className="icon-button" onClick={onMenu} aria-label="Open navigation"><Menu size={20} aria-hidden="true" /></button>
      </div>
      <div className="topbar-search">
        <Search size={17} aria-hidden="true" className="topbar-search-icon" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.search_placeholder} aria-label="Search" />
      </div>
      <div className="topbar-spacer" />
      <LanguageSwitcher />
      <button type="button" className="topbar-icon-button" aria-label="Refresh dashboard" title="Refresh dashboard" onClick={onRefresh}><RefreshCw size={18} aria-hidden="true" /></button>
      <button type="button" className="topbar-icon-button" aria-label="Notifications">
        <Bell size={18} aria-hidden="true" />
        {alertCount > 0 && <span className="notification-dot" aria-label={`${alertCount} active alerts`} />}
      </button>
    </header>
  );
}

// Komponen panel (Hero, KPI, dll) - Saya panggil dari file terpisah agar kode bersih.
// Tapi untuk saat ini, kita render langsung teks statis dari kamus agar cepat.
export function DashboardMain({ apiState, summary, error, fetchDashboard, t }: any) {
  return (
    <div className="page">
      {/* HERO SECTION */}
      <div style={{ background: "white", borderRadius: 16, padding: 32, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, border: "1px solid #e2e8f0" }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#059669", marginBottom: 8 }}>● {t.hero_badge}</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>{t.hero_title}</h1>
          <p style={{ fontSize: 14, color: "#64748b", maxWidth: 600 }}>{t.hero_desc}</p>
          <div style={{ fontSize: 13, color: "#64748b", marginTop: 16 }}>📅 {t.hero_date}</div>
        </div>
        <div style={{ background: "#f8fafc", padding: 24, borderRadius: 12, minWidth: 250, border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", marginBottom: 12, letterSpacing: 1 }}>{t.sys_status}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#059669", fontWeight: 700, fontSize: 15, marginBottom: 16 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#059669" }}></span> {t.sys_operational}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#64748b", borderTop: "1px solid #e2e8f0", paddingTop: 12 }}>
            <div><strong>{t.sys_api}</strong><br/>{t.sys_connected}</div>
            <div><strong>{t.sys_db}</strong><br/>PostgreSQL 17</div>
            <div><strong>{t.sys_region}</strong><br/>{t.sys_region_value}</div>
          </div>
        </div>
      </div>

      {/* KPI GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { title: t.kpi_arrivals, value: "0", sub: t.kpi_no_arrivals, icon: <Package size={20} className="text-emerald-600" /> },
          { title: t.kpi_slaughtered, value: "0", sub: t.kpi_no_slaughter, icon: <Activity size={20} className="text-emerald-600" /> },
          { title: t.kpi_compliance, value: "-", sub: t.kpi_no_checks, icon: <ShieldCheck size={20} className="text-emerald-600" /> },
          { title: t.kpi_sessions, value: "1", sub: t.kpi_active_session, icon: <ClipboardCheck size={20} className="text-emerald-600" /> },
          { title: t.kpi_carcasses, value: "0", sub: t.kpi_no_weight, icon: <Package size={20} className="text-emerald-600" /> },
          { title: t.kpi_meat, value: "-", sub: t.kpi_no_batches, icon: <Zap size={20} className="text-emerald-600" /> },
          { title: t.kpi_cold, value: "2.5°C", sub: t.kpi_sensor_online, icon: <Thermometer size={20} className="text-emerald-600" /> },
          { title: t.kpi_alerts, value: "2", sub: t.kpi_critical, icon: <AlertTriangle size={20} className="text-amber-600" /> },
        ].map((kpi, i) => (
          <div key={i} style={{ background: "white", borderRadius: 12, padding: 20, border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ padding: 8, background: "#ecfdf5", borderRadius: 8 }}>{kpi.icon}</div>
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", marginBottom: 4 }}>{kpi.title}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#0f172a" }}>{kpi.value}</div>
            <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* PANEL BAWAH */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>{t.live_mon_title}</h3>
            <span style={{ fontSize: 11, fontWeight: 600, background: "#fffbeb", color: "#d97706", padding: "4px 10px", borderRadius: 99 }}>{t.live_mon_badge}</span>
          </div>
          <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", fontSize: 13, border: "2px dashed #e2e8f0", borderRadius: 8 }}>
            {t.live_mon_placeholder}
          </div>
        </div>

        <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>{t.halal_panel_title}</h3>
            <ShieldCheck size={20} className="text-emerald-600" />
          </div>
          <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", fontSize: 13, border: "2px dashed #e2e8f0", borderRadius: 8 }}>
            {t.halal_panel_placeholder}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Commander({ children }: { children?: React.ReactNode } = {}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<Language>('en');
  const [apiState, setApiState] = useState<ApiState>("loading");
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const t = translations[lang] || translations.en;

  // Sinkronisasi Bahasa
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

  // Fetch Dashboard
  const fetchDashboard = useCallback(async () => {
    setApiState("loading");
    try {
      const token = getStoredToken();
      const headers: HeadersInit = { Accept: "application/json" };
      if (token) headers.Authorization = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
      const response = await fetch(`${API_BASE}/api/v1/dashboard/summary`, { method: "GET", headers, credentials: "include", cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = (await response.json()) as DashboardResponse;
      if (payload?.data) setSummary(payload.data);
      setApiState("connected");
    } catch (err) {
      setApiState("error");
      setError(err instanceof Error ? err.message : "Error");
    }
  }, []);

  useEffect(() => {
    void fetchDashboard();
    const timer = window.setInterval(() => { void fetchDashboard(); }, 30_000);
    return () => window.clearInterval(timer);
  }, [fetchDashboard]);

  const alertCount = summary?.alerts.open ?? 0;

  return (
    <div className="commander-shell">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} alertCount={alertCount} t={t} />
      
      <main className="main-area">
        <Topbar onMenu={() => setMobileOpen(true)} apiState={apiState} alertCount={alertCount} onRefresh={() => void fetchDashboard()} t={t} />
        {children ? (
          <div className="page">{children}</div>
        ) : (
          <DashboardMain apiState={apiState} summary={summary} error={error} fetchDashboard={fetchDashboard} t={t} />
        )}
      </main>
    </div>
  );
}



