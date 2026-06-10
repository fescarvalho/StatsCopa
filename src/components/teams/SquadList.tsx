"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { SquadPlayer, Team } from "@/types";
import { PlayerDrawer } from "@/components/players/PlayerDrawer";

interface SquadListProps {
  squad: SquadPlayer[];
  team: Team;
}

const POS_ORDER = { Goalkeeper: 0, Defender: 1, Midfielder: 2, Forward: 3 };
const POS_LABELS: Record<string, string> = {
  Goalkeeper: "Goleiros",
  Defender: "Defensores",
  Midfielder: "Meio-Campistas",
  Forward: "Atacantes",
};
const POS_COLORS: Record<string, string> = {
  Goalkeeper: "var(--text-primary)",
  Defender: "var(--text-secondary)",
  Midfielder: "var(--accent-amber)",
  Forward: "var(--accent-primary)",
};

export function SquadList({ squad, team }: SquadListProps) {
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const [selectedPlayerName, setSelectedPlayerName] = useState("");

  const grouped = squad.reduce<Record<string, SquadPlayer[]>>((acc, p) => {
    if (!acc[p.position]) acc[p.position] = [];
    acc[p.position].push(p);
    return acc;
  }, {});

  const positions = Object.keys(grouped).sort(
    (a, b) => POS_ORDER[a as keyof typeof POS_ORDER] - POS_ORDER[b as keyof typeof POS_ORDER]
  );

  return (
    <>
      <div className="flex flex-col gap-4">
        {positions.map((pos) => (
          <div key={pos}>
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: POS_COLORS[pos] }}
              />
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--text-muted)" }}
              >
                {POS_LABELS[pos]}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {grouped[pos].map((player, i) => (
                <motion.button
                  key={player.id}
                  id={`squad-player-${player.id}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedPlayerId(player.id);
                    setSelectedPlayerName(player.name);
                  }}
                  className="w-full text-left"
                >
                  <div className="card flex items-center gap-3 p-3">
                    {/* Número */}
                    <span
                      className="text-sm font-bold tabular-nums w-7 text-center shrink-0"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {player.number}
                    </span>

                    {/* Foto */}
                    <div
                      className="relative w-10 h-10 rounded-md overflow-hidden shrink-0"
                      style={{ background: "var(--border-default)" }}
                    >
                      <Image
                        src={player.photo}
                        alt={player.name}
                        fill
                        style={{ objectFit: "cover" }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).parentElement!.innerHTML =
                            `<span style="font-size:20px;display:flex;align-items:center;justify-content:center;height:100%">⚽</span>`;
                        }}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>
                        {player.name}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span
                          className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                          style={{
                            background: `${POS_COLORS[pos]}18`,
                            color: POS_COLORS[pos],
                          }}
                        >
                          {player.position.substring(0, 3).toUpperCase()}
                        </span>
                        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                          {player.age} anos
                        </span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-center">
                        <p className="text-sm font-bold tabular-nums" style={{ color: "var(--accent-primary)" }}>
                          {player.goals}
                        </p>
                        <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Gols</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold tabular-nums" style={{ color: "var(--text-secondary)" }}>
                          {player.assists}
                        </p>
                        <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Ass.</p>
                      </div>
                    </div>

                    <span style={{ color: "var(--text-muted)", fontSize: 16 }}>›</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        ))}

        {squad.length === 0 && (
          <div className="flex flex-col items-center py-8">
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Elenco detalhado não disponível para esta seleção.
            </p>
          </div>
        )}
      </div>

      <PlayerDrawer
        playerId={selectedPlayerId}
        playerName={selectedPlayerName}
        onClose={() => setSelectedPlayerId(null)}
      />
    </>
  );
}
