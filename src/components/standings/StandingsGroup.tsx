"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { StandingGroup } from "@/types";

interface StandingsGroupProps {
  group: StandingGroup;
  index: number;
}

export function StandingsGroupCard({ group, index }: StandingsGroupProps) {
  return (
    <motion.div
      className="card overflow-hidden"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <div
        className="px-4 py-2.5 flex items-center gap-2"
        style={{
          borderBottom: "1px solid var(--border-subtle)",
          background: "linear-gradient(90deg, rgba(34,211,238,0.06), transparent)",
        }}
      >
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--accent-cyan)" }}>
          {group.group}
        </span>
      </div>

      {/* Table Header */}
      <div
        className="grid px-4 py-1.5"
        style={{
          gridTemplateColumns: "28px 1fr 28px 28px 28px 28px 28px 36px",
          gap: "4px",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        {["#", "Seleção", "J", "V", "E", "D", "SG", "Pts"].map((h) => (
          <span
            key={h}
            className="text-[10px] font-semibold uppercase text-center"
            style={{ color: "var(--text-muted)" }}
          >
            {h}
          </span>
        ))}
      </div>

      {/* Rows */}
      {group.entries.map((entry, i) => {
        const isQualified = entry.description === "Qualified";
        const isTop2 = entry.rank <= 2;

        return (
          <div
            key={entry.team.id}
            className="grid items-center px-4 py-2.5"
            style={{
              gridTemplateColumns: "28px 1fr 28px 28px 28px 28px 28px 36px",
              gap: "4px",
              borderBottom: i < group.entries.length - 1 ? "1px solid var(--border-subtle)" : "none",
              background: isTop2 ? "rgba(34, 211, 238, 0.03)" : "transparent",
            }}
          >
            {/* Rank */}
            <span
              className="text-sm font-bold text-center tabular-nums"
              style={{ color: isTop2 ? "var(--accent-cyan)" : "var(--text-muted)" }}
            >
              {entry.rank}
            </span>

            {/* Team */}
            <div className="flex items-center gap-2 min-w-0">
              {isTop2 && (
                <div
                  className="shrink-0 w-0.5 h-6 rounded-full"
                  style={{ background: "var(--accent-cyan)" }}
                />
              )}
              <div className="relative w-6 h-6 shrink-0">
                <Image
                  src={entry.team.logo}
                  alt={entry.team.name}
                  fill
                  style={{ objectFit: "contain" }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
              <span
                className="text-sm font-semibold truncate"
                style={{ color: isQualified ? "var(--text-primary)" : "var(--text-secondary)" }}
              >
                {entry.team.shortName}
              </span>
            </div>

            {/* Stats */}
            {[
              entry.all.played,
              entry.all.win,
              entry.all.draw,
              entry.all.lose,
              entry.goalsDiff > 0 ? `+${entry.goalsDiff}` : entry.goalsDiff,
            ].map((val, j) => (
              <span
                key={j}
                className="text-sm text-center tabular-nums"
                style={{ color: "var(--text-secondary)" }}
              >
                {val}
              </span>
            ))}

            {/* Points */}
            <div className="flex justify-center">
              <span
                className="text-sm font-black tabular-nums px-1.5 py-0.5 rounded-lg"
                style={{
                  background: isTop2 ? "rgba(34,211,238,0.12)" : "var(--border-subtle)",
                  color: isTop2 ? "var(--accent-cyan)" : "var(--text-primary)",
                  minWidth: 28,
                  textAlign: "center",
                  display: "inline-block",
                }}
              >
                {entry.points}
              </span>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}
