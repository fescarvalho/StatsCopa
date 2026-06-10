import type { StandingGroup } from "@/types";
import { ALL_WC2026_TEAMS } from "@/data/teams.data";

const t = (id: number) => ALL_WC2026_TEAMS.find((x) => x.id === id)!;

const RAW_STANDINGS: StandingGroup[] = [
  {
    group: "Grupo A",
    entries: [
      { rank: 1, team: t(1), points: 0, goalsDiff: 0, group: "Grupo A", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
      { rank: 2, team: t(24), points: 0, goalsDiff: 0, group: "Grupo A", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
      { rank: 3, team: t(88), points: 0, goalsDiff: 0, group: "Grupo A", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
      { rank: 4, team: t(26), points: 0, goalsDiff: 0, group: "Grupo A", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
    ],
  },
  {
    group: "Grupo B",
    entries: [
      { rank: 1, team: t(6), points: 0, goalsDiff: 0, group: "Grupo B", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
      { rank: 2, team: t(31), points: 0, goalsDiff: 0, group: "Grupo B", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
      { rank: 3, team: t(49), points: 0, goalsDiff: 0, group: "Grupo B", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
      { rank: 4, team: t(79), points: 0, goalsDiff: 0, group: "Grupo B", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
    ],
  },
  {
    group: "Grupo C",
    entries: [
      { rank: 1, team: t(30), points: 0, goalsDiff: 0, group: "Grupo C", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
      { rank: 2, team: t(2), points: 0, goalsDiff: 0, group: "Grupo C", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
      { rank: 3, team: t(10), points: 0, goalsDiff: 0, group: "Grupo C", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
      { rank: 4, team: t(9), points: 0, goalsDiff: 0, group: "Grupo C", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
    ],
  },
  {
    group: "Grupo D",
    entries: [
      { rank: 1, team: t(25), points: 0, goalsDiff: 0, group: "Grupo D", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
      { rank: 2, team: t(27), points: 0, goalsDiff: 0, group: "Grupo D", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
      { rank: 3, team: t(7), points: 0, goalsDiff: 0, group: "Grupo D", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
      { rank: 4, team: t(1118), points: 0, goalsDiff: 0, group: "Grupo D", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
    ],
  },
  {
    group: "Grupo E",
    entries: [
      { rank: 1, team: t(4), points: 0, goalsDiff: 0, group: "Grupo E", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
      { rank: 2, team: t(3), points: 0, goalsDiff: 0, group: "Grupo E", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
      { rank: 3, team: t(15), points: 0, goalsDiff: 0, group: "Grupo E", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
      { rank: 4, team: t(35), points: 0, goalsDiff: 0, group: "Grupo E", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
    ],
  },
  {
    group: "Grupo F",
    entries: [
      { rank: 1, team: t(11), points: 0, goalsDiff: 0, group: "Grupo F", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
      { rank: 2, team: t(14), points: 0, goalsDiff: 0, group: "Grupo F", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
      { rank: 3, team: t(21), points: 0, goalsDiff: 0, group: "Grupo F", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
      { rank: 4, team: t(18), points: 0, goalsDiff: 0, group: "Grupo F", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
    ],
  },
  {
    group: "Grupo G",
    entries: [
      { rank: 1, team: t(730), points: 0, goalsDiff: 0, group: "Grupo G", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
      { rank: 2, team: t(5), points: 0, goalsDiff: 0, group: "Grupo G", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
      { rank: 3, team: t(32), points: 0, goalsDiff: 0, group: "Grupo G", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
      { rank: 4, team: t(36), points: 0, goalsDiff: 0, group: "Grupo G", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
    ],
  },
  {
    group: "Grupo H",
    entries: [
      { rank: 1, team: t(28), points: 0, goalsDiff: 0, group: "Grupo H", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
      { rank: 2, team: t(44), points: 0, goalsDiff: 0, group: "Grupo H", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
      { rank: 3, team: t(12), points: 0, goalsDiff: 0, group: "Grupo H", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
      { rank: 4, team: t(38), points: 0, goalsDiff: 0, group: "Grupo H", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
    ],
  },
  {
    group: "Grupo I",
    entries: [
      { rank: 1, team: t(20), points: 0, goalsDiff: 0, group: "Grupo I", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
      { rank: 2, team: t(106), points: 0, goalsDiff: 0, group: "Grupo I", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
      { rank: 3, team: t(33), points: 0, goalsDiff: 0, group: "Grupo I", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
      { rank: 4, team: t(34), points: 0, goalsDiff: 0, group: "Grupo I", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
    ],
  },
  {
    group: "Grupo J",
    entries: [
      { rank: 1, team: t(63), points: 0, goalsDiff: 0, group: "Grupo J", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
      { rank: 2, team: t(116), points: 0, goalsDiff: 0, group: "Grupo J", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
      { rank: 3, team: t(23), points: 0, goalsDiff: 0, group: "Grupo J", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
      { rank: 4, team: t(882), points: 0, goalsDiff: 0, group: "Grupo J", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
    ],
  },
  {
    group: "Grupo K",
    entries: [
      { rank: 1, team: t(124), points: 0, goalsDiff: 0, group: "Grupo K", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
      { rank: 2, team: t(105), points: 0, goalsDiff: 0, group: "Grupo K", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
      { rank: 3, team: t(71), points: 0, goalsDiff: 0, group: "Grupo K", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
      { rank: 4, team: t(99), points: 0, goalsDiff: 0, group: "Grupo K", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
    ],
  },
  {
    group: "Grupo L",
    entries: [
      { rank: 1, team: t(112), points: 0, goalsDiff: 0, group: "Grupo L", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
      { rank: 2, team: t(95), points: 0, goalsDiff: 0, group: "Grupo L", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
      { rank: 3, team: t(29), points: 0, goalsDiff: 0, group: "Grupo L", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
      { rank: 4, team: t(102), points: 0, goalsDiff: 0, group: "Grupo L", form: "---", description: null, all: { played: 0, win: 0, draw: 0, lose: 0, goals: { for: 0, against: 0 } } },
    ],
  },
];

export async function getStandings(): Promise<StandingGroup[]> {
  try {
    const key = process.env.NEXT_PUBLIC_API_FOOTBALL_KEY;
    if (!key) throw new Error("No API key");

    const res = await fetch(
      "https://v3.football.api-sports.io/standings?league=1&season=2026",
      { headers: { "x-apisports-key": key }, next: { revalidate: 43200 } }
    );
    if (!res.ok) throw new Error("API request failed");
    
    const json = await res.json();
    if (!json.response || json.response.length === 0 || !json.response[0].league.standings || json.response[0].league.standings.length === 0) {
      return RAW_STANDINGS; // fallback para zero
    }

    const groupsArray: any[][] = json.response[0].league.standings;
    
    return groupsArray.map((groupEntries: any[]) => {
      const groupName = groupEntries[0]?.group || "Group";
      return {
        group: groupName,
        entries: groupEntries.map((entry) => {
          const team = t(entry.team.id) || { id: entry.team.id, name: entry.team.name, shortName: "UNK", logo: entry.team.logo, country: entry.team.name, confederation: "UEFA" };
          let description: "Qualified" | "Eliminated" | null = null;
          if (entry.description) {
            if (entry.description.toLowerCase().includes("promotion") || entry.description.toLowerCase().includes("next")) description = "Qualified";
            else if (entry.description.toLowerCase().includes("eliminated")) description = "Eliminated";
          }
          return {
            rank: entry.rank,
            team,
            points: entry.points,
            goalsDiff: entry.goalsDiff,
            group: entry.group,
            form: entry.form || "---",
            description,
            all: entry.all,
          };
        }),
      };
    });
  } catch (error) {
    console.error("Failed to fetch standings:", error);
    return RAW_STANDINGS;
  }
}
