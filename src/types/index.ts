// ─── Team ──────────────────────────────────────────────────────────────────
export interface Team {
  id: number;
  name: string;
  shortName: string;
  logo: string;
  country: string;
  confederation: "CONMEBOL" | "UEFA" | "CONCACAF" | "CAF" | "AFC" | "OFC";
}

// ─── Match (H2H) ─────────────────────────────────────────────────────────────
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

// ─── Standings ───────────────────────────────────────────────────────────────
export interface StandingRecord {
  played: number;
  win: number;
  draw: number;
  lose: number;
  goals: { for: number; against: number };
}

export interface StandingEntry {
  rank: number;
  team: Team;
  points: number;
  goalsDiff: number;
  group: string;
  form: string;
  description: "Qualified" | "Eliminated" | null;
  all: StandingRecord;
}

export interface StandingGroup {
  group: string;
  entries: StandingEntry[];
}

// ─── Team Profile & Squad ────────────────────────────────────────────────────
export interface TeamStats {
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalsDiff: number;
  points: number;
  avgPossession: number;
  avgShotsOnTarget: number;
  avgPassAccuracy: number;
  cleanSheets: number;
  yellowCards: number;
  redCards: number;
}

export interface SquadPlayer {
  id: number;
  name: string;
  number: number;
  position: "Goalkeeper" | "Defender" | "Midfielder" | "Forward";
  age: number;
  nationality: string;
  photo: string;
  goals: number;
  assists: number;
  minutesPlayed: number;
  rating: number;
}

export interface TeamProfile {
  team: Team;
  coach: string;
  formation: string;
  stats: TeamStats;
  squad: SquadPlayer[];
}

// ─── Fixture / Match ─────────────────────────────────────────────────────────
export type MatchStatus =
  | "NS"       // Not started
  | "1H"       // First half
  | "HT"       // Half time
  | "2H"       // Second half
  | "ET"       // Extra time
  | "PEN"      // Penalty
  | "FT"       // Full time
  | "AET"      // After extra time
  | "FT_PEN";  // Full time (penalties)

export interface MatchVenue {
  name: string;
  city: string;
}

export interface MatchFixture {
  id: number;
  date: string;
  status: MatchStatus;
  statusShort: string;
  round: string;
  group?: string;
  venue: MatchVenue;
  homeTeam: Team;
  awayTeam: Team;
  score: {
    fulltime: MatchScore;
    halftime: MatchScore;
    extratime?: MatchScore | null;
    penalty?: MatchScore | null;
  };
  winner: "home" | "away" | "draw" | null;
}

// ─── Lineup ──────────────────────────────────────────────────────────────────
export interface LineupPlayer {
  id: number;
  name: string;
  number: number;
  position: string;
  pos: "G" | "D" | "M" | "F";
  grid: string | null; // "1:1" style grid position
}

export interface TeamLineup {
  team: Team;
  formation: string;
  startXI: LineupPlayer[];
  substitutes: LineupPlayer[];
  coach: string;
}

export interface MatchLineup {
  home: TeamLineup;
  away: TeamLineup;
}

// ─── Match Statistics ─────────────────────────────────────────────────────────
export interface MatchStatItem {
  label: string;
  home: number | string;
  away: number | string;
  homeRaw?: number;
  awayRaw?: number;
  maxRaw?: number;
}

export interface MatchStats {
  items: MatchStatItem[];
}
