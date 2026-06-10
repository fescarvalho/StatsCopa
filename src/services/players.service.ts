import type { LeaderboardEntry, PlayerStats, Team, Player } from "@/types";

// ─── Mock Team Data ──────────────────────────────────────────────────────────
const makeTeam = (
  id: number,
  name: string,
  shortName: string,
  confederation: Team["confederation"]
): Team => ({
  id,
  name,
  shortName,
  logo: `https://media.api-sports.io/football/teams/${id}.png`,
  country: name,
  confederation,
});

const TEAMS = {
  ARG: makeTeam(26, "Argentina", "ARG", "CONMEBOL"),
  FRA: makeTeam(2, "France", "FRA", "UEFA"),
  BRA: makeTeam(6, "Brazil", "BRA", "CONMEBOL"),
  ENG: makeTeam(10, "England", "ENG", "UEFA"),
  POR: makeTeam(27, "Portugal", "POR", "UEFA"),
  GER: makeTeam(25, "Germany", "GER", "UEFA"),
  ESP: makeTeam(9, "Spain", "ESP", "UEFA"),
  NED: makeTeam(1118, "Netherlands", "NED", "UEFA"),
  URU: makeTeam(31, "Uruguay", "URU", "CONMEBOL"),
  COL: makeTeam(49, "Colombia", "COL", "CONMEBOL"),
};

const makePlayer = (
  id: number,
  name: string,
  team: Team,
  position: Player["position"],
  nationality: string,
  age: number,
  number: number
): Player => ({
  id,
  name,
  firstName: name.split(" ")[0],
  lastName: name.split(" ").slice(1).join(" "),
  photo: `https://media.api-sports.io/football/players/${id}.png`,
  nationality,
  team,
  position,
  number,
  age,
  height: "180 cm",
  weight: "75 kg",
});

// ─── Top Scorers Mock ─────────────────────────────────────────────────────────
const SCORERS_RAW: Array<[number, string, Team, Player["position"], string, number, number, number, number]> = [
  [154, "Kylian Mbappé", TEAMS.FRA, "Forward", "French", 25, 10, 6, 2],
  [874, "Lionel Messi", TEAMS.ARG, "Forward", "Argentine", 36, 10, 5, 4],
  [276, "Erling Haaland", TEAMS.NED, "Forward", "Norwegian", 23, 9, 5, 1],
  [19054, "Vinicius Jr", TEAMS.BRA, "Forward", "Brazilian", 23, 7, 4, 3],
  [521, "Harry Kane", TEAMS.ENG, "Forward", "English", 30, 9, 4, 2],
  [723, "Cristiano Ronaldo", TEAMS.POR, "Forward", "Portuguese", 39, 7, 3, 1],
  [1238, "Lautaro Martínez", TEAMS.ARG, "Forward", "Argentine", 26, 22, 3, 2],
  [2285, "Rodri", TEAMS.ESP, "Midfielder", "Spanish", 27, 16, 2, 3],
  [47, "Bukayo Saka", TEAMS.ENG, "Midfielder", "English", 22, 7, 2, 2],
  [284, "Raphinha", TEAMS.BRA, "Forward", "Brazilian", 27, 11, 2, 2],
  [306, "Luis Díaz", TEAMS.COL, "Forward", "Colombian", 27, 7, 2, 1],
  [564, "Federico Valverde", TEAMS.URU, "Midfielder", "Uruguayan", 25, 8, 2, 3],
  [148, "Leroy Sané", TEAMS.GER, "Forward", "German", 28, 10, 1, 2],
  [7, "Antoine Griezmann", TEAMS.FRA, "Forward", "French", 32, 7, 1, 3],
  [758, "Darwin Núñez", TEAMS.URU, "Forward", "Uruguayan", 24, 11, 1, 1],
  [199, "Bernardo Silva", TEAMS.POR, "Midfielder", "Portuguese", 29, 10, 1, 4],
  [2521, "Pedri", TEAMS.ESP, "Midfielder", "Spanish", 21, 8, 1, 5],
  [290, "Gabriel Martinelli", TEAMS.BRA, "Forward", "Brazilian", 22, 11, 1, 2],
  [1460, "James Rodríguez", TEAMS.COL, "Midfielder", "Colombian", 32, 10, 0, 5],
  [3040, "Jude Bellingham", TEAMS.ENG, "Midfielder", "English", 20, 10, 0, 3],
];

