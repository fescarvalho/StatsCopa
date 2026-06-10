import type { MatchFixture, MatchLineup, MatchStats } from "@/types";
import { ALL_WC2026_TEAMS } from "@/data/teams.data";

const t = (id: number) => ALL_WC2026_TEAMS.find((x) => x.id === id)!;

// ─── Partidas Copa 2026 ───────────────────────────────────────────────────────
const FIXTURES: MatchFixture[] = [];

// ─── Lineups (para jogos selecionados) ───────────────────────────────────────
const LINEUPS: Record<number, MatchLineup> = {};

// ─── Estatísticas por jogo ────────────────────────────────────────────────────
const MATCH_STATS: Record<number, MatchStats> = {};

// ─── Services ─────────────────────────────────────────────────────────────────
export async function getFixtures(): Promise<MatchFixture[]> {
  /**
   * Em produção:
   * const res = await fetch(
   *   "https://v3.football.api-sports.io/fixtures?league=1&season=2026",
   *   { headers: { "x-apisports-key": process.env.API_FOOTBALL_KEY! }, next: { revalidate: 43200 } }
   * );
   */
  return FIXTURES.map((f) => ({
    ...f,
    status: "NS",
    statusShort: "NS",
    score: { fulltime: { home: 0, away: 0 }, halftime: { home: 0, away: 0 }, extratime: null, penalty: null },
    winner: null,
  }));
}

export async function getFixtureById(id: number): Promise<MatchFixture | null> {
  const f = FIXTURES.find((x) => x.id === id);
  if (!f) return null;
  return {
    ...f,
    status: "NS",
    statusShort: "NS",
    score: { fulltime: { home: 0, away: 0 }, halftime: { home: 0, away: 0 }, extratime: null, penalty: null },
    winner: null,
  };
}

export async function getMatchLineup(fixtureId: number): Promise<MatchLineup | null> {
  // Retorna nulo pois o jogo ainda não aconteceu e as escalações não saíram
  return null;
}

export async function getMatchStats(fixtureId: number): Promise<MatchStats | null> {
  // Retorna nulo pois não há estatísticas de jogo não iniciado
  return null;
}

export { FIXTURES };
