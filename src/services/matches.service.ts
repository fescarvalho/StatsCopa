import type { MatchFixture, MatchLineup, MatchStats } from "@/types";
import { ALL_WC2026_TEAMS } from "@/data/teams.data";

const t = (id: number) => ALL_WC2026_TEAMS.find((x) => x.id === id)!;

// ─── Partidas Copa 2026 ───────────────────────────────────────────────────────
const FIXTURES: MatchFixture[] = [
  // ── Final ──
  {
    id: 855755, date: "2026-12-18T15:00:00Z", status: "FT_PEN", statusShort: "FT",
    round: "Final", venue: { name: "Lusail Stadium", city: "Lusail" },
    homeTeam: t(26), awayTeam: t(2),
    score: { fulltime: { home: 3, away: 3 }, halftime: { home: 2, away: 0 }, extratime: { home: 0, away: 0 }, penalty: { home: 4, away: 2 } },
    winner: "home",
  },
  // ── Terceiro/Quarto lugar ──
  {
    id: 855754, date: "2026-12-17T15:00:00Z", status: "FT", statusShort: "FT",
    round: "Terceiro lugar", venue: { name: "Khalifa International Stadium", city: "Ar-Rayyan" },
    homeTeam: t(3), awayTeam: t(5),
    score: { fulltime: { home: 2, away: 1 }, halftime: { home: 1, away: 0 }, extratime: null, penalty: null },
    winner: "home",
  },
  // ── Semifinais ──
  {
    id: 855752, date: "2026-12-13T19:00:00Z", status: "FT", statusShort: "FT",
    round: "Semifinal", venue: { name: "Lusail Stadium", city: "Lusail" },
    homeTeam: t(26), awayTeam: t(3),
    score: { fulltime: { home: 3, away: 0 }, halftime: { home: 0, away: 0 }, extratime: null, penalty: null },
    winner: "home",
  },
  {
    id: 855753, date: "2026-12-14T19:00:00Z", status: "FT", statusShort: "FT",
    round: "Semifinal", venue: { name: "Al Bayt Stadium", city: "Al Khor" },
    homeTeam: t(2), awayTeam: t(5),
    score: { fulltime: { home: 2, away: 0 }, halftime: { home: 1, away: 0 }, extratime: null, penalty: null },
    winner: "home",
  },
  // ── Quartas de Final ──
  {
    id: 855748, date: "2026-12-09T15:00:00Z", status: "FT_PEN", statusShort: "FT",
    round: "Quartas de Final", venue: { name: "Education City Stadium", city: "Al Rayyan" },
    homeTeam: t(3), awayTeam: t(6),
    score: { fulltime: { home: 1, away: 1 }, halftime: { home: 0, away: 0 }, extratime: { home: 0, away: 0 }, penalty: { home: 4, away: 2 } },
    winner: "home",
  },
  {
    id: 855749, date: "2026-12-09T19:00:00Z", status: "FT", statusShort: "FT",
    round: "Quartas de Final", venue: { name: "Al Thumama Stadium", city: "Doha" },
    homeTeam: t(1118), awayTeam: t(26),
    score: { fulltime: { home: 2, away: 2 }, halftime: { home: 0, away: 2 }, extratime: { home: 0, away: 0 }, penalty: { home: 3, away: 4 } },
    winner: "away",
  },
  {
    id: 855750, date: "2026-12-10T15:00:00Z", status: "FT", statusShort: "FT",
    round: "Quartas de Final", venue: { name: "Al Bayt Stadium", city: "Al Khor" },
    homeTeam: t(5), awayTeam: t(27),
    score: { fulltime: { home: 1, away: 0 }, halftime: { home: 0, away: 0 }, extratime: null, penalty: null },
    winner: "home",
  },
  {
    id: 855751, date: "2026-12-10T19:00:00Z", status: "FT", statusShort: "FT",
    round: "Quartas de Final", venue: { name: "Al Bayt Stadium", city: "Al Khor" },
    homeTeam: t(10), awayTeam: t(2),
    score: { fulltime: { home: 1, away: 2 }, halftime: { home: 0, away: 0 }, extratime: null, penalty: null },
    winner: "away",
  },
  // ── Oitavas de Final ──
  {
    id: 855740, date: "2026-12-03T15:00:00Z", status: "FT_PEN", statusShort: "FT",
    round: "Oitavas de Final", venue: { name: "Ahmad Bin Ali Stadium", city: "Al Rayyan" },
    homeTeam: t(5), awayTeam: t(9),
    score: { fulltime: { home: 0, away: 0 }, halftime: { home: 0, away: 0 }, extratime: { home: 0, away: 0 }, penalty: { home: 3, away: 0 } },
    winner: "home",
  },
  {
    id: 855742, date: "2026-12-05T19:00:00Z", status: "FT", statusShort: "FT",
    round: "Oitavas de Final", venue: { name: "Education City Stadium", city: "Al Rayyan" },
    homeTeam: t(6), awayTeam: t(34),
    score: { fulltime: { home: 4, away: 1 }, halftime: { home: 2, away: 0 }, extratime: null, penalty: null },
    winner: "home",
  },
];

