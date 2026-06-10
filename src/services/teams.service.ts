import type { TeamProfile, SquadPlayer } from "@/types";
import { ALL_WC2022_TEAMS } from "@/data/teams.data";

export { ALL_WC2022_TEAMS };
export { getTeamById } from "@/data/teams.data";

// ─── Elencos por seleção ──────────────────────────────────────────────────────
type RawPlayer = [number, string, number, SquadPlayer["position"], number, number, number, number];
// [id, name, number, position, age, goals, assists, minutesPlayed]

const SQUADS: Record<number, { coach: string; formation: string; avgPossession: number; avgShots: number; avgPass: number; cleanSheets: number; yellow: number; red: number; players: RawPlayer[] }> = {
  // Argentina
  26: {
    coach: "Lionel Scaloni", formation: "4-4-2", avgPossession: 52, avgShots: 5.6, avgPass: 86, cleanSheets: 4, yellow: 8, red: 0,
    players: [
      [801, "Emiliano Martínez", 1, "Goalkeeper", 30, 0, 0, 630],
      [186, "Nahuel Molina", 26, "Defender", 24, 1, 1, 540],
      [1493, "Cristian Romero", 13, "Defender", 24, 0, 0, 630],
      [747, "Nicolás Otamendi", 19, "Defender", 34, 0, 1, 630],
      [285, "Nicolás Tagliafico", 3, "Defender", 30, 0, 1, 630],
      [750, "Rodrigo De Paul", 7, "Midfielder", 28, 0, 2, 625],
      [2491, "Enzo Fernández", 24, "Midfielder", 21, 1, 2, 540],
      [2310, "Alexis Mac Allister", 20, "Midfielder", 23, 2, 0, 540],
      [874, "Lionel Messi", 10, "Forward", 35, 7, 3, 690],
      [755, "Ángel Di María", 11, "Forward", 34, 1, 2, 450],
      [9, "Julián Álvarez", 9, "Forward", 22, 4, 2, 595],
      [3, "Lautaro Martínez", 22, "Forward", 25, 0, 0, 280],
    ],
  },
  // França
  2: {
    coach: "Didier Deschamps", formation: "4-2-3-1", avgPossession: 55, avgShots: 6.1, avgPass: 88, cleanSheets: 3, yellow: 6, red: 0,
    players: [
      [629, "Hugo Lloris", 1, "Goalkeeper", 35, 0, 0, 660],
      [2332, "Jules Koundé", 2, "Defender", 24, 0, 0, 660],
      [1948, "Raphaël Varane", 4, "Defender", 29, 0, 0, 480],
      [2318, "Dayot Upamecano", 5, "Defender", 24, 0, 0, 660],
      [2316, "Theo Hernández", 22, "Defender", 24, 1, 0, 660],
      [2279, "Aurélien Tchouaméni", 8, "Midfielder", 22, 1, 0, 570],
      [623, "Adrien Rabiot", 14, "Midfielder", 27, 3, 1, 570],
      [154, "Kylian Mbappé", 10, "Forward", 23, 8, 2, 660],
      [7, "Antoine Griezmann", 7, "Forward", 31, 0, 5, 660],
      [614, "Olivier Giroud", 9, "Forward", 36, 4, 1, 450],
      [2285, "Ousmane Dembélé", 11, "Forward", 25, 0, 2, 540],
    ],
  },
  // Brasil
  6: {
    coach: "Tite", formation: "4-2-3-1", avgPossession: 58, avgShots: 5.2, avgPass: 87, cleanSheets: 3, yellow: 5, red: 0,
    players: [
      [733, "Alisson Becker", 1, "Goalkeeper", 30, 0, 0, 450],
      [186, "Danilo", 2, "Defender", 31, 0, 1, 450],
      [2303, "Militão", 3, "Defender", 24, 0, 0, 450],
      [287, "Marquinhos", 4, "Defender", 28, 1, 0, 450],
      [284, "Alex Sandro", 6, "Defender", 31, 0, 0, 450],
      [19054, "Vinicius Jr", 20, "Forward", 22, 1, 1, 450],
      [2285, "Rodrygo", 11, "Forward", 21, 1, 0, 360],
      [289, "Neymar", 10, "Forward", 30, 2, 2, 360],
      [276, "Richarlison", 9, "Forward", 25, 3, 0, 450],
      [1293, "Casemiro", 5, "Midfielder", 30, 1, 1, 450],
      [1513, "Lucas Paquetá", 7, "Midfielder", 25, 1, 2, 450],
    ],
  },
  // Croácia
  3: {
    coach: "Zlatko Dalić", formation: "4-3-3", avgPossession: 48, avgShots: 4.8, avgPass: 82, cleanSheets: 3, yellow: 11, red: 1,
    players: [
      [631, "Dominik Livaković", 1, "Goalkeeper", 27, 0, 0, 660],
      [2296, "Josip Juranović", 2, "Defender", 27, 0, 0, 540],
      [752, "Dejan Lovren", 6, "Defender", 33, 0, 0, 540],
      [2290, "Joško Gvardiol", 3, "Defender", 20, 1, 0, 660],
      [2292, "Borna Sosa", 21, "Defender", 25, 0, 1, 540],
      [617, "Luka Modrić", 10, "Midfielder", 37, 1, 1, 660],
      [627, "Mateo Kovačić", 8, "Midfielder", 28, 0, 1, 570],
      [628, "Marcelo Brozović", 11, "Midfielder", 30, 0, 1, 540],
      [2291, "Ivan Perišić", 4, "Forward", 33, 2, 1, 570],
      [2300, "Marko Livaja", 16, "Forward", 29, 0, 0, 300],
      [2293, "Andrej Kramarić", 9, "Forward", 31, 2, 0, 480],
    ],
  },
  // Marrocos
  5: {
    coach: "Walid Regragui", formation: "4-1-4-1", avgPossession: 41, avgShots: 3.9, avgPass: 79, cleanSheets: 5, yellow: 9, red: 0,
    players: [
      [2506, "Yassine Bounou", 1, "Goalkeeper", 31, 0, 0, 630],
      [2505, "Achraf Hakimi", 2, "Defender", 24, 1, 1, 630],
      [2508, "Romain Saïss", 5, "Defender", 32, 0, 0, 540],
      [2507, "Nayef Aguerd", 6, "Defender", 26, 0, 0, 630],
      [2504, "Noussair Mazraoui", 3, "Defender", 25, 0, 0, 540],
      [2503, "Sofyan Amrabat", 4, "Midfielder", 26, 0, 0, 630],
      [2502, "Azzedine Ounahi", 8, "Midfielder", 22, 0, 1, 540],
      [2501, "Selim Amallah", 14, "Midfielder", 26, 0, 0, 360],
      [2500, "Hakim Ziyech", 7, "Forward", 29, 0, 2, 540],
      [2499, "Sofiane Boufal", 19, "Forward", 29, 1, 0, 420],
      [2498, "Youssef En-Nesyri", 9, "Forward", 25, 3, 0, 540],
    ],
  },
  // Portugal
  27: {
    coach: "Fernando Santos", formation: "4-3-3", avgPossession: 54, avgShots: 5.8, avgPass: 85, cleanSheets: 3, yellow: 7, red: 0,
    players: [
      [2394, "Diogo Costa", 1, "Goalkeeper", 23, 0, 0, 450],
      [2393, "João Cancelo", 20, "Defender", 28, 0, 1, 450],
      [2392, "Pepe", 3, "Defender", 39, 1, 0, 450],
      [2391, "Rúben Dias", 4, "Defender", 25, 0, 0, 450],
      [2390, "Rafael Guerreiro", 5, "Defender", 29, 0, 1, 450],
      [199, "Bernardo Silva", 10, "Midfielder", 28, 1, 2, 450],
      [2389, "João Moutinho", 8, "Midfielder", 36, 0, 1, 360],
      [2388, "Bruno Fernandes", 8, "Midfielder", 28, 3, 2, 450],
      [723, "Cristiano Ronaldo", 7, "Forward", 37, 1, 1, 450],
      [2387, "João Félix", 11, "Forward", 23, 0, 1, 360],
      [2386, "Gonçalo Ramos", 9, "Forward", 21, 3, 0, 300],
    ],
  },
  // Inglaterra
  10: {
    coach: "Gareth Southgate", formation: "4-3-3", avgPossession: 56, avgShots: 6.3, avgPass: 86, cleanSheets: 3, yellow: 5, red: 0,
    players: [
      [631, "Jordan Pickford", 1, "Goalkeeper", 28, 0, 0, 450],
      [521, "Harry Kane", 9, "Forward", 29, 3, 0, 450],
      [47, "Bukayo Saka", 7, "Forward", 21, 3, 2, 450],
      [3040, "Jude Bellingham", 22, "Midfielder", 19, 1, 2, 450],
      [2466, "Phil Foden", 11, "Forward", 22, 0, 2, 360],
      [2467, "Marcus Rashford", 10, "Forward", 25, 3, 0, 330],
      [2468, "Raheem Sterling", 17, "Forward", 28, 0, 1, 330],
      [2469, "Kyle Walker", 2, "Defender", 32, 0, 0, 450],
      [2470, "Harry Maguire", 6, "Defender", 29, 0, 0, 360],
      [2471, "John Stones", 5, "Defender", 28, 0, 1, 450],
      [2472, "Luke Shaw", 23, "Defender", 27, 0, 1, 360],
    ],
  },
};

