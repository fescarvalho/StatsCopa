import type { Team } from "@/types";

// ─── Todas as seleções da Copa 2026 ──────────────────────────────────────────
// league=1, season=2026 (API-Football)

export const ALL_WC2026_TEAMS: Team[] = [
  // Grupo A
  { id: 882, name: "Qatar", shortName: "QAT", logo: "https://media.api-sports.io/football/teams/882.png", country: "Qatar", confederation: "AFC" },
  { id: 79, name: "Ecuador", shortName: "ECU", logo: "https://media.api-sports.io/football/teams/79.png", country: "Ecuador", confederation: "CONMEBOL" },
  { id: 32, name: "Senegal", shortName: "SEN", logo: "https://media.api-sports.io/football/teams/32.png", country: "Senegal", confederation: "CAF" },
  { id: 1118, name: "Netherlands", shortName: "NED", logo: "https://media.api-sports.io/football/teams/1118.png", country: "Netherlands", confederation: "UEFA" },
  // Grupo B
  { id: 10, name: "England", shortName: "ENG", logo: "https://media.api-sports.io/football/teams/10.png", country: "England", confederation: "UEFA" },
  { id: 63, name: "Iran", shortName: "IRN", logo: "https://media.api-sports.io/football/teams/63.png", country: "Iran", confederation: "AFC" },
  { id: 1, name: "USA", shortName: "USA", logo: "https://media.api-sports.io/football/teams/1.png", country: "USA", confederation: "CONCACAF" },
  { id: 730, name: "Wales", shortName: "WAL", logo: "https://media.api-sports.io/football/teams/730.png", country: "Wales", confederation: "UEFA" },
  // Grupo C
  { id: 26, name: "Argentina", shortName: "ARG", logo: "https://media.api-sports.io/football/teams/26.png", country: "Argentina", confederation: "CONMEBOL" },
  { id: 116, name: "Saudi Arabia", shortName: "KSA", logo: "https://media.api-sports.io/football/teams/116.png", country: "Saudi Arabia", confederation: "AFC" },
  { id: 24, name: "Mexico", shortName: "MEX", logo: "https://media.api-sports.io/football/teams/24.png", country: "Mexico", confederation: "CONCACAF" },
  { id: 21, name: "Poland", shortName: "POL", logo: "https://media.api-sports.io/football/teams/21.png", country: "Poland", confederation: "UEFA" },
  // Grupo D
  { id: 2, name: "France", shortName: "FRA", logo: "https://media.api-sports.io/football/teams/2.png", country: "France", confederation: "UEFA" },
  { id: 23, name: "Australia", shortName: "AUS", logo: "https://media.api-sports.io/football/teams/23.png", country: "Australia", confederation: "AFC" },
  { id: 35, name: "Denmark", shortName: "DEN", logo: "https://media.api-sports.io/football/teams/35.png", country: "Denmark", confederation: "UEFA" },
  { id: 97, name: "Tunisia", shortName: "TUN", logo: "https://media.api-sports.io/football/teams/97.png", country: "Tunisia", confederation: "CAF" },
  // Grupo E
  { id: 9, name: "Spain", shortName: "ESP", logo: "https://media.api-sports.io/football/teams/9.png", country: "Spain", confederation: "UEFA" },
  { id: 71, name: "Costa Rica", shortName: "CRC", logo: "https://media.api-sports.io/football/teams/71.png", country: "Costa Rica", confederation: "CONCACAF" },
  { id: 25, name: "Germany", shortName: "GER", logo: "https://media.api-sports.io/football/teams/25.png", country: "Germany", confederation: "UEFA" },
  { id: 33, name: "Japan", shortName: "JPN", logo: "https://media.api-sports.io/football/teams/33.png", country: "Japan", confederation: "AFC" },
  // Grupo F
  { id: 4, name: "Belgium", shortName: "BEL", logo: "https://media.api-sports.io/football/teams/4.png", country: "Belgium", confederation: "UEFA" },
  { id: 88, name: "Canada", shortName: "CAN", logo: "https://media.api-sports.io/football/teams/88.png", country: "Canada", confederation: "CONCACAF" },
  { id: 5, name: "Morocco", shortName: "MAR", logo: "https://media.api-sports.io/football/teams/5.png", country: "Morocco", confederation: "CAF" },
  { id: 3, name: "Croatia", shortName: "CRO", logo: "https://media.api-sports.io/football/teams/3.png", country: "Croatia", confederation: "UEFA" },
  // Grupo G
  { id: 6, name: "Brazil", shortName: "BRA", logo: "https://media.api-sports.io/football/teams/6.png", country: "Brazil", confederation: "CONMEBOL" },
  { id: 14, name: "Serbia", shortName: "SRB", logo: "https://media.api-sports.io/football/teams/14.png", country: "Serbia", confederation: "UEFA" },
  { id: 15, name: "Switzerland", shortName: "SUI", logo: "https://media.api-sports.io/football/teams/15.png", country: "Switzerland", confederation: "UEFA" },
  { id: 44, name: "Cameroon", shortName: "CMR", logo: "https://media.api-sports.io/football/teams/44.png", country: "Cameroon", confederation: "CAF" },
  // Grupo H
  { id: 27, name: "Portugal", shortName: "POR", logo: "https://media.api-sports.io/football/teams/27.png", country: "Portugal", confederation: "UEFA" },
  { id: 38, name: "Ghana", shortName: "GHA", logo: "https://media.api-sports.io/football/teams/38.png", country: "Ghana", confederation: "CAF" },
  { id: 31, name: "Uruguay", shortName: "URU", logo: "https://media.api-sports.io/football/teams/31.png", country: "Uruguay", confederation: "CONMEBOL" },
  { id: 34, name: "South Korea", shortName: "KOR", logo: "https://media.api-sports.io/football/teams/34.png", country: "South Korea", confederation: "AFC" },
];

export function getTeamById(id: number): Team | undefined {
  return ALL_WC2026_TEAMS.find((t) => t.id === id);
}
