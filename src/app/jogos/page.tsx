import type { Metadata } from "next";
import Link from "next/link";
import { getFixtures } from "@/services/matches.service";
import type { MatchFixture } from "@/types";
import { FixtureCard } from "@/components/matches/FixtureCard";

export const revalidate = 43200;

const ROUND_ORDER = ["Final", "Terceiro lugar", "Semifinal", "Quartas de Final", "Oitavas de Final", "Grupo A", "Grupo B", "Grupo C", "Grupo D", "Grupo E", "Grupo F", "Grupo G", "Grupo H"];

export default async function JogosPage() {
  const fixtures = await getFixtures();

  // Agrupar por rodada
  const grouped: Record<string, MatchFixture[]> = {};
  for (const f of fixtures) {
    if (!grouped[f.round]) grouped[f.round] = [];
    grouped[f.round].push(f);
  }

  const sortedRounds = Object.keys(grouped).sort(
    (a, b) => ROUND_ORDER.indexOf(a) - ROUND_ORDER.indexOf(b)
  );

  return (
    <main className="min-h-dvh px-4 pt-4 pb-10">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/" className="flex items-center justify-center rounded-xl"
          style={{ width: 38, height: 38, background: "var(--border-subtle)", color: "var(--text-secondary)", fontSize: 18 }}
          aria-label="Voltar"
        >←</Link>
        <div>
          <h1 className="text-xl font-black tracking-tight leading-none" style={{ color: "var(--text-primary)" }}>
            Jogos
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            Copa do Mundo 2026 · Todos os jogos
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {sortedRounds.map((round) => (
          <div key={round}>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-px flex-1" style={{ background: "var(--border-subtle)" }} />
              <span className="text-xs font-semibold uppercase tracking-widest px-2"
                style={{ color: "var(--accent-cyan)" }}
              >
                {round}
              </span>
              <div className="h-px flex-1" style={{ background: "var(--border-subtle)" }} />
            </div>
            <div className="flex flex-col gap-2">
              {grouped[round].map((f) => <FixtureCard key={f.id} fixture={f} />)}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