// ─── Top Scorers ─────────────────────────────────────────────────────────────
export async function fetchTopScorers(): Promise<LeaderboardEntry[]> {
  /**
   * Production fetch (replace mock below):
   *
   * const res = await fetch(
   *   "https://v3.football.api-sports.io/players/topscorers?season=2026&league=1",
   *   {
   *     headers: { "x-apisports-key": process.env.API_FOOTBALL_KEY! },
   *     next: { revalidate: 43200 },
   *   }
   * );
   */

  return SCORERS_RAW.map(([id, name, team, position, nationality, age, number, goals, assists], index) => ({
    rank: index + 1,
    player: makePlayer(id, name, team, position, nationality, age, number),
    goals,
    assists,
    matches: Math.floor(Math.random() * 3) + 4,
    minutesPlayed: (Math.floor(Math.random() * 2) + 4) * 90,
    rating: parseFloat((7.5 + Math.random() * 2).toFixed(1)),
  }));
}

// ─── Top Assisters ────────────────────────────────────────────────────────────
export async function fetchTopAssists(): Promise<LeaderboardEntry[]> {
  const scorers = await fetchTopScorers();
  // Reorder by assists for assists leaderboard
  return [...scorers]
    .sort((a, b) => b.assists - a.assists)
    .map((entry, index) => ({ ...entry, rank: index + 1 }));
}

// ─── Player Detail Stats ──────────────────────────────────────────────────────
export async function fetchPlayerStats(playerId: number): Promise<PlayerStats | null> {
  /**
   * Production fetch:
   *
   * const res = await fetch(
   *   `https://v3.football.api-sports.io/players?id=${playerId}&season=2026&league=1`,
   *   {
   *     headers: { "x-apisports-key": process.env.API_FOOTBALL_KEY! },
   *     next: { revalidate: 43200 },
   *   }
   * );
   */

  const entry = SCORERS_RAW.find(([id]) => id === playerId);
  if (!entry) return null;

  const [id, name, team, position, nationality, age, number, goals, assists] = entry;
  const player = makePlayer(id, name, team, position, nationality, age, number);

  // Deterministic pseudo-random stats from player id
  const seed = id % 100;

  return {
    player,
    tournament: "FIFA World Cup 2026",
    season: "2026",
    gamesPlayed: 5 + (seed % 3),
    minutesPlayed: (5 + (seed % 3)) * 90 - (seed % 20),
    rating: parseFloat((7.5 + (seed % 25) / 100).toFixed(1)),
    offensive: {
      goals,
      assists,
      shots: 12 + (seed % 10),
      shotsOnTarget: 7 + (seed % 6),
      shotsOnTargetPct: 50 + (seed % 30),
      dribbles: 15 + (seed % 20),
      dribblesSucceeded: 9 + (seed % 12),
      dribbleSuccessPct: 55 + (seed % 30),
      penaltyGoals: seed % 2,
      penaltyMissed: 0,
      hatTricks: goals >= 4 ? 1 : 0,
      minutesPerGoal: goals > 0 ? Math.round(((5 + (seed % 3)) * 90) / goals) : 999,
    },
    creation: {
      keyPasses: 8 + (seed % 12),
      chanceCreated: 12 + (seed % 15),
      bigChancesCreated: 3 + (seed % 5),
      crosses: 10 + (seed % 20),
      crossAccuracy: 30 + (seed % 40),
      throughballs: 4 + (seed % 6),
      passAccuracy: 78 + (seed % 15),
      longBallAccuracy: 60 + (seed % 25),
      progressivePasses: 20 + (seed % 30),
    },
    defensive: {
      tackles: 5 + (seed % 15),
      tacklesSucceeded: 3 + (seed % 10),
      tackleSuccessPct: 50 + (seed % 35),
      interceptions: 3 + (seed % 8),
      blocks: 2 + (seed % 5),
      clearances: seed % 8,
      aerialDuelsWon: 5 + (seed % 10),
      aerialDuelsTotal: 10 + (seed % 15),
      aerialSuccessPct: 40 + (seed % 35),
      foulsCommitted: 3 + (seed % 8),
      yellowCards: seed % 3,
      redCards: 0,
    },
  };
}
