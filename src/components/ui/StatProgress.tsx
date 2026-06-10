"use client";

import { motion } from "framer-motion";

interface StatProgressProps {
  label: string;
  value: number;
  maxValue: number;
  displayValue?: string;
  variant?: "cyan" | "violet" | "emerald" | "amber";
  showRank?: boolean;
  rank?: number;
  className?: string;
}

const VARIANT_COLORS = {
  cyan: {
    fill: "#10b981",
    text: "#10b981",
    bg: "rgba(16, 185, 129, 0.1)",
  },
  violet: {
    fill: "#64748b",
    text: "#64748b",
    bg: "rgba(148, 163, 184, 0.1)",
  },
  emerald: {
    fill: "#10b981",
    text: "#10b981",
    bg: "rgba(16, 185, 129, 0.1)",
  },
  amber: {
    fill: "#f59e0b",
    text: "#f59e0b",
    bg: "rgba(245, 158, 11, 0.1)",
  },
};

export function StatProgress({
  label,
  value,
  maxValue,
  displayValue,
  variant = "cyan",
  showRank = false,
  rank,
  className = "",
}: StatProgressProps) {
  const pct = maxValue > 0 ? Math.min((value / maxValue) * 100, 100) : 0;
  const colors = VARIANT_COLORS[variant];

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          {showRank && rank !== undefined && (
            <span
              className="text-xs font-bold tabular-nums px-1.5 py-0.5 rounded-sm"
              style={{ background: colors.bg, color: colors.text }}
            >
              #{rank}
            </span>
          )}
          <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
            {label}
          </span>
        </div>
        <span className="text-sm font-bold tabular-nums" style={{ color: colors.text }}>
          {displayValue ?? value}
        </span>
      </div>

      {/* Track */}
      <div
        className="w-full rounded-md overflow-hidden"
        style={{ height: "6px", background: colors.bg }}
      >
        <motion.div
          className="h-full rounded-md"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{ background: colors.fill }}
        />
      </div>
    </div>
  );
}
