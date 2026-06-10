"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { H2HData, HistoricalMatch } from "@/types";
import { DominanceBar } from "@/components/ui/DominanceBar";

interface H2HMatchupProps {
  data: H2HData;
}

function MatchResult({
  match,
  perspectiveTeamId,
}: {
  match: HistoricalMatch;
  perspectiveTeamId: number;
}) {
  const isHome = match.homeTeam.id === perspectiveTeamId;
  const outcome =
    match.winner === "draw"
      ? "D"
      : (isHome && match.winner === "home") || (!isHome && match.winner === "away")
      ? "W"
      : "L";

  const outcomeColors: Record<string, React.CSSProperties> = {
    W: { backgroundColor: "rgba(52, 211, 153, 0.15)", color: "#34d399" },
    D: { backgroundColor: "rgba(82, 82, 82, 0.25)", color: "#a3a3a3" },
    L: { backgroundColor: "rgba(244, 63, 94, 0.15)", color: "#f43f5e" },
  };

  return (
    <span
      className="inline-flex items-center justify-center w-7 h-7 rounded-md text-xs font-bold"
      style={outcomeColors[outcome]}
    >
      {outcome}
    </span>
  );
}

function StatRow({
  label,
  valueA,
  valueB,
  highlight,
}: {
  label: string;
  valueA: string | number;
  valueB: string | number;
  highlight?: "A" | "B" | "none";
}) {
  return (
    <div
      className="flex items-center justify-between py-3"
      style={{ borderBottom: "1px solid var(--border-subtle)" }}
    >
      <span
        className="text-base font-bold tabular-nums"
        style={{ color: highlight === "A" ? "var(--accent-primary)" : "var(--text-primary)" }}
      >
        {valueA}
      </span>
      <span
        className="text-xs font-medium px-3 text-center"
        style={{ color: "var(--text-muted)", minWidth: "80px" }}
      >
        {label}
      </span>
      <span
        className="text-base font-bold tabular-nums"
        style={{ color: highlight === "B" ? "var(--text-secondary)" : "var(--text-primary)" }}
      >
        {valueB}
      </span>
    </div>
  );
}

export function H2HMatchup({ data }: H2HMatchupProps) {
  const { teamA, teamB, teamARecord, teamBRecord, recentMatches } = data;

  const avgGoalsA = (teamARecord.goalsScored / data.totalMatches).toFixed(2);
  const avgGoalsB = (teamBRecord.goalsScored / data.totalMatches).toFixed(2);
  const avgGAA = (teamARecord.goalsConceded / data.totalMatches).toFixed(2);
  const avgGAB = (teamBRecord.goalsConceded / data.totalMatches).toFixed(2);

  const highlightGoals = parseFloat(avgGoalsA) >= parseFloat(avgGoalsB) ? "A" : "B";
  const highlightCS = teamARecord.cleanSheets >= teamBRecord.cleanSheets ? "A" : "B";

  // Last 5 recent matches
  const last5 = recentMatches.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-4"
    >
      {/* ── Shield vs Shield ── */}
      <div className="card p-5 relative overflow-hidden">

        <div className="flex items-center justify-between relative z-10">
          {/* Team A */}
          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <div
              className="relative flex items-center justify-center rounded-md"
              style={{
                width: 80,
                height: 80,
                background: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <Image
                src={teamA.logo}
                alt={teamA.name}
                width={60}
                height={60}
                style={{ objectFit: "contain" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div className="text-center">
              <p className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
                {teamA.shortName}
              </p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                {teamA.confederation}
              </p>
            </div>
          </motion.div>

          {/* VS Badge */}
          <div className="flex flex-col items-center gap-1">
            <span
              className="text-2xl font-black tracking-tight"
              style={{ color: "var(--text-muted)" }}
            >
              VS
            </span>
            <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
              {data.totalMatches} jogos
            </span>
          </div>

          {/* Team B */}
          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <div
              className="relative flex items-center justify-center rounded-md"
              style={{
                width: 80,
                height: 80,
                background: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <Image
                src={teamB.logo}
                alt={teamB.name}
                width={60}
                height={60}
                style={{ objectFit: "contain" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div className="text-center">
              <p className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
                {teamB.shortName}
              </p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                {teamB.confederation}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Dominance Bar */}
        <div className="mt-6 relative z-10">
          <DominanceBar
            labelA={teamA.shortName}
            labelB={teamB.shortName}
            winsA={teamARecord.wins}
            draws={teamARecord.draws}
            winsB={teamBRecord.wins}
          />
        </div>
      </div>

      {/* ── Stats Comparison Grid ── */}
      <motion.div
        className="card p-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <h3
          className="text-xs font-semibold uppercase tracking-widest mb-1"
          style={{ color: "var(--text-muted)" }}
        >
          Comparativo
        </h3>

        <StatRow
          label="Média de Gols"
          valueA={avgGoalsA}
          valueB={avgGoalsB}
          highlight={highlightGoals}
        />
        <StatRow
          label="Gols Sofridos / Jogo"
          valueA={avgGAA}
          valueB={avgGAB}
          highlight={parseFloat(avgGAA) <= parseFloat(avgGAB) ? "A" : "B"}
        />
        <StatRow
          label="Clean Sheets"
          valueA={teamARecord.cleanSheets}
          valueB={teamBRecord.cleanSheets}
          highlight={highlightCS}
        />
        <StatRow
          label="Vitórias"
          valueA={teamARecord.wins}
          valueB={teamBRecord.wins}
          highlight={teamARecord.wins >= teamBRecord.wins ? "A" : "B"}
        />
        <StatRow
          label="Gols Marcados"
          valueA={teamARecord.goalsScored}
          valueB={teamBRecord.goalsScored}
          highlight={teamARecord.goalsScored >= teamBRecord.goalsScored ? "A" : "B"}
        />
      </motion.div>

      {/* ── Recent Matches ── */}
      <motion.div
        className="card p-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <h3
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: "var(--text-muted)" }}
        >
          Últimos Confrontos
        </h3>

        <div className="flex flex-col gap-2">
          {last5.map((match, i) => {
            const date = new Date(match.date).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            });

            return (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.06, duration: 0.3 }}
                className="flex items-center gap-3 py-2"
                style={{ borderBottom: i < last5.length - 1 ? "1px solid var(--border-subtle)" : "none" }}
              >
                {/* Outcomes from teamA perspective */}
                <MatchResult match={match} perspectiveTeamId={teamA.id} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="text-sm font-medium truncate"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {match.homeTeam.shortName}
                      <span className="font-bold mx-1" style={{ color: "var(--text-secondary)" }}>
                        {match.score.home}–{match.score.away}
                      </span>
                      {match.awayTeam.shortName}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {date}
                    </span>
                    {match.stage && (
                      <>
                        <span className="text-xs" style={{ color: "var(--border-strong)" }}>·</span>
                        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                          {match.stage}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <span
                  className="text-xs px-2 py-1 rounded-md shrink-0"
                  style={{
                    background: "var(--border-subtle)",
                    color: "var(--text-muted)",
                  }}
                >
                  {match.tournament.replace("FIFA ", "")}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
