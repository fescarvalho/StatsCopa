"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { Team, H2HData } from "@/types";
import { H2HMatchup } from "@/components/h2h/H2HMatchup";
import { fetchH2H } from "@/services/h2h.service";

interface TeamSelectH2HProps {
  teams: Team[];
  defaultTeamAId?: number;
  defaultTeamBId?: number;
}

function TeamCombobox({
  id,
  label,
  teams,
  selectedId,
  onSelect,
  accentColor,
}: {
  id: string;
  label: string;
  teams: Team[];
  selectedId: number | null;
  onSelect: (team: Team) => void;
  accentColor: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const selected = teams.find((t) => t.id === selectedId);
  const filtered = teams.filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.shortName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex-1 relative">
      <p className="text-xs font-semibold mb-1.5 uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
        {label}
      </p>

      <button
        id={id}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all"
        style={{
          background: "var(--bg-card)",
          border: `1px solid ${open ? accentColor : "var(--border-default)"}`,
        }}
      >
        {selected ? (
          <>
            <div className="relative w-7 h-7 shrink-0">
              <Image
                src={selected.logo}
                alt={selected.name}
                fill
                style={{ objectFit: "contain" }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>
            <span className="text-sm font-bold flex-1 text-left" style={{ color: "var(--text-primary)" }}>
              {selected.shortName}
            </span>
          </>
        ) : (
          <span className="text-sm flex-1 text-left" style={{ color: "var(--text-muted)" }}>
            Escolher seleção…
          </span>
        )}
        <span style={{ color: "var(--text-muted)", fontSize: 12 }}>{open ? "▲" : "▼"}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute z-50 w-full mt-1 rounded-xl overflow-hidden"
            style={{
              background: "var(--bg-drawer)",
              border: "1px solid var(--border-default)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              maxHeight: 260,
              overflowY: "auto",
            }}
          >
            {/* Search */}
            <div className="p-2" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
              <input
                type="text"
                placeholder="Filtrar..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                className="w-full text-sm px-3 py-2 rounded-lg bg-transparent outline-none"
                style={{
                  background: "var(--border-subtle)",
                  color: "var(--text-primary)",
                }}
              />
            </div>

            {filtered.map((team) => (
              <button
                key={team.id}
                onClick={() => { onSelect(team); setOpen(false); setQuery(""); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors"
                style={{
                  background: team.id === selectedId ? `${accentColor}12` : "transparent",
                  borderBottom: "1px solid var(--border-subtle)",
                }}
              >
                <div className="relative w-6 h-6 shrink-0">
                  <Image
                    src={team.logo}
                    alt={team.name}
                    fill
                    style={{ objectFit: "contain" }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
                <span className="text-sm flex-1" style={{ color: "var(--text-primary)" }}>
                  {team.name}
                </span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {team.shortName}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function TeamSelectH2H({ teams, defaultTeamAId = 26, defaultTeamBId = 2 }: TeamSelectH2HProps) {
  const [teamAId, setTeamAId] = useState<number>(defaultTeamAId);
  const [teamBId, setTeamBId] = useState<number>(defaultTeamBId);
  const [h2hData, setH2hData] = useState<H2HData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!teamAId || !teamBId || teamAId === teamBId) return;
    setLoading(true);
    setH2hData(null);
    fetchH2H(teamAId, teamBId).then((data) => {
      setH2hData(data);
      setLoading(false);
    });
  }, [teamAId, teamBId]);

  const handleSelectA = (team: Team) => {
    if (team.id === teamBId) setTeamBId(teamAId);
    setTeamAId(team.id);
  };

  const handleSelectB = (team: Team) => {
    if (team.id === teamAId) setTeamAId(teamBId);
    setTeamBId(team.id);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Selects */}
      <div className="card p-4 flex gap-3 items-end">
        <TeamCombobox
          id="h2h-select-a"
          label="Seleção A"
          teams={teams}
          selectedId={teamAId}
          onSelect={handleSelectA}
          accentColor="var(--accent-cyan)"
        />

        <button
          id="h2h-swap-btn"
          onClick={() => { setTeamAId(teamBId); setTeamBId(teamAId); }}
          className="flex items-center justify-center rounded-xl shrink-0 mb-px transition-transform active:rotate-180"
          style={{
            width: 40, height: 46,
            background: "var(--border-subtle)",
            border: "1px solid var(--border-default)",
            color: "var(--text-secondary)",
            fontSize: 18,
          }}
          title="Inverter"
        >
          ⇄
        </button>

        <TeamCombobox
          id="h2h-select-b"
          label="Seleção B"
          teams={teams}
          selectedId={teamBId}
          onSelect={handleSelectB}
          accentColor="var(--accent-violet)"
        />
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl animate-pulse"
              style={{ height: i === 1 ? 200 : 120, background: "var(--border-subtle)" }}
            />
          ))}
        </div>
      )}

      {/* H2H result */}
      {!loading && h2hData && (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${teamAId}-${teamBId}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <H2HMatchup data={h2hData} />
          </motion.div>
        </AnimatePresence>
      )}

      {!loading && teamAId === teamBId && (
        <div className="flex flex-col items-center py-8 gap-2">
          <span style={{ fontSize: 36 }}>⚠️</span>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Escolha duas seleções diferentes.
          </p>
        </div>
      )}
    </div>
  );
}
