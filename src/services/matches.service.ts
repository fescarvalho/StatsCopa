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
  try {
    const key = process.env.NEXT_PUBLIC_API_FOOTBALL_KEY;
    if (!key) throw new Error("No API key");

    const res = await fetch(
      "https://v3.football.api-sports.io/fixtures?league=1&season=2026",
      { headers: { "x-apisports-key": key }, next: { revalidate: 43200 } }
    );
    
    if (!res.ok) throw new Error("API request failed");
    
    const json = await res.json();
    if (!json.response || json.response.length === 0) {
      return FIXTURES; // fallback
    }

    return json.response.map((item: any): MatchFixture => {
      const homeTeam = t(item.teams.home.id) || { id: item.teams.home.id, name: item.teams.home.name, shortName: "UNK", logo: item.teams.home.logo, country: item.teams.home.name, confederation: "UEFA" };
      const awayTeam = t(item.teams.away.id) || { id: item.teams.away.id, name: item.teams.away.name, shortName: "UNK", logo: item.teams.away.logo, country: item.teams.away.name, confederation: "UEFA" };
      
      const winner = item.teams.home.winner ? "home" : item.teams.away.winner ? "away" : item.teams.home.winner === false && item.teams.away.winner === false ? "draw" : null;

      return {
        id: item.fixture.id,
        date: item.fixture.date,
        status: item.fixture.status.short,
        statusShort: item.fixture.status.short,
        round: item.league.round,
        venue: {
          name: item.fixture.venue.name || "TBA",
          city: item.fixture.venue.city || "TBA"
        },
        homeTeam,
        awayTeam,
        score: {
          fulltime: { home: item.score.fulltime.home ?? 0, away: item.score.fulltime.away ?? 0 },
          halftime: { home: item.score.halftime.home ?? 0, away: item.score.halftime.away ?? 0 },
          extratime: item.score.extratime.home !== null ? { home: item.score.extratime.home, away: item.score.extratime.away } : null,
          penalty: item.score.penalty.home !== null ? { home: item.score.penalty.home, away: item.score.penalty.away } : null,
        },
        winner,
      };
    });
  } catch (error) {
    console.error("Failed to fetch fixtures:", error);
    return FIXTURES.map((f) => ({
      ...f,
      status: "NS",
      statusShort: "NS",
      score: { fulltime: { home: 0, away: 0 }, halftime: { home: 0, away: 0 }, extratime: null, penalty: null },
      winner: null,
    }));
  }
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
