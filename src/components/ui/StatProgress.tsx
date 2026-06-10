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
    fill: "linear-gradient(90deg, #0891b2, #22d3ee)",
    text: "#22d3ee",
    bg: "rgba(34, 211, 238, 0.08)",
  },
  violet: {
    fill: "linear-gradient(90deg, #6d28d9, #8b5cf6)",
    text: "#8b5cf6",
    bg: "rgba(139, 92, 246, 0.08)",
  },
  emerald: {
    fill: "linear-gradient(90deg, #059669, #34d399)",
    text: "#34d399",
    bg: "rgba(52, 211, 153, 0.08)",
  },
  amber: {
    fill: "linear-gradient(90deg, #d97706, #fbbf24)",
    text: "#fbbf24",
    bg: "rgba(251, 191, 36, 0.08)",
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
              className="text-xs font-bold tabular-nums px-1.5 py-0.5 rounded"
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
        className="w-full rounded-full overflow-hidden"
        style={{ height: "6px", background: "var(--border-default)" }}
      >
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{ background: colors.fill }}
        />
      </div>
    </div>
  );
}