// ─── Lineups (para jogos selecionados) ───────────────────────────────────────
const LINEUPS: Record<number, MatchLineup> = {
  855755: {
    home: {
      team: t(26), formation: "4-4-2", coach: "Lionel Scaloni",
      startXI: [
        { id: 801, name: "E. Martínez", number: 1, position: "Goalkeeper", pos: "G", grid: "1:1" },
        { id: 186, name: "N. Molina", number: 26, position: "Right Back", pos: "D", grid: "2:4" },
        { id: 1493, name: "C. Romero", number: 13, position: "Centre Back", pos: "D", grid: "2:3" },
        { id: 747, name: "N. Otamendi", number: 19, position: "Centre Back", pos: "D", grid: "2:2" },
        { id: 285, name: "N. Tagliafico", number: 3, position: "Left Back", pos: "D", grid: "2:1" },
        { id: 750, name: "R. De Paul", number: 7, position: "Midfielder", pos: "M", grid: "3:4" },
        { id: 2491, name: "E. Fernández", number: 24, position: "Midfielder", pos: "M", grid: "3:3" },
        { id: 2310, name: "A. Mac Allister", number: 20, position: "Midfielder", pos: "M", grid: "3:2" },
        { id: 755, name: "Á. Di María", number: 11, position: "Midfielder", pos: "M", grid: "3:1" },
        { id: 874, name: "L. Messi", number: 10, position: "Forward", pos: "F", grid: "4:2" },
        { id: 9, name: "J. Álvarez", number: 9, position: "Forward", pos: "F", grid: "4:1" },
      ],
      substitutes: [
        { id: 800, name: "G. Rulli", number: 12, position: "Goalkeeper", pos: "G", grid: null },
        { id: 3, name: "L. Martínez", number: 22, position: "Forward", pos: "F", grid: null },
        { id: 284, name: "L. Paredes", number: 5, position: "Midfielder", pos: "M", grid: null },
      ],
    },
    away: {
      team: t(2), formation: "4-2-3-1", coach: "Didier Deschamps",
      startXI: [
        { id: 629, name: "H. Lloris", number: 1, position: "Goalkeeper", pos: "G", grid: "1:1" },
        { id: 2332, name: "J. Koundé", number: 2, position: "Right Back", pos: "D", grid: "2:4" },
        { id: 1948, name: "R. Varane", number: 4, position: "Centre Back", pos: "D", grid: "2:3" },
        { id: 2318, name: "D. Upamecano", number: 5, position: "Centre Back", pos: "D", grid: "2:2" },
        { id: 2316, name: "T. Hernández", number: 22, position: "Left Back", pos: "D", grid: "2:1" },
        { id: 2279, name: "A. Tchouaméni", number: 8, position: "Midfielder", pos: "M", grid: "3:2" },
        { id: 623, name: "A. Rabiot", number: 14, position: "Midfielder", pos: "M", grid: "3:1" },
        { id: 2285, name: "O. Dembélé", number: 11, position: "Forward", pos: "F", grid: "4:3" },
        { id: 7, name: "A. Griezmann", number: 7, position: "Forward", pos: "F", grid: "4:2" },
        { id: 154, name: "K. Mbappé", number: 10, position: "Forward", pos: "F", grid: "4:1" },
        { id: 614, name: "O. Giroud", number: 9, position: "Forward", pos: "F", grid: "5:1" },
      ],
      substitutes: [
        { id: 2495, name: "M. Maignan", number: 16, position: "Goalkeeper", pos: "G", grid: null },
        { id: 2496, name: "M. Thuram", number: 15, position: "Forward", pos: "F", grid: null },
        { id: 2497, name: "K. Coman", number: 20, position: "Forward", pos: "F", grid: null },
      ],
    },
  },
};

