// ─── Team ──────────────────────────────────────────────────────────────────
export interface Team {
  id: number;
  name: string;
  shortName: string;
  logo: string;
  country: string;
  confederation: "CONMEBOL" | "UEFA" | "CONCACAF" | "CAF" | "AFC" | "OFC";
}

// ─── Match ──────────────────────────────────────────────────────────────────
export type MatchOutcome = "W" | "D" | "L";

export interface MatchScore {
  home: number;
  away: number;
}

export interface HistoricalMatch {
  id: number;
  date: string;
  tournament: string;
  homeTeam: Team;
  awayTeam: Team;
  score: MatchScore;
  winner: "home" | "away" | "draw";
  stage?: string;
}

// ─── Head to Head ───────────────────────────────────────────────────────────
export interface H2HRecord {
  wins: number;
  draws: number;
  losses: number;
  goalsScored: number;
  goalsConceded: number;
  cleanSheets: number;
}

export interface H2HData {
  teamA: Team;
  teamB: Team;
  totalMatches: number;
  teamARecord: H2HRecord;
  teamBRecord: H2HRecord;
  recentMatches: HistoricalMatch[];
  lastMeeting?: HistoricalMatch;
}

// ─── Player ─────────────────────────────────────────────────────────────────
export interface Player {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  photo: string;
  nationality: string;
  team: Team;
  position: "Goalkeeper" | "Defender" | "Midfielder" | "Forward";
  number: number;
  age: number;
  height: string;
  weight: string;
}

// ─── Player Stats ────────────────────────────────────────────────────────────
export interface OffensiveStats {
  goals: number;
  assists: number;
  shots: number;
  shotsOnTarget: number;
  shotsOnTargetPct: number;
  dribbles: number;
  dribblesSucceeded: number;
  dribbleSuccessPct: number;
  penaltyGoals: number;
  penaltyMissed: number;
  hatTricks: number;
  minutesPerGoal: number;
}

export interface CreationStats {
  keyPasses: number;
  chanceCreated: number;
  bigChancesCreated: number;
  crosses: number;
  crossAccuracy: number;
  throughballs: number;
  passAccuracy: number;
  longBallAccuracy: number;
  progressivePasses: number;
}

export interface DefensiveStats {
  tackles: number;
  tacklesSucceeded: number;
  tackleSuccessPct: number;
  interceptions: number;
  blocks: number;
  clearances: number;
  aerialDuelsWon: number;
  aerialDuelsTotal: number;
  aerialSuccessPct: number;
  foulsCommitted: number;
  yellowCards: number;
  redCards: number;
}

export interface PlayerStats {
  player: Player;
  tournament: string;
  season: string;
  gamesPlayed: number;
  minutesPlayed: number;
  rating: number;
  offensive: OffensiveStats;
  creation: CreationStats;
  defensive: DefensiveStats;
}

// ─── Leaderboard ─────────────────────────────────────────────────────────────
export interface LeaderboardEntry {
  rank: number;
  player: Player;
  goals: number;
  assists: number;
  matches: number;
  minutesPlayed: number;
  rating: number;
}
