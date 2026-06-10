import type { H2HData, Team, HistoricalMatch } from "@/types";
import { ALL_WC2026_TEAMS } from "@/data/teams.data";

export { ALL_WC2026_TEAMS };

const t = (id: number): Team => ALL_WC2026_TEAMS.find((x) => x.id === id)!;

// ─── Histórico base para confrontos conhecidos ────────────────────────────────
const H2H_HISTORY: Record<string, { matches: HistoricalMatch[]; totalA: number; totalD: number; totalB: number }> = {
  "26-2": {
    totalA: 12, totalD: 6, totalB: 7,
    matches: [
      { id: 1, date: "2026-12-18", tournament: "FIFA World Cup", homeTeam: t(26), awayTeam: t(2), score: { home: 3, away: 3 }, winner: "home", stage: "Final" },
      { id: 2, date: "2018-06-30", tournament: "FIFA World Cup", homeTeam: t(2), awayTeam: t(26), score: { home: 4, away: 3 }, winner: "home", stage: "Oitavas" },
      { id: 3, date: "2011-07-19", tournament: "Friendly", homeTeam: t(26), awayTeam: t(2), score: { home: 1, away: 0 }, winner: "home", stage: undefined },
      { id: 4, date: "2009-06-10", tournament: "Friendly", homeTeam: t(2), awayTeam: t(26), score: { home: 0, away: 0 }, winner: "draw", stage: undefined },
      { id: 5, date: "2007-11-18", tournament: "Friendly", homeTeam: t(26), awayTeam: t(2), score: { home: 0, away: 1 }, winner: "away", stage: undefined },
    ],
  },
  "6-26": {
    totalA: 42, totalD: 25, totalB: 43,
    matches: [
      { id: 10, date: "2023-11-21", tournament: "FIFA WC Qualifier", homeTeam: t(6), awayTeam: t(26), score: { home: 0, away: 1 }, winner: "away", stage: "Qualifier" },
      { id: 11, date: "2021-07-10", tournament: "Copa América", homeTeam: t(6), awayTeam: t(26), score: { home: 0, away: 1 }, winner: "away", stage: "Final" },
      { id: 12, date: "2019-07-02", tournament: "Copa América", homeTeam: t(6), awayTeam: t(26), score: { home: 2, away: 0 }, winner: "home", stage: "Semifinal" },
      { id: 13, date: "2018-11-16", tournament: "Friendly", homeTeam: t(6), awayTeam: t(26), score: { home: 1, away: 0 }, winner: "home" },
      { id: 14, date: "2016-11-10", tournament: "FIFA WC Qualifier", homeTeam: t(6), awayTeam: t(26), score: { home: 3, away: 0 }, winner: "home", stage: "Qualifier" },
    ],
  },
  "2-10": {
    totalA: 17, totalD: 8, totalB: 7,
    matches: [
      { id: 20, date: "2026-12-10", tournament: "FIFA World Cup", homeTeam: t(2), awayTeam: t(10), score: { home: 2, away: 1 }, winner: "home", stage: "Quartas de Final" },
      { id: 21, date: "2017-06-13", tournament: "Friendly", homeTeam: t(2), awayTeam: t(10), score: { home: 3, away: 2 }, winner: "home" },
      { id: 22, date: "2015-11-17", tournament: "Friendly", homeTeam: t(10), awayTeam: t(2), score: { home: 2, away: 0 }, winner: "home" },
      { id: 23, date: "2012-11-17", tournament: "Friendly", homeTeam: t(2), awayTeam: t(10), score: { home: 1, away: 2 }, winner: "away" },
      { id: 24, date: "2010-06-04", tournament: "FIFA World Cup", homeTeam: t(10), awayTeam: t(2), score: { home: 1, away: 1 }, winner: "draw", stage: "Grupo" },
    ],
  },
  "26-3": {
    totalA: 5, totalD: 1, totalB: 3,
    matches: [
      { id: 30, date: "2026-12-13", tournament: "FIFA World Cup", homeTeam: t(26), awayTeam: t(3), score: { home: 3, away: 0 }, winner: "home", stage: "Semifinal" },
      { id: 31, date: "2018-06-21", tournament: "FIFA World Cup", homeTeam: t(26), awayTeam: t(3), score: { home: 3, away: 0 }, winner: "home", stage: "Grupo" },
      { id: 32, date: "2017-10-12", tournament: "FIFA WC Qualifier", homeTeam: t(3), awayTeam: t(26), score: { home: 1, away: 0 }, winner: "home", stage: "Qualifier" },
    ],
  },
  "5-27": {
    totalA: 2, totalD: 0, totalB: 4,
    matches: [
      { id: 40, date: "2026-12-10", tournament: "FIFA World Cup", homeTeam: t(5), awayTeam: t(27), score: { home: 1, away: 0 }, winner: "home", stage: "Quartas de Final" },
      { id: 41, date: "2012-03-29", tournament: "Friendly", homeTeam: t(5), awayTeam: t(27), score: { home: 1, away: 2 }, winner: "away" },
      { id: 42, date: "2010-05-26", tournament: "Friendly", homeTeam: t(27), awayTeam: t(5), score: { home: 3, away: 1 }, winner: "home" },
    ],
  },
};

