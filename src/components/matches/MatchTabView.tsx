"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { MatchFixture, MatchLineup, MatchStats } from "@/types";
import { StatProgress } from "@/components/ui/StatProgress";

interface MatchTabViewProps {
  fixture: MatchFixture;
  lineup: MatchLineup | null;
  stats: MatchStats | null;
}

type Tab = "resumo" | "escalacoes" | "estatisticas";

const TABS: { id: Tab; label: string; emoji: string }[] = [
  { id: "resumo", label: "Resumo", emoji: "📋" },
  { id: "escalacoes", label: "Escalações", emoji: "🏟️" },
  { id: "estatisticas", label: "Estatísticas", emoji: "📊" },
];

const STATUS_LABELS: Record<string, string> = {
  NS: "Não iniciado",
  FT: "Encerrado",
  FT_PEN: "Encerrado (pens.)",
  AET: "Após Prorrogação",
  HT: "Intervalo",
  "1H": "1° Tempo",
  "2H": "2° Tempo",
  ET: "Prorrogação",
  PEN: "Pênaltis",
};

function ScoreHeader({ fixture }: { fixture: MatchFixture }) {
  const { homeTeam, awayTeam, score, status, statusShort } = fixture;
  const isPen = status === "FT_PEN";
  const isNotStarted = status === "NS";

  return (
    <div
      className="card p-5 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(34,211,238,0.05) 0%, rgba(139,92,246,0.05) 100%)",
      }}
    >
      {/* Glow blobs */}
      <div className="absolute -top-10 -left-10 w-28 h-28 rounded-full blur-3xl opacity-15" style={{ background: "var(--accent-cyan)" }} />
      <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-3xl opacity-10" style={{ background: "var(--accent-violet)" }} />

      <div className="relative z-10 flex items-center justify-between gap-2">
        {/* Home */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="relative w-14 h-14">
            <Image src={homeTeam.logo} alt={homeTeam.name} fill style={{ objectFit: "contain" }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </div>
          <p className="text-sm font-bold text-center" style={{ color: "var(--text-primary)" }}>
            {homeTeam.shortName}
          </p>
        </div>

        {/* Score */}
        <div className="flex flex-col items-center gap-1">
          {isNotStarted ? (
            <p className="text-xl font-black" style={{ color: "var(--text-muted)" }}>VS</p>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-3xl font-black tabular-nums" style={{ color: "var(--text-primary)" }}>
                {score.fulltime.home}
              </span>
              <span className="text-xl" style={{ color: "var(--text-muted)" }}>–</span>
              <span className="text-3xl font-black tabular-nums" style={{ color: "var(--text-primary)" }}>
                {score.fulltime.away}
              </span>
            </div>
          )}
          {isPen && score.penalty && (
            <p className="text-xs font-medium" style={{ color: "var(--accent-cyan)" }}>
              ({score.penalty.home} – {score.penalty.away} pens.)
            </p>
          )}
          {score.extratime && (score.extratime.home !== null) && !isPen && (
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Prorrogação {score.extratime.home}–{score.extratime.away}
            </p>
          )}
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1"
            style={{ background: "var(--border-subtle)", color: "var(--text-muted)" }}
          >
            {STATUS_LABELS[statusShort] ?? STATUS_LABELS[status] ?? status}
          </span>
        </div>

        {/* Away */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="relative w-14 h-14">
            <Image src={awayTeam.logo} alt={awayTeam.name} fill style={{ objectFit: "contain" }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </div>
          <p className="text-sm font-bold text-center" style={{ color: "var(--text-primary)" }}>
            {awayTeam.shortName}
          </p>
        </div>
      </div>

      {/* Meta */}
      <div className="relative z-10 flex items-center justify-center gap-3 mt-4 pt-3"
        style={{ borderTop: "1px solid var(--border-subtle)" }}
      >
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>{fixture.round}</span>
        <span style={{ color: "var(--border-strong)" }}>·</span>
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>{fixture.venue.name}</span>
        <span style={{ color: "var(--border-strong)" }}>·</span>
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
          {new Date(fixture.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
        </span>
      </div>
    </div>
  );
}

function ResumoTab({ fixture }: { fixture: MatchFixture }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="card p-4">
        <h3 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
          Resultado Final
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Placar", value: `${fixture.score.fulltime.home}–${fixture.score.fulltime.away}` },
            { label: "Intervalo", value: `${fixture.score.halftime.home}–${fixture.score.halftime.away}` },
            { label: "Fase", value: fixture.round },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center py-3 rounded-xl"
              style={{ background: "var(--border-subtle)" }}
            >
              <span className="text-base font-black" style={{ color: "var(--accent-cyan)" }}>{item.value}</span>
              <span className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{item.label}</span>
            </div>
          ))}
        </div>
        {fixture.score.penalty && (
          <div className="mt-3 flex items-center justify-center gap-2 py-2 rounded-xl"
            style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)" }}
          >
            <span className="text-sm font-bold" style={{ color: "var(--accent-violet)" }}>
              Pênaltis: {fixture.score.penalty.home} – {fixture.score.penalty.away}
            </span>
          </div>
        )}
      </div>
      <div className="card p-4 flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
          Local
        </p>
        <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>{fixture.venue.name}</p>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>{fixture.venue.city}, Qatar — Copa do Mundo 2022</p>
      </div>
    </div>
  );
}

