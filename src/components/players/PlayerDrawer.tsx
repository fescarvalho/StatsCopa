"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { PlayerStats } from "@/types";
import { StatProgress } from "@/components/ui/StatProgress";
import { fetchPlayerStats } from "@/services/players.service";

interface PlayerDrawerProps {
  playerId: number | null;
  playerName: string;
  onClose: () => void;
}

type Tab = "ofensivo" | "criacao" | "defensivo";

const TABS: { id: Tab; label: string; emoji: string }[] = [
  { id: "ofensivo", label: "Ofensivo", emoji: "⚽" },
  { id: "criacao", label: "Criação", emoji: "🎯" },
  { id: "defensivo", label: "Defensivo", emoji: "🛡️" },
];

function OffensiveTab({ stats }: { stats: PlayerStats }) {
  const { offensive } = stats;
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Gols", value: offensive.goals, color: "var(--accent-primary)" },
          { label: "Assistências", value: offensive.assists, color: "var(--text-secondary)" },
          { label: "Hat-tricks", value: offensive.hatTricks, color: "var(--text-primary)" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center py-4 rounded-md"
            style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}
          >
            <span className="text-2xl font-bold tabular-nums" style={{ color: stat.color }}>
              {stat.value}
            </span>
            <span className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <StatProgress
          label="Finalizações"
          value={offensive.shots}
          maxValue={25}
          variant="cyan"
        />
        <StatProgress
          label="No Alvo"
          value={offensive.shotsOnTarget}
          maxValue={15}
          displayValue={`${offensive.shotsOnTarget} (${offensive.shotsOnTargetPct}%)`}
          variant="cyan"
        />
        <StatProgress
          label="Dribles Tentados"
          value={offensive.dribbles}
          maxValue={40}
          variant="violet"
        />
        <StatProgress
          label="Dribles Bem-sucedidos"
          value={offensive.dribblesSucceeded}
          maxValue={30}
          displayValue={`${offensive.dribblesSucceeded} (${offensive.dribbleSuccessPct}%)`}
          variant="violet"
        />
        {offensive.penaltyGoals > 0 && (
          <StatProgress
            label="Pênaltis Convertidos"
            value={offensive.penaltyGoals}
            maxValue={5}
            variant="amber"
          />
        )}
        <div
          className="flex items-center justify-between py-3 px-4 rounded-md"
          style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}
        >
          <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
            Minutos por Gol
          </span>
          <span className="text-sm font-bold tabular-nums" style={{ color: "var(--accent-primary)" }}>
            {offensive.minutesPerGoal === 999 ? "—" : `${offensive.minutesPerGoal}'`}
          </span>
        </div>
      </div>
    </div>
  );
}

function CreationTab({ stats }: { stats: PlayerStats }) {
  const { creation } = stats;
  return (
    <div className="flex flex-col gap-3">
      <StatProgress
        label="Passes-chave"
        value={creation.keyPasses}
        maxValue={25}
        variant="violet"
      />
      <StatProgress
        label="Chances Criadas"
        value={creation.chanceCreated}
        maxValue={30}
        variant="violet"
      />
      <StatProgress
        label="Grandes Chances Criadas"
        value={creation.bigChancesCreated}
        maxValue={10}
        variant="amber"
      />
      <StatProgress
        label="Precisão de Passe"
        value={creation.passAccuracy}
        maxValue={100}
        displayValue={`${creation.passAccuracy}%`}
        variant="cyan"
      />
      <StatProgress
        label="Bola Longa (%)"
        value={creation.longBallAccuracy}
        maxValue={100}
        displayValue={`${creation.longBallAccuracy}%`}
        variant="cyan"
      />
      <StatProgress
        label="Crosses"
        value={creation.crosses}
        maxValue={40}
        variant="emerald"
      />
      <StatProgress
        label="Precisão de Crosses"
        value={creation.crossAccuracy}
        maxValue={100}
        displayValue={`${creation.crossAccuracy}%`}
        variant="emerald"
      />
      <StatProgress
        label="Passes Progressivos"
        value={creation.progressivePasses}
        maxValue={60}
        variant="violet"
      />
    </div>
  );
}