// ─── Gerador genérico para pares sem histórico específico ─────────────────────
function generateH2H(teamA: Team, teamB: Team): H2HData {
  const seed = (teamA.id + teamB.id) % 30;
  const winsA = 5 + seed % 10;
  const winsB = 4 + (seed * 2) % 10;
  const draws = 2 + seed % 5;

  const recentDates = ["2026-03-25", "2020-11-17", "2019-09-10", "2018-03-23", "2016-11-15"];
  const recentMatches: HistoricalMatch[] = recentDates.map((date, i) => {
    const homeGoals = (seed + i) % 4;
    const awayGoals = (seed + i + 1) % 3;
    const winner = homeGoals > awayGoals ? "home" : homeGoals < awayGoals ? "away" : "draw";
    return {
      id: 9000 + teamA.id * 10 + teamB.id + i,
      date,
      tournament: i === 0 ? "Friendly" : "Friendly",
      homeTeam: i % 2 === 0 ? teamA : teamB,
      awayTeam: i % 2 === 0 ? teamB : teamA,
      score: { home: homeGoals, away: awayGoals },
      winner,
    };
  });

  return {
    teamA, teamB,
    totalMatches: winsA + winsB + draws,
    teamARecord: {
      wins: winsA, draws, losses: winsB,
      goalsScored: winsA * 2 + draws,
      goalsConceded: winsB * 2 + draws,
      cleanSheets: Math.floor(winsA / 2),
    },
    teamBRecord: {
      wins: winsB, draws, losses: winsA,
      goalsScored: winsB * 2 + draws,
      goalsConceded: winsA * 2 + draws,
      cleanSheets: Math.floor(winsB / 2),
    },
    recentMatches,
    lastMeeting: recentMatches[0],
  };
}

// ─── Service ──────────────────────────────────────────────────────────────────
export async function fetchH2H(teamAId: number, teamBId: number): Promise<H2HData> {
  let teamA = ALL_WC2026_TEAMS.find((t) => t.id === teamAId)!;
  let teamB = ALL_WC2026_TEAMS.find((t) => t.id === teamBId)!;

  if (!teamA || !teamB) {
    teamA = ALL_WC2026_TEAMS[0];
    teamB = ALL_WC2026_TEAMS[1];
  }

  try {
    const key = process.env.NEXT_PUBLIC_API_FOOTBALL_KEY;
    if (!key) throw new Error("No API key");

    const res = await fetch(
      `https://v3.football.api-sports.io/fixtures/headtohead?h2h=${teamA.id}-${teamB.id}`,
      { headers: { "x-apisports-key": key }, next: { revalidate: 43200 } }
    );
    if (!res.ok) throw new Error("API request failed");
    
    const json = await res.json();
    if (!json.response || json.response.length === 0) throw new Error("Empty H2H");

    const matches = json.response;
    
    let winsA = 0, draws = 0, winsB = 0;
    let goalsA = 0, goalsB = 0;
    let cleanSheetsA = 0, cleanSheetsB = 0;

    const recentMatches: HistoricalMatch[] = matches.map((m: any) => {
      const homeId = m.teams.home.id;
      const awayId = m.teams.away.id;
      const isATeamHome = homeId === teamA.id;
      
      const homeGoals = m.goals.home ?? 0;
      const awayGoals = m.goals.away ?? 0;

      if (isATeamHome) {
        goalsA += homeGoals;
        goalsB += awayGoals;
        if (homeGoals > awayGoals) winsA++;
        else if (homeGoals < awayGoals) winsB++;
        else draws++;
        if (awayGoals === 0) cleanSheetsA++;
        if (homeGoals === 0) cleanSheetsB++;
      } else {
        goalsA += awayGoals;
        goalsB += homeGoals;
        if (awayGoals > homeGoals) winsA++;
        else if (awayGoals < homeGoals) winsB++;
        else draws++;
        if (homeGoals === 0) cleanSheetsA++;
        if (awayGoals === 0) cleanSheetsB++;
      }

      return {
        id: m.fixture.id,
        date: m.fixture.date,
        tournament: m.league.name,
        homeTeam: isATeamHome ? teamA : teamB,
        awayTeam: isATeamHome ? teamB : teamA,
        score: { home: homeGoals, away: awayGoals },
        winner: m.teams.home.winner ? "home" : m.teams.away.winner ? "away" : "draw"
      };
    });

    return {
      teamA, teamB,
      totalMatches: matches.length,
      teamARecord: { wins: winsA, draws, losses: winsB, goalsScored: goalsA, goalsConceded: goalsB, cleanSheets: cleanSheetsA },
      teamBRecord: { wins: winsB, draws, losses: winsA, goalsScored: goalsB, goalsConceded: goalsA, cleanSheets: cleanSheetsB },
      recentMatches,
      lastMeeting: recentMatches[0]
    };
  } catch (error) {
    console.error("Failed to fetch H2H:", error);
    return {
      teamA, teamB,
      totalMatches: 0,
      teamARecord: { wins: 0, draws: 0, losses: 0, goalsScored: 0, goalsConceded: 0, cleanSheets: 0 },
      teamBRecord: { wins: 0, draws: 0, losses: 0, goalsScored: 0, goalsConceded: 0, cleanSheets: 0 },
      recentMatches: [],
      lastMeeting: undefined,
    };
  }
}
