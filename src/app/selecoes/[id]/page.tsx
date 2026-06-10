import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTeamProfile } from "@/services/teams.service";
import { SquadList } from "@/components/teams/SquadList";
import { StatProgress } from "@/components/ui/StatProgress";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const profile = await getTeamProfile(Number(id));
  return {
    title: `${profile?.team.name ?? "Seleção"} — StatsCopa 2026`,
    description: `Elenco e estatísticas de ${profile?.team.name} na Copa do Mundo FIFA 2026.`,
  };
}

export const revalidate = 43200;

export default async function SelecaoProfilePage({ params }: PageProps) {
  const { id } = await params;
  const profile = await getTeamProfile(Number(id));
  if (!profile) notFound();

  const { team, coach, formation, stats, squad } = profile;

  return (
    <main className="min-h-dvh px-4 pt-4 pb-10">
      {/* Header nav */}
      <div className="flex items-center gap-3 mb-5">
        <Link href="/selecoes" className="flex items-center justify-center rounded-md"
          style={{ width: 38, height: 38, background: "var(--bg-surface)", color: "var(--text-secondary)", fontSize: 18, border: "1px solid var(--border-subtle)" }}
          aria-label="Voltar"
        >←</Link>
        <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Seleções</span>
      </div>

      {/* Team Hero */}
      <div
        className="card p-5 mb-4 relative overflow-hidden"
        style={{
          background: "var(--bg-card)",
        }}
      >

        <div className="relative z-10 flex items-center gap-4">
          <div
            className="relative rounded-md overflow-hidden flex items-center justify-center"
            style={{ width: 72, height: 72, background: "var(--bg-surface)", border: "1px solid var(--border-default)" }}
          >
            <Image
              src={team.logo}
              alt={team.name}
              fill
              style={{ objectFit: "contain", padding: "8px" }}
            />
          </div>
          <div>
            <h1 className="text-2xl font-black" style={{ color: "var(--text-primary)" }}>{team.name}</h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {team.confederation} · Copa 2026
            </p>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="text-xs px-2 py-0.5 rounded-sm" style={{ background: "var(--bg-surface)", color: "var(--text-secondary)", border: "1px solid var(--border-subtle)" }}>
                🧑‍💼 {coach}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-sm" style={{ background: "var(--bg-surface)", color: "var(--text-secondary)", border: "1px solid var(--border-subtle)" }}>
                {formation}
              </span>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="relative z-10 grid grid-cols-4 gap-2 mt-4 pt-4" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          {[
            { label: "Pts", value: stats.points, color: "var(--text-primary)" },
            { label: "Gols", value: stats.goalsFor, color: "var(--accent-primary)" },
            { label: "Sofridos", value: stats.goalsAgainst, color: "var(--accent-rose)" },
            { label: "Clean Sheets", value: stats.cleanSheets, color: "var(--text-primary)" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center py-2 rounded-md"
              style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}
            >
              <span className="text-xl font-bold tabular-nums" style={{ color: s.color }}>{s.value}</span>
              <span className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Performance bars */}
      <div className="card p-4 mb-4 flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
          Performance no Torneio
        </h2>
        <StatProgress label="Posse de Bola" value={stats.avgPossession} maxValue={100}
          displayValue={`${stats.avgPossession}%`} variant="emerald" />
        <StatProgress label="Precisão de Passes" value={stats.avgPassAccuracy} maxValue={100}
          displayValue={`${stats.avgPassAccuracy}%`} variant="violet" />
        <StatProgress label="Finalizações/Jogo" value={stats.avgShotsOnTarget} maxValue={10}
          displayValue={stats.avgShotsOnTarget.toFixed(1)} variant="amber" />
        <div className="flex items-center justify-between py-2 px-3 rounded-md"
          style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}
        >
          <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Saldo de Gols</span>
          <span className="text-sm font-bold tabular-nums" style={{ color: stats.goalsDiff >= 0 ? "var(--accent-primary)" : "var(--accent-rose)" }}>
            {stats.goalsDiff >= 0 ? `+${stats.goalsDiff}` : stats.goalsDiff}
          </span>
        </div>
      </div>

      {/* Elenco */}
      <div className="mb-3">
        <h2 className="text-base font-black" style={{ color: "var(--text-primary)" }}>
          Elenco <span className="text-sm font-normal" style={{ color: "var(--text-muted)" }}>— toque para ver stats</span>
        </h2>
      </div>

      <SquadList squad={squad} team={team} />
    </main>
  );
}