// ─── Estatísticas por jogo ────────────────────────────────────────────────────
const MATCH_STATS: Record<number, MatchStats> = {
  855755: {
    items: [
      { label: "Posse de Bola", home: "56%", away: "44%", homeRaw: 56, awayRaw: 44, maxRaw: 100 },
      { label: "Finalizações", home: 15, away: 22, homeRaw: 15, awayRaw: 22, maxRaw: 22 },
      { label: "No Alvo", home: 5, away: 10, homeRaw: 5, awayRaw: 10, maxRaw: 10 },
      { label: "Escanteios", home: 8, away: 3, homeRaw: 8, awayRaw: 3, maxRaw: 8 },
      { label: "Faltas", home: 14, away: 10, homeRaw: 14, awayRaw: 10, maxRaw: 14 },
      { label: "Precisão de Passe", home: "82%", away: "88%", homeRaw: 82, awayRaw: 88, maxRaw: 100 },
      { label: "Cartões Amarelos", home: 2, away: 1, homeRaw: 2, awayRaw: 1, maxRaw: 2 },
      { label: "Defesas", home: 7, away: 2, homeRaw: 7, awayRaw: 2, maxRaw: 7 },
    ],
  },
};

// ─── Services ─────────────────────────────────────────────────────────────────
export async function getFixtures(): Promise<MatchFixture[]> {
  /**
   * Em produção:
   * const res = await fetch(
   *   "https://v3.football.api-sports.io/fixtures?league=1&season=2026",
   *   { headers: { "x-apisports-key": process.env.API_FOOTBALL_KEY! }, next: { revalidate: 43200 } }
   * );
   */
  return FIXTURES;
}

export async function getFixtureById(id: number): Promise<MatchFixture | null> {
  return FIXTURES.find((f) => f.id === id) ?? null;
}

export async function getMatchLineup(fixtureId: number): Promise<MatchLineup | null> {
  /**
   * Em produção:
   * const res = await fetch(
   *   `https://v3.football.api-sports.io/fixtures/lineups?fixture=${fixtureId}`,
   *   { headers: { "x-apisports-key": process.env.API_FOOTBALL_KEY! }, next: { revalidate: 43200 } }
   * );
   */
  return LINEUPS[fixtureId] ?? null;
}

export async function getMatchStats(fixtureId: number): Promise<MatchStats | null> {
  /**
   * Em produção:
   * const res = await fetch(
   *   `https://v3.football.api-sports.io/fixtures/statistics?fixture=${fixtureId}`,
   *   { headers: { "x-apisports-key": process.env.API_FOOTBALL_KEY! }, next: { revalidate: 43200 } }
   * );
   */
  return MATCH_STATS[fixtureId] ?? null;
}

export { FIXTURES };