function DefensiveTab({ stats }: { stats: PlayerStats }) {
  const { defensive } = stats;
  return (
    <div className="flex flex-col gap-3">
      <StatProgress
        label="Desarmes"
        value={defensive.tackles}
        maxValue={25}
        variant="emerald"
      />
      <StatProgress
        label="Desarmes com Êxito"
        value={defensive.tacklesSucceeded}
        maxValue={20}
        displayValue={`${defensive.tacklesSucceeded} (${defensive.tackleSuccessPct}%)`}
        variant="emerald"
      />
      <StatProgress
        label="Interceptações"
        value={defensive.interceptions}
        maxValue={15}
        variant="cyan"
      />
      <StatProgress
        label="Bloqueios"
        value={defensive.blocks}
        maxValue={10}
        variant="cyan"
      />
      <StatProgress
        label="Cortes"
        value={defensive.clearances}
        maxValue={15}
        variant="violet"
      />
      <StatProgress
        label="Duelos Aéreos (%)"
        value={defensive.aerialDuelsWon}
        maxValue={defensive.aerialDuelsTotal || 1}
        displayValue={`${defensive.aerialDuelsWon}/${defensive.aerialDuelsTotal} (${defensive.aerialSuccessPct}%)`}
        variant="violet"
      />
      <div className="grid grid-cols-3 gap-3 mt-1">
        {[
          { label: "Faltas", value: defensive.foulsCommitted, color: "var(--text-secondary)" },
          { label: "Amarelos", value: defensive.yellowCards, color: "var(--accent-amber)" },
          { label: "Vermelhos", value: defensive.redCards, color: "var(--accent-rose)" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center py-3 rounded-md"
            style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}
          >
            <span className="text-xl font-bold tabular-nums" style={{ color: stat.color }}>
              {stat.value}
            </span>
            <span className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PlayerDrawer({ playerId, playerName, onClose }: PlayerDrawerProps) {
  const [activeTab, setActiveTab] = useState<Tab>("ofensivo");
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async (id: number) => {
    setLoading(true);
    const data = await fetchPlayerStats(id);
    setStats(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (playerId !== null) {
      setActiveTab("ofensivo");
      setStats(null);
      load(playerId);
    }
  }, [playerId, load]);

  // Close on backdrop click / escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const isOpen = playerId !== null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="drawer-panel"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320, mass: 0.8 }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div
                className="rounded-full"
                style={{ width: 36, height: 4, background: "var(--border-strong)" }}
              />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3">
              {stats && (
                <div className="flex items-center gap-3">
                  <div
                    className="rounded-md overflow-hidden"
                    style={{ width: 44, height: 44, background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}
                  >
                    <Image
                      src={stats.player.photo}
                      alt={stats.player.name}
                      width={44}
                      height={44}
                      style={{ objectFit: "cover" }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).parentElement!.innerHTML = "⚽";
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
                      {stats.player.name}
                    </p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {stats.player.team.name} · {stats.player.position} · #{stats.player.number}
                    </p>
                  </div>
                </div>
              )}
              {!stats && (
                <p className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
                  {playerName}
                </p>
              )}
              <button
                id="drawer-close-btn"
                onClick={onClose}
                className="flex items-center justify-center rounded-full"
                style={{
                  width: 32,
                  height: 32,
                  background: "var(--border-default)",
                  color: "var(--text-secondary)",
                  fontSize: 18,
                }}
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>

            {/* Rating banner */}
            {stats && (
              <div
                className="mx-4 mb-3 flex items-center justify-between px-4 py-2.5 rounded-md"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-default)",
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Partidas</p>
                    <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                      {stats.gamesPlayed}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Minutos</p>
                    <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                      {stats.minutesPlayed}&apos;
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Torneio</p>
                    <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                      Copa 2026
                    </p>
                  </div>
                </div>
                <div
                  className="flex flex-col items-center justify-center rounded-md px-3 py-2"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <span className="text-xl font-bold" style={{ color: "var(--accent-primary)" }}>
                    {stats.rating.toFixed(1)}
                  </span>
                  <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>Rating</span>
                </div>
              </div>
            )}

            {/* Tabs */}
            <div
              className="flex mx-4 mb-4 rounded-xl p-1 gap-1"
              style={{ background: "var(--border-subtle)" }}
            >
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  id={`drawer-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                  style={{
                    background: activeTab === tab.id ? "var(--bg-surface)" : "transparent",
                    color: activeTab === tab.id ? "var(--text-primary)" : "var(--text-muted)",
                    border: activeTab === tab.id ? "1px solid var(--border-default)" : "1px solid transparent",
                  }}
                >
                  <span>{tab.emoji}</span>
                  <span className="text-xs">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="px-4 pb-6">
              {loading && (
                <div className="flex flex-col gap-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="h-10 rounded-xl animate-pulse"
                      style={{ background: "var(--border-subtle)" }}
                    />
                  ))}
                </div>
              )}
              {!loading && stats && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {activeTab === "ofensivo" && <OffensiveTab stats={stats} />}
                    {activeTab === "criacao" && <CreationTab stats={stats} />}
                    {activeTab === "defensivo" && <DefensiveTab stats={stats} />}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
