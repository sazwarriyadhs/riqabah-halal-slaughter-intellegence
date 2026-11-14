"use client";
import type { ApiState } from "./types";
import { Activity, Database, Thermometer } from "lucide-react";

export function Footer({
  apiState,
}: {
  apiState: ApiState;
}) {
  return (
    <footer className="commander-footer">
      <div className="footer-brand">
        <span className="system-dot" />

        <strong>RIQABAH Commander</strong>

        <span>
          {apiState === "connected"
            ? "System Operational"
            : apiState === "loading"
              ? "Connecting"
              : "API Attention Required"}
        </span>
      </div>

      <div className="footer-status">
        <span>
          <Activity
            size={13}
            aria-hidden="true"
          />
          API :8094
        </span>

        <span>
          <Database
            size={13}
            aria-hidden="true"
          />
          PostgreSQL 17
        </span>

        <span>
          <Thermometer
            size={13}
            aria-hidden="true"
          />
          SA / Asia-Riyadh
        </span>
      </div>
    </footer>
  );
}
