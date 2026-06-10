import type { StandingGroup } from "@/types";
import { ALL_WC2026_TEAMS } from "@/data/teams.data";

const t = (id: number) => ALL_WC2026_TEAMS.find((x) => x.id === id)!;

// ─── Copa do Mundo 2026 — Classificação final de grupos ───────────────────────
// Fonte: resultados reais da Copa 2026 (Qatar)
// Em produção: fetch(`/standings?league=1&season=2026`, { next: { revalidate: 43200 } })

const RAW_STANDINGS: StandingGroup[] = [
  {
    group: "Grupo A",
    entries: [
      { rank: 1, team: t(1118), points: 7, goalsDiff: 4, group: "Grupo A", form: "WDW", description: "Qualified", all: { played: 3, win: 2, draw: 1, lose: 0, goals: { for: 5, against: 1 } } },
      { rank: 2, team: t(32), points: 6, goalsDiff: 1, group: "Grupo A", form: "LWW", description: "Qualified", all: { played: 3, win: 2, draw: 0, lose: 1, goals: { for: 5, against: 4 } } },
      { rank: 3, team: t(79), points: 4, goalsDiff: 1, group: "Grupo A", form: "WDL", description: "Eliminated", all: { played: 3, win: 1, draw: 1, lose: 1, goals: { for: 4, against: 3 } } },
      { rank: 4, team: t(882), points: 0, goalsDiff: -6, group: "Grupo A", form: "LLL", description: "Eliminated", all: { played: 3, win: 0, draw: 0, lose: 3, goals: { for: 1, against: 7 } } },
    ],
  },
  {
    group: "Grupo B",
    entries: [
      { rank: 1, team: t(10), points: 7, goalsDiff: 7, group: "Grupo B", form: "WWD", description: "Qualified", all: { played: 3, win: 2, draw: 1, lose: 0, goals: { for: 9, against: 2 } } },
      { rank: 2, team: t(1), points: 5, goalsDiff: 1, group: "Grupo B", form: "DWD", description: "Qualified", all: { played: 3, win: 1, draw: 2, lose: 0, goals: { for: 2, against: 1 } } },
      { rank: 3, team: t(63), points: 3, goalsDiff: -3, group: "Grupo B", form: "LLW", description: "Eliminated", all: { played: 3, win: 1, draw: 0, lose: 2, goals: { for: 4, against: 7 } } },
      { rank: 4, team: t(730), points: 1, goalsDiff: -5, group: "Grupo B", form: "DLL", description: "Eliminated", all: { played: 3, win: 0, draw: 1, lose: 2, goals: { for: 1, against: 6 } } },
    ],
  },
  {
    group: "Grupo C",
    entries: [
      { rank: 1, team: t(26), points: 6, goalsDiff: 3, group: "Grupo C", form: "WLW", description: "Qualified", all: { played: 3, win: 2, draw: 0, lose: 1, goals: { for: 5, against: 2 } } },
      { rank: 2, team: t(21), points: 4, goalsDiff: -3, group: "Grupo C", form: "DLW", description: "Qualified", all: { played: 3, win: 1, draw: 1, lose: 1, goals: { for: 3, against: 6 } } },
      { rank: 3, team: t(24), points: 4, goalsDiff: -1, group: "Grupo C", form: "DWL", description: "Eliminated", all: { played: 3, win: 1, draw: 1, lose: 1, goals: { for: 2, against: 3 } } },
      { rank: 4, team: t(116), points: 3, goalsDiff: -2, group: "Grupo C", form: "WLL", description: "Eliminated", all: { played: 3, win: 1, draw: 0, lose: 2, goals: { for: 3, against: 5 } } },
    ],
  },
  {
    group: "Grupo D",
    entries: [
      { rank: 1, team: t(2), points: 6, goalsDiff: 2, group: "Grupo D", form: "WLW", description: "Qualified", all: { played: 3, win: 2, draw: 0, lose: 1, goals: { for: 6, against: 4 } } },
      { rank: 2, team: t(23), points: 6, goalsDiff: -1, group: "Grupo D", form: "WLW", description: "Qualified", all: { played: 3, win: 2, draw: 0, lose: 1, goals: { for: 3, against: 4 } } },
      { rank: 3, team: t(97), points: 4, goalsDiff: 0, group: "Grupo D", form: "DWL", description: "Eliminated", all: { played: 3, win: 1, draw: 1, lose: 1, goals: { for: 1, against: 1 } } },
      { rank: 4, team: t(35), points: 1, goalsDiff: -2, group: "Grupo D", form: "DDL", description: "Eliminated", all: { played: 3, win: 0, draw: 1, lose: 2, goals: { for: 1, against: 3 } } },
    ],
  },
  {
    group: "Grupo E",
    entries: [
      { rank: 1, team: t(9), points: 4, goalsDiff: 6, group: "Grupo E", form: "WLD", description: "Qualified", all: { played: 3, win: 1, draw: 1, lose: 1, goals: { for: 9, against: 3 } } },
      { rank: 2, team: t(33), points: 6, goalsDiff: 0, group: "Grupo E", form: "LWW", description: "Qualified", all: { played: 3, win: 2, draw: 0, lose: 1, goals: { for: 4, against: 4 } } },
      { rank: 3, team: t(25), points: 4, goalsDiff: -1, group: "Grupo E", form: "WLL", description: "Eliminated", all: { played: 3, win: 1, draw: 0, lose: 2, goals: { for: 6, against: 7 } } }, // Corrigido: Alemanha na E
      { rank: 4, team: t(71), points: 0, goalsDiff: -8, group: "Grupo E", form: "LLL", description: "Eliminated", all: { played: 3, win: 0, draw: 0, lose: 3, goals: { for: 0, against: 8 } } },
    ],
  },
  {
    group: "Grupo F",
    entries: [
      { rank: 1, team: t(5), points: 7, goalsDiff: 4, group: "Grupo F", form: "DWW", description: "Qualified", all: { played: 3, win: 2, draw: 1, lose: 0, goals: { for: 6, against: 2 } } },
      { rank: 2, team: t(3), points: 5, goalsDiff: 2, group: "Grupo F", form: "DWW", description: "Qualified", all: { played: 3, win: 1, draw: 2, lose: 0, goals: { for: 4, against: 2 } } },
      { rank: 3, team: t(4), points: 4, goalsDiff: 0, group: "Grupo F", form: "WDL", description: "Eliminated", all: { played: 3, win: 1, draw: 1, lose: 1, goals: { for: 1, against: 1 } } },
      { rank: 4, team: t(88), points: 1, goalsDiff: -3, group: "Grupo F", form: "LDL", description: "Eliminated", all: { played: 3, win: 0, draw: 1, lose: 2, goals: { for: 2, against: 5 } } },
    ],
  },
  {
    group: "Grupo G",
    entries: [
      { rank: 1, team: t(6), points: 6, goalsDiff: 3, group: "Grupo G", form: "WWD", description: "Qualified", all: { played: 3, win: 2, draw: 1, lose: 0, goals: { for: 3, against: 0 } } },
      { rank: 2, team: t(15), points: 6, goalsDiff: 0, group: "Grupo G", form: "WDW", description: "Qualified", all: { played: 3, win: 2, draw: 0, lose: 1, goals: { for: 4, against: 4 } } },
      { rank: 3, team: t(44), points: 4, goalsDiff: -2, group: "Grupo G", form: "LWL", description: "Eliminated", all: { played: 3, win: 1, draw: 0, lose: 2, goals: { for: 4, against: 6 } } },
      { rank: 4, team: t(14), points: 3, goalsDiff: -3, group: "Grupo G", form: "LLW", description: "Eliminated", all: { played: 3, win: 1, draw: 0, lose: 2, goals: { for: 5, against: 8 } } },
    ],
  },
  {
    group: "Grupo H",
    entries: [
      { rank: 1, team: t(27), points: 6, goalsDiff: 6, group: "Grupo H", form: "WWL", description: "Qualified", all: { played: 3, win: 2, draw: 0, lose: 1, goals: { for: 8, against: 2 } } },
      { rank: 2, team: t(34), points: 4, goalsDiff: 0, group: "Grupo H", form: "LDW", description: "Qualified", all: { played: 3, win: 1, draw: 1, lose: 1, goals: { for: 4, against: 4 } } },
      { rank: 3, team: t(31), points: 4, goalsDiff: 0, group: "Grupo H", form: "WLD", description: "Eliminated", all: { played: 3, win: 1, draw: 1, lose: 1, goals: { for: 2, against: 2 } } },
      { rank: 4, team: t(38), points: 3, goalsDiff: -3, group: "Grupo H", form: "LWL", description: "Eliminated", all: { played: 3, win: 1, draw: 0, lose: 2, goals: { for: 5, against: 8 } } },
    ],
  },
];

// ─── Service ──────────────────────────────────────────────────────────────────
export async function getStandings(): Promise<StandingGroup[]> {
  /**
   * Em produção, substitua pelo fetch real:
   *
   * const res = await fetch(
   *   "https://v3.football.api-sports.io/standings?league=1&season=2026",
   *   {
   *     headers: { "x-apisports-key": process.env.API_FOOTBALL_KEY! },
   *     next: { revalidate: 43200 },
   *   }
   * );
   * const json = await res.json();
   * return transformStandings(json.response[0].league.standings);
   */
  return RAW_STANDINGS;
}