function EscalacoesTab({ fixture, lineup }: { fixture: MatchFixture; lineup: MatchLineup | null }) {
  const isConfirmed = fixture.status !== "NS";

  if (!lineup) {
    return (
      <div className="flex flex-col items-center py-10 gap-3">
        <span style={{ fontSize: 36 }}>🏟️</span>
        <p className="text-sm text-center" style={{ color: "var(--text-muted)" }}>
          {isConfirmed ? "Escalações não disponíveis para esta partida." : "Escalações serão divulgadas próximo ao jogo."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        {[lineup.home, lineup.away].map((team, idx) => (
          <div key={team.team.id} className="card p-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="relative w-6 h-6">
                <Image src={team.team.logo} alt={team.team.name} fill style={{ objectFit: "contain" }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
              <div>
                <p className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>{team.team.shortName}</p>
                <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{team.formation}</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              {team.startXI.map((p) => (
                <div key={p.id} className="flex items-center gap-2">
                  <span className="text-[10px] tabular-nums w-4 text-right shrink-0" style={{ color: "var(--text-muted)" }}>
                    {p.number}
                  </span>
                  <span className="text-xs truncate" style={{ color: "var(--text-primary)" }}>{p.name}</span>
                </div>
              ))}
            </div>

            {team.substitutes.length > 0 && (
              <div className="mt-3 pt-2" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
                  Reservas
                </p>
                {team.substitutes.map((p) => (
                  <div key={p.id} className="flex items-center gap-2">
                    <span className="text-[10px] tabular-nums w-4 text-right shrink-0" style={{ color: "var(--text-muted)" }}>
                      {p.number}
                    </span>
                    <span className="text-[11px] truncate" style={{ color: "var(--text-secondary)" }}>{p.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 justify-center text-xs" style={{ color: "var(--text-muted)" }}>
        <span>Técnico {lineup.home.team.shortName}: {lineup.home.coach}</span>
        <span>·</span>
        <span>Técnico {lineup.away.team.shortName}: {lineup.away.coach}</span>
      </div>
    </div>
  );
}

function EstatisticasTab({ fixture, stats }: { fixture: MatchFixture; stats: MatchStats | null }) {
  if (!stats) {
    return (
      <div className="flex flex-col items-center py-10 gap-3">
        <span style={{ fontSize: 36 }}>📊</span>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Estatísticas não disponíveis.</p>
      </div>
    );
  }

  return (
    <div className="card p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-bold" style={{ color: "var(--accent-cyan)" }}>{fixture.homeTeam.shortName}</span>
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Estatísticas</span>
        <span className="text-xs font-bold" style={{ color: "var(--accent-violet)" }}>{fixture.awayTeam.shortName}</span>
      </div>

      {stats.items.map((item) => {
        const hRaw = item.homeRaw ?? 0;
        const aRaw = item.awayRaw ?? 0;
        const max = item.maxRaw ?? Math.max(hRaw, aRaw, 1);
        const hPct = (hRaw / max) * 100;
        const aPct = (aRaw / max) * 100;

        return (
          <div key={item.label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-bold tabular-nums" style={{ color: "var(--accent-cyan)" }}>{item.home}</span>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>{item.label}</span>
              <span className="text-sm font-bold tabular-nums" style={{ color: "var(--accent-violet)" }}>{item.away}</span>
            </div>
            <div className="flex gap-1 h-1.5 rounded-full overflow-hidden">
              <div style={{ width: `${hPct}%`, background: "var(--accent-cyan)", borderRadius: "999px 0 0 999px", transition: "width 0.6s ease" }} />
              <div style={{ flex: 1, background: "var(--border-subtle)" }} />
              <div style={{ width: `${aPct}%`, background: "var(--accent-violet)", borderRadius: "0 999px 999px 0", transition: "width 0.6s ease" }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function MatchTabView({ fixture, lineup, stats }: MatchTabViewProps) {
  const [activeTab, setActiveTab] = useState<Tab>("resumo");

  return (
    <div className="flex flex-col gap-4">
      <ScoreHeader fixture={fixture} />

      {/* Tabs */}
      <div className="flex rounded-xl p-1 gap-1" style={{ background: "var(--border-subtle)" }}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            id={`match-tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200"
            style={{
              background: activeTab === tab.id ? "var(--bg-surface)" : "transparent",
              color: activeTab === tab.id ? "var(--text-primary)" : "var(--text-muted)",
              border: activeTab === tab.id ? "1px solid var(--border-default)" : "1px solid transparent",
            }}
          >
            <span>{tab.emoji}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "resumo" && <ResumoTab fixture={fixture} />}
          {activeTab === "escalacoes" && <EscalacoesTab fixture={fixture} lineup={lineup} />}
          {activeTab === "estatisticas" && <EstatisticasTab fixture={fixture} stats={stats} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
