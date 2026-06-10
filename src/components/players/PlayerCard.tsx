"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { LeaderboardEntry } from "@/types";

interface PlayerCardProps {
  entry: LeaderboardEntry;
  mode: "goals" | "assists";
  onClick: (entry: LeaderboardEntry) => void;
  index: number;
}

const POSITION_COLORS: Record<string, string> = {
  Forward: "var(--accent-primary)",
  Midfielder: "var(--accent-amber)",
  Defender: "var(--text-secondary)",
  Goalkeeper: "var(--text-primary)",
};

export function PlayerCard({ entry, mode, onClick, index }: PlayerCardProps) {
  const { rank, player, goals, assists, matches, rating } = entry;
  const primaryValue = mode === "goals" ? goals : assists;
  const primaryLabel = mode === "goals" ? "Gols" : "Assists";
  const positionColor = POSITION_COLORS[player.position] ?? "#a3a3a3";

  const isTop3 = rank <= 3;
  const rankColors: Record<number, string> = {
    1: "#fbbf24",
    2: "#a3a3a3",
    3: "#cd7f32",
  };

  return (
    <motion.button
      id={`player-card-${player.id}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(entry)}
      className="w-full text-left"
    >
      <div
        className="card flex items-center gap-3 p-3"
        style={{
          ...(isTop3 && {
            borderColor: "var(--border-strong)",
            background: "var(--bg-surface)",
          }),
        }}
      >
        {/* Rank */}
        <div
          className="flex items-center justify-center shrink-0 font-black tabular-nums"
          style={{
            width: 28,
            fontSize: isTop3 ? 16 : 13,
            color: isTop3 ? rankColors[rank] : "var(--text-muted)",
          }}
        >
          {rank}
        </div>

        {/* Avatar */}
        <div className="relative shrink-0">
          <div
            className="rounded-md overflow-hidden"
            style={{
              width: 48,
              height: 48,
              background: "var(--border-default)",
              border: `1.5px solid ${positionColor}30`,
            }}
          >
            <Image
              src={player.photo}
              alt={player.name}
              width={48}
              height={48}
              style={{ objectFit: "cover" }}
              onError={(e) => {
                const el = e.target as HTMLImageElement;
                el.style.display = "none";
                const parent = el.parentElement;
                if (parent) {
                  parent.innerHTML = `<span style="font-size:24px;display:flex;align-items:center;justify-content:center;height:100%;">⚽</span>`;
                }
              }}
            />
          </div>
          {/* Team mini badge */}
          <div
            className="absolute -bottom-1 -right-1 rounded-full overflow-hidden"
            style={{
              width: 18,
              height: 18,
              background: "var(--bg-surface)",
              border: "1px solid var(--border-default)",
            }}
          >
            <Image
              src={player.team.logo}
              alt={player.team.shortName}
              width={16}
              height={16}
              style={{ objectFit: "contain" }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p
            className="text-sm font-semibold truncate leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            {player.name}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className="text-xs font-medium"
              style={{ color: positionColor }}
            >
              {player.team.shortName}
            </span>
            <span style={{ color: "var(--border-strong)" }}>·</span>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              {matches} jogos
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Rating */}
          <div className="text-center">
            <p
              className="text-xs font-bold tabular-nums"
              style={{ color: "var(--accent-primary)" }}
            >
              {rating.toFixed(1)}
            </p>
            <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
              Rating
            </p>
          </div>

          {/* Primary stat */}
          <div
            className="flex flex-col items-center justify-center rounded-md px-3 py-2"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
              minWidth: 52,
            }}
          >
            <span
              className="text-xl font-bold tabular-nums leading-none"
              style={{ color: "var(--text-primary)" }}
            >
              {primaryValue}
            </span>
            <span className="text-[10px] font-medium mt-0.5" style={{ color: "var(--text-muted)" }}>
              {primaryLabel}
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
