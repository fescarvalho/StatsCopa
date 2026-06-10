import type { H2HData, Team, HistoricalMatch } from "@/types";

// ─── Mock Teams ─────────────────────────────────────────────────────────────
const BRAZIL: Team = {
  id: 6,
  name: "Brazil",
  shortName: "BRA",
  logo: "https://media.api-sports.io/football/teams/6.png",
  country: "Brazil",
  confederation: "CONMEBOL",
};

const ARGENTINA: Team = {
  id: 26,
  name: "Argentina",
  shortName: "ARG",
  logo: "https://media.api-sports.io/football/teams/26.png",
  country: "Argentina",
  confederation: "CONMEBOL",
};

const FRANCE: Team = {
  id: 2,
  name: "France",
  shortName: "FRA",
  logo: "https://media.api-sports.io/football/teams/2.png",
  country: "France",
  confederation: "UEFA",
};

const ENGLAND: Team = {
  id: 10,
  name: "England",
  shortName: "ENG",
  logo: "https://media.api-sports.io/football/teams/10.png",
  country: "England",
  confederation: "UEFA",
};

// ─── Mock Match History ──────────────────────────────────────────────────────
const BRA_ARG_MATCHES: HistoricalMatch[] = [
  {
    id: 1,
    date: "2023-11-21",
    tournament: "FIFA WC Qualifier",
    homeTeam: BRAZIL,
    awayTeam: ARGENTINA,
    score: { home: 0, away: 1 },
    winner: "away",
    stage: "Qualifier",
  },
  {
    id: 2,
    date: "2022-12-13",
    tournament: "FIFA World Cup",
    homeTeam: ARGENTINA,
    awayTeam: BRAZIL,
    score: { home: 3, away: 0 },
    winner: "home",
    stage: "Quarter-final",
  },
  {
    id: 3,
    date: "2021-07-10",
    tournament: "Copa América",
    homeTeam: BRAZIL,
    awayTeam: ARGENTINA,
    score: { home: 0, away: 1 },
    winner: "away",
    stage: "Final",
  },
  {
    id: 4,
    date: "2019-07-02",
    tournament: "Copa América",
    homeTeam: BRAZIL,
    awayTeam: ARGENTINA,
    score: { home: 2, away: 0 },
    winner: "home",
    stage: "Semi-final",
  },
  {
    id: 5,
    date: "2018-11-16",
    tournament: "Friendly",
    homeTeam: BRAZIL,
    awayTeam: ARGENTINA,
    score: { home: 1, away: 0 },
    winner: "home",
  },
  {
    id: 6,
    date: "2016-11-10",
    tournament: "FIFA WC Qualifier",
    homeTeam: BRAZIL,
    awayTeam: ARGENTINA,
    score: { home: 3, away: 0 },
    winner: "home",
    stage: "Qualifier",
  },
  {
    id: 7,
    date: "2015-11-13",
    tournament: "FIFA WC Qualifier",
    homeTeam: ARGENTINA,
    awayTeam: BRAZIL,
    score: { home: 1, away: 1 },
    winner: "draw",
    stage: "Qualifier",
  },
  {
    id: 8,
    date: "2015-06-13",
    tournament: "Copa América",
    homeTeam: BRAZIL,
    awayTeam: ARGENTINA,
    score: { home: 1, away: 1 },
    winner: "draw",
    stage: "Group Stage",
  },
];

const FRA_ENG_MATCHES: HistoricalMatch[] = [
  {
    id: 10,
    date: "2022-12-10",
    tournament: "FIFA World Cup",
    homeTeam: FRANCE,
    awayTeam: ENGLAND,
    score: { home: 2, away: 1 },
    winner: "home",
    stage: "Quarter-final",
  },
  {
    id: 11,
    date: "2017-06-13",
    tournament: "Friendly",
    homeTeam: FRANCE,
    awayTeam: ENGLAND,
    score: { home: 3, away: 2 },
    winner: "home",
  },
  {
    id: 12,
    date: "2015-11-17",
    tournament: "Friendly",
    homeTeam: ENGLAND,
    awayTeam: FRANCE,
    score: { home: 2, away: 0 },
    winner: "home",
  },
  {
    id: 13,
    date: "2012-11-17",
    tournament: "Friendly",
    homeTeam: FRANCE,
    awayTeam: ENGLAND,
    score: { home: 1, away: 2 },
    winner: "away",
  },
];

// ─── Fixture Map ─────────────────────────────────────────────────────────────
const H2H_FIXTURES: Record<string, H2HData> = {
  "6-26": {
    teamA: BRAZIL,
    teamB: ARGENTINA,
    totalMatches: 110,
    teamARecord: {
      wins: 42,
      draws: 25,
      losses: 43,
      goalsScored: 165,
      goalsConceded: 170,
      cleanSheets: 18,
    },
    teamBRecord: {
      wins: 43,
      draws: 25,
      losses: 42,
      goalsScored: 170,
      goalsConceded: 165,
      cleanSheets: 20,
    },
    recentMatches: BRA_ARG_MATCHES,
    lastMeeting: BRA_ARG_MATCHES[0],
  },
  "2-10": {
    teamA: FRANCE,
    teamB: ENGLAND,
    totalMatches: 32,
    teamARecord: {
      wins: 17,
      draws: 8,
      losses: 7,
      goalsScored: 62,
      goalsConceded: 45,
      cleanSheets: 10,
    },
    teamBRecord: {
      wins: 7,
      draws: 8,
      losses: 17,
      goalsScored: 45,
      goalsConceded: 62,
      cleanSheets: 6,
    },
    recentMatches: FRA_ENG_MATCHES,
    lastMeeting: FRA_ENG_MATCHES[0],
  },
};

// ─── Fetch Function ───────────────────────────────────────────────────────────
/**
 * Fetches H2H data for two teams.
 * In production, replace the mock with a real fetch using ISR cache:
 *
 *   const res = await fetch(
 *     `https://v3.football.api-sports.io/fixtures/headtohead?h2h=${teamAId}-${teamBId}`,
 *     {
 *       headers: { "x-apisports-key": process.env.API_FOOTBALL_KEY! },
 *       next: { revalidate: 43200 }, // ISR: 12h cache
 *     }
 *   );
 */
export async function fetchH2H(
  teamAId: number,
  teamBId: number
): Promise<H2HData> {
  const key = `${teamAId}-${teamBId}`;
  const reverseKey = `${teamBId}-${teamAId}`;

  return H2H_FIXTURES[key] ?? H2H_FIXTURES[reverseKey] ?? H2H_FIXTURES["6-26"];
}
