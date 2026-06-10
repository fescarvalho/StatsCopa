import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getFixtureById, getMatchLineup, getMatchStats } from "@/services/matches.service";
import { MatchTabView } from "@/components/matches/MatchTabView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const fixture = await getFixtureById(Number(id));
  if (!fixture) return { title: "Jogo — StatsCopa 2022" };
  return {
    title: `${fixture.homeTeam.shortName} vs ${fixture.awayTeam.shortName} — StatsCopa 2022`,
    description: `${fixture.round} · ${fixture.homeTeam.name} ${fixture.score.fulltime.home}–${fixture.score.fulltime.away} ${fixture.awayTeam.name}`,
  };
}

export const revalidate = 43200;

export default async function JogoPage({ params }: PageProps) {
  const { id } = await params;
  const fixtureId = Number(id);

  const [fixture, lineup, stats] = await Promise.all([
    getFixtureById(fixtureId),
    getMatchLineup(fixtureId),
    getMatchStats(fixtureId),
  ]);

  if (!fixture) notFound();

  return (
    <main className="min-h-dvh px-4 pt-4 pb-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <Link href="/jogos" className="flex items-center justify-center rounded-xl"
          style={{ width: 38, height: 38, background: "var(--border-subtle)", color: "var(--text-secondary)", fontSize: 18 }}
          aria-label="Voltar"
        >←</Link>
        <div>
          <h1 className="text-xl font-black tracking-tight leading-none" style={{ color: "var(--text-primary)" }}>
            {fixture.homeTeam.shortName} vs {fixture.awayTeam.shortName}
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            {fixture.round} · Copa do Mundo 2022
          </p>
        </div>
      </div>

      <MatchTabView fixture={fixture} lineup={lineup} stats={stats} />
    </main>
  );
}
