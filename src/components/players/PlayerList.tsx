"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { LeaderboardEntry } from "@/types";
import { PlayerCard } from "./PlayerCard";
import { PlayerDrawer } from "./PlayerDrawer";

interface PlayerListProps {
  scorers: LeaderboardEntry[];
  assisters: LeaderboardEntry[];
}

type Mode = "goals" | "assists";

export function PlayerList({ scorers, assisters }: PlayerListProps) {
  const [mode, setMode] = useState<Mode>("goals");
  const [selectedEntry, setSelectedEntry] = useState<LeaderboardEntry | null>(null);

  const entries = mode === "goals" ? scorers : assisters;

  return (
    <>
      {/* Mode Toggle */}
      <div
        className="flex rounded-xl p-1 mb-4 gap-1"
        style={{ background: "var(--border-subtle)" }}
      >
        {([
          { id: "goals" as const, label: "⚽ Artilheiros" },
          { id: "assists" as const, label: "🎯 Assistências" },
        ] as const).map((tab) => (
          <button
            key={tab.id}
            id={`leaderboard-tab-${tab.id}`}
            onClick={() => setMode(tab.id)}
            className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
            style={{
              background: mode === tab.id ? "var(--bg-surface)" : "transparent",
              color: mode === tab.id ? "var(--text-primary)" : "var(--text-muted)",
              border: mode === tab.id ? "1px solid var(--border-default)" : "1px solid transparent",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      <motion.div
        key={mode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col gap-2"
      >
        {entries.map((entry, i) => (
          <PlayerCard
            key={entry.player.id}
            entry={entry}
            mode={mode}
            index={i}
            onClick={setSelectedEntry}
          />
        ))}
      </motion.div>

      {/* Drawer */}
      <PlayerDrawer
        playerId={selectedEntry?.player.id ?? null}
        playerName={selectedEntry?.player.name ?? ""}
        onClose={() => setSelectedEntry(null)}
      />
    </>
  );
}
