"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Team } from "@/types";

interface TeamGridProps {
  teams: Team[];
}

const CONF_LABELS: Record<string, string> = {
  CONMEBOL: "América do Sul",
  UEFA: "Europa",
  CONCACAF: "América Norte/Central",
  CAF: "África",
  AFC: "Ásia",
  OFC: "Oceania",
};

export function TeamGrid({ teams }: TeamGridProps) {
  const [query, setQuery] = useState("");
  const [selectedConf, setSelectedConf] = useState<string>("TODAS");

  const confs = ["TODAS", ...Array.from(new Set(teams.map((t) => t.confederation)))];

  const filtered = useMemo(() => {
    return teams.filter((t) => {
      const matchQuery = t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.shortName.toLowerCase().includes(query.toLowerCase());
      const matchConf = selectedConf === "TODAS" || t.confederation === selectedConf;
      return matchQuery && matchConf;
    });
  }, [teams, query, selectedConf]);

  return (
    <div className="flex flex-col gap-4">
      {/* Search Input */}
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-2xl"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)" }}
      >
        <span style={{ color: "var(--text-muted)", fontSize: 18 }}>🔍</span>
        <input
          id="team-search-input"
          type="text"
          placeholder="Buscar seleção..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent text-sm outline-none placeholder:opacity-40"
          style={{ color: "var(--text-primary)" }}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Confederation Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
        {confs.map((conf) => (
          <button
            key={conf}
            id={`conf-filter-${conf}`}
            onClick={() => setSelectedConf(conf)}
            className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
            style={{
              background: selectedConf === conf ? "var(--accent-cyan)" : "var(--border-subtle)",
              color: selectedConf === conf ? "#0a0a0a" : "var(--text-secondary)",
              border: selectedConf === conf ? "none" : "1px solid var(--border-default)",
            }}
          >
            {conf === "TODAS" ? "Todas" : conf}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
        {filtered.length} seleção{filtered.length !== 1 ? "ões" : ""} encontrada{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map((team, i) => (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03, duration: 0.3 }}
          >
            <Link href={`/selecoes/${team.id}`} className="block">
              <div
                className="card flex flex-col items-center gap-3 p-4 active:scale-95 transition-transform"
              >
                <div
                  className="relative rounded-xl overflow-hidden flex items-center justify-center"
                  style={{
                    width: 56, height: 56,
                    background: "var(--border-subtle)",
                    border: "1px solid var(--border-default)",
                  }}
                >
                  <Image
                    src={team.logo}
                    alt={team.name}
                    fill
                    style={{ objectFit: "contain", padding: "6px" }}
                    onError={(e) => {
                      const el = e.target as HTMLImageElement;
                      el.parentElement!.innerHTML = `<span style="font-size:24px">🏳️</span>`;
                    }}
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold truncate w-full" style={{ color: "var(--text-primary)" }}>
                    {team.shortName}
                  </p>
                  <p className="text-xs truncate w-full mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {CONF_LABELS[team.confederation] ?? team.confederation}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center py-12 gap-3">
          <span style={{ fontSize: 40 }}>🔍</span>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Nenhuma seleção encontrada para &quot;{query}&quot;
          </p>
        </div>
      )}
    </div>
  );
}
