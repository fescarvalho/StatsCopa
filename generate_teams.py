import json

teams = [
    (1, 'USA', 'USA', 'CONCACAF'), (24, 'Mexico', 'MEX', 'CONCACAF'), (88, 'Canada', 'CAN', 'CONCACAF'),
    (26, 'Argentina', 'ARG', 'CONMEBOL'), (6, 'Brazil', 'BRA', 'CONMEBOL'), (31, 'Uruguay', 'URU', 'CONMEBOL'),
    (49, 'Colombia', 'COL', 'CONMEBOL'), (79, 'Ecuador', 'ECU', 'CONMEBOL'), (30, 'Peru', 'PER', 'CONMEBOL'),
    (2, 'France', 'FRA', 'UEFA'), (10, 'England', 'ENG', 'UEFA'), (9, 'Spain', 'ESP', 'UEFA'),
    (25, 'Germany', 'GER', 'UEFA'), (27, 'Portugal', 'POR', 'UEFA'), (7, 'Italy', 'ITA', 'UEFA'),
    (1118, 'Netherlands', 'NED', 'UEFA'), (4, 'Belgium', 'BEL', 'UEFA'), (3, 'Croatia', 'CRO', 'UEFA'),
    (15, 'Switzerland', 'SUI', 'UEFA'), (35, 'Denmark', 'DEN', 'UEFA'), (11, 'Sweden', 'SWE', 'UEFA'),
    (14, 'Serbia', 'SRB', 'UEFA'), (21, 'Poland', 'POL', 'UEFA'), (18, 'Scotland', 'SCO', 'UEFA'),
    (730, 'Wales', 'WAL', 'UEFA'), (5, 'Morocco', 'MAR', 'CAF'), (32, 'Senegal', 'SEN', 'CAF'),
    (36, 'Egypt', 'EGY', 'CAF'), (28, 'Nigeria', 'NGA', 'CAF'), (44, 'Cameroon', 'CMR', 'CAF'),
    (12, 'Algeria', 'ALG', 'CAF'), (38, 'Ghana', 'GHA', 'CAF'), (20, 'Ivory Coast', 'CIV', 'CAF'),
    (106, 'Mali', 'MLI', 'CAF'), (33, 'Japan', 'JPN', 'AFC'), (34, 'South Korea', 'KOR', 'AFC'),
    (63, 'Iran', 'IRN', 'AFC'), (116, 'Saudi Arabia', 'KSA', 'AFC'), (23, 'Australia', 'AUS', 'AFC'),
    (882, 'Qatar', 'QAT', 'AFC'), (124, 'Iraq', 'IRQ', 'AFC'), (105, 'UAE', 'UAE', 'AFC'),
    (71, 'Costa Rica', 'CRC', 'CONCACAF'), (99, 'Panama', 'PAN', 'CONCACAF'), (112, 'Jamaica', 'JAM', 'CONCACAF'),
    (95, 'New Zealand', 'NZL', 'OFC'), (29, 'Chile', 'CHI', 'CONMEBOL'), (102, 'South Africa', 'RSA', 'CAF')
]

teams_code = 'import type { Team } from "@/types";\n\n// ─── Todas as 48 seleções da Copa 2026 ──────────────────────────────────────────\nexport const ALL_WC2026_TEAMS: Team[] = [\n'
for t in teams:
    teams_code += f'  {{ id: {t[0]}, name: "{t[1]}", shortName: "{t[2]}", logo: "https://media.api-sports.io/football/teams/{t[0]}.png", country: "{t[1]}", confederation: "{t[3]}" }},\n'
teams_code += '];\n\nexport function getTeamById(id: number): Team | undefined {\n  return ALL_WC2026_TEAMS.find((t) => t.id === id);\n}\n'

with open('src/data/teams.data.ts', 'w', encoding='utf-8') as f:
    f.write(teams_code)

groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']
standings_code = 'import type { StandingGroup } from "@/types";\nimport { ALL_WC2026_TEAMS } from "@/data/teams.data";\n\nconst t = (id: number) => ALL_WC2026_TEAMS.find((x) => x.id === id)!;\n\nconst RAW_STANDINGS: StandingGroup[] = [\n'

for i, g in enumerate(groups):
    group_teams = teams[i*4:(i+1)*4]
    standings_code += f'  {{\n    group: "Grupo {g}",\n    entries: [\n'
    for rank, t_info in enumerate(group_teams):
        standings_code += f'      {{ rank: {rank+1}, team: t({t_info[0]}), points: 0, goalsDiff: 0, group: "Grupo {g}", form: "---", description: null, all: {{ played: 0, win: 0, draw: 0, lose: 0, goals: {{ for: 0, against: 0 }} }} }},\n'
    standings_code += '    ],\n  },\n'

standings_code += '];\n\nexport async function getStandings(): Promise<StandingGroup[]> {\n  return RAW_STANDINGS;\n}\n'

with open('src/services/standings.service.ts', 'w', encoding='utf-8') as f:
    f.write(standings_code)