// ─── Service ──────────────────────────────────────────────────────────────────
export async function getTeams() {
  /**
   * Em produção:
   * const res = await fetch(
   *   "https://v3.football.api-sports.io/teams?league=1&season=2022",
   *   { headers: { "x-apisports-key": process.env.API_FOOTBALL_KEY! }, next: { revalidate: 43200 } }
   * );
   */
  return ALL_WC2022_TEAMS;
}

export async function getTeamProfile(teamId: number): Promise<TeamProfile | null> {
  /**
   * Em produção:
   * const [teamRes, statsRes, squadRes] = await Promise.all([
   *   fetch(`/teams?id=${teamId}&season=2022&league=1`, ...),
   *   fetch(`/teams/statistics?team=${teamId}&season=2022&league=1`, ...),
   *   fetch(`/players/squads?team=${teamId}`, ...),
   * ]);
   */
  const team = ALL_WC2022_TEAMS.find((t) => t.id === teamId);
  if (!team) return null;

  const raw = SQUADS[teamId];
  if (!raw) {
    // Perfil genérico para times sem elenco detalhado
    return {
      team,
      coach: "—",
      formation: "4-4-2",
      stats: {
        played: 3, wins: 1, draws: 0, losses: 2,
        goalsFor: 2, goalsAgainst: 5, goalsDiff: -3,
        points: 3, avgPossession: 45, avgShotsOnTarget: 3,
        avgPassAccuracy: 76, cleanSheets: 0, yellowCards: 5, redCards: 0,
      },
      squad: [],
    };
  }

  const squad: SquadPlayer[] = raw.players.map(([id, name, number, position, age, goals, assists, minutesPlayed]) => ({
    id,
    name,
    number,
    position,
    age,
    nationality: team.country,
    photo: `https://media.api-sports.io/football/players/${id}.png`,
    goals,
    assists,
    minutesPlayed,
    rating: parseFloat((7 + (id % 30) / 10).toFixed(1)),
  }));

  return {
    team,
    coach: raw.coach,
    formation: raw.formation,
    stats: {
      played: 7,
      wins: 4,
      draws: 2,
      losses: 1,
      goalsFor: 15,
      goalsAgainst: 7,
      goalsDiff: 8,
      points: 14,
      avgPossession: raw.avgPossession,
      avgShotsOnTarget: raw.avgShots,
      avgPassAccuracy: raw.avgPass,
      cleanSheets: raw.cleanSheets,
      yellowCards: raw.yellow,
      redCards: raw.red,
    },
    squad,
  };
}
