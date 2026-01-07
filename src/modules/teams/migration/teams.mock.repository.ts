import {
  TeamsListResponse,
  TeamPlayersResponse,
  TeamOverviewResponse,
  TeamMatchesResponse,
  TeamSeasonStatsResponse,
} from "./teams.types";
import { TeamsRepository } from "./teams.repository";

export const mockTeams: TeamsListResponse["data"] = [
  {
    id: 1,
    name: "Manchester United",
    short_code: "MUN",
    logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
    country: {
      name: "England",
      code: "ENG",
      flag: "https://flagcdn.com/w320/gb.png",
    },
    founded: 1878,
    stadium: { name: "Old Trafford", capacity: 74879 },
  },
  {
    id: 2,
    name: "Liverpool",
    short_code: "LIV",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
    country: {
      name: "England",
      code: "ENG",
      flag: "https://flagcdn.com/w320/gb.png",
    },
    founded: 1892,
    stadium: { name: "Anfield", capacity: 54074 },
  },
  {
    id: 3,
    name: "Arsenal",
    short_code: "ARS",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
    country: {
      name: "England",
      code: "ENG",
      flag: "https://flagcdn.com/w320/gb.png",
    },
    founded: 1886,
    stadium: { name: "Emirates Stadium", capacity: 60704 },
  },
  {
    id: 4,
    name: "Chelsea",
    short_code: "CHE",
    logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
    country: {
      name: "England",
      code: "ENG",
      flag: "https://flagcdn.com/w320/gb.png",
    },
    founded: 1905,
    stadium: { name: "Stamford Bridge", capacity: 40341 },
  },
  {
    id: 5,
    name: "Manchester City",
    short_code: "MCI",
    logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
    country: {
      name: "England",
      code: "ENG",
      flag: "https://flagcdn.com/w320/gb.png",
    },
    founded: 1880,
    stadium: { name: "Etihad Stadium", capacity: 53400 },
  },
];

export const mockTeamPlayers: Record<number, TeamPlayersResponse> = {
  1: {
    team_id: 1,
    players: Array.from({ length: 22 }).map((_, i) => ({
      id: 1000 + i,
      name: `Player ${i + 1}`,
      photo: null,
      position: {
        id: i % 4,
        label: ["Goalkeeper", "Defender", "Midfielder", "Forward"][i % 4],
      },
      jersey_number: i + 1,
      nationality: "England",
      contract: {
        start: "2022-07-01",
        end: "2026-06-30",
      },
    })),
  },
};

export const mockTeamOverviews: Record<number, TeamOverviewResponse> = {
  1: {
    id: 1,
    name: "Manchester United",
    short_code: "MUN",
    logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
    founded: 1878,
    country: {
      name: "England",
      code: "ENG",
      flag: "https://flagcdn.com/w320/gb.png",
    },
    stadium: { name: "Old Trafford", capacity: 74879 },
    current_season: { id: 1001, name: "2024/25" },
  },
};

export const mockTeamMatches: Record<number, TeamMatchesResponse> = {
  1: {
    latest: Array.from({ length: 5 }).map((_, i) => ({
      id: 9000 + i,
      kickoff_time: `2026-01-${5 + i}T18:00:00Z`,
      status: "FT",
      league: {
        id: 100,
        name: "Premier League",
        logo: "https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg",
      },
      teams: {
        home: { id: 1, name: "Manchester United", logo: null },
        away: { id: 2, name: "Liverpool", logo: null },
      },
      score: {
        home: 2,
        away: 1,
      },
    })),
    upcoming: Array.from({ length: 5 }).map((_, i) => ({
      id: 9100 + i,
      kickoff_time: `2026-01-${15 + i}T20:00:00Z`,
      status: "UPCOMING",
      league: {
        id: 100,
        name: "Premier League",
        logo: "https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg",
      },
      teams: {
        home: { id: 1, name: "Manchester United", logo: null },
        away: { id: 3, name: "Arsenal", logo: null },
      },
    })),
  },
};

export const mockTeamStats: Record<number, TeamSeasonStatsResponse> = {
  1: {
    team: {
      id: 1,
      name: "Manchester United",
      logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
    },
    seasons: [
      {
        season: { id: 1001, name: "2024/25" },
        stats: {
          goals_for: 58,
          goals_against: 32,
          shots: 410,
          yellow_cards: 61,
          red_cards: 3,
          minutes_played: 34200,
          clean_sheets: 14,
          wins: 21,
          draws: 9,
          losses: 8,
        },
      },
      {
        season: { id: 999, name: "2023/24" },
        stats: {
          goals_for: 54,
          goals_against: 40,
          shots: 395,
          yellow_cards: 68,
          red_cards: 5,
          minutes_played: 34200,
          clean_sheets: 11,
          wins: 18,
          draws: 10,
          losses: 10,
        },
      },
    ],
  },
};

export const mockTeamsRepository: TeamsRepository = {
  async getTeams(page, limit, search): Promise<TeamsListResponse> {
    let data = mockTeams;

    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.short_code?.toLowerCase().includes(q)
      );
    }

    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      data: data.slice(start, end),
      pagination: {
        page,
        limit,
        total: data.length,
        has_next: end < data.length,
      },
    };
  },

  async getTeamPlayers(teamId) {
    return mockTeamPlayers[teamId] ?? null;
  },

  async getTeamOverview(teamId) {
    return mockTeamOverviews[teamId] ?? null;
  },

  async getTeamMatches(teamId) {
    return mockTeamMatches[teamId] ?? null;
  },

  async getTeamStats(teamId) {
    return mockTeamStats[teamId] ?? null;
  },
};
