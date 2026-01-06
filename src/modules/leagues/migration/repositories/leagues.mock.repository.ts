import {
  LeagueCard,
  LeagueMatchesResponse,
  LeagueProfileResponse,
  LeaguesListResponse,
  LeagueStandingsResponse,
  LeagueStatisticsResponse,
} from "../leagues.types";
import { LeaguesRepository } from "./leagues.repository";

export const mockLeaguesData: LeagueCard[] = [
  {
    id: 100,
    name: "Premier League",
    logo: "https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg",
    competition_type: "league",
    country: {
      name: "England",
      code: "ENG",
      flag: "https://flagcdn.com/w320/gb.png",
    },
  },
  {
    id: 101,
    name: "La Liga",
    logo: "https://upload.wikimedia.org/wikipedia/en/7/75/LaLiga_Santander.svg",
    competition_type: "league",
    country: {
      name: "Spain",
      code: "ESP",
      flag: "https://flagcdn.com/w320/es.png",
    },
  },
  {
    id: 102,
    name: "Serie A",
    logo: "https://upload.wikimedia.org/wikipedia/en/e/e1/Serie_A_logo_%282019%29.svg",
    competition_type: "league",
    country: {
      name: "Italy",
      code: "ITA",
      flag: "https://flagcdn.com/w320/it.png",
    },
  },
  {
    id: 103,
    name: "Bundesliga",
    logo: "https://upload.wikimedia.org/wikipedia/en/d/df/Bundesliga_logo_%282017%29.svg",
    competition_type: "league",
    country: {
      name: "Germany",
      code: "GER",
      flag: "https://flagcdn.com/w320/de.png",
    },
  },
  {
    id: 104,
    name: "Ligue 1",
    logo: "https://upload.wikimedia.org/wikipedia/en/c/c7/Ligue1.svg",
    competition_type: "league",
    country: {
      name: "France",
      code: "FRA",
      flag: "https://flagcdn.com/w320/fr.png",
    },
  },
  {
    id: 105,
    name: "Eredivisie",
    logo: "https://upload.wikimedia.org/wikipedia/en/7/7e/Eredivisie_nieuw_logo.png",
    competition_type: "league",
    country: {
      name: "Netherlands",
      code: "NED",
      flag: "https://flagcdn.com/w320/nl.png",
    },
  },
  {
    id: 106,
    name: "Primeira Liga",
    logo: "https://upload.wikimedia.org/wikipedia/en/9/9e/Primeira_Liga_logo.png",
    competition_type: "league",
    country: {
      name: "Portugal",
      code: "POR",
      flag: "https://flagcdn.com/w320/pt.png",
    },
  },
  {
    id: 107,
    name: "FA Cup",
    logo: "https://upload.wikimedia.org/wikipedia/en/2/2c/FA_Cup.svg",
    competition_type: "cup",
    country: {
      name: "England",
      code: "ENG",
      flag: "https://flagcdn.com/w320/gb.png",
    },
  },
  {
    id: 108,
    name: "Copa del Rey",
    logo: "https://upload.wikimedia.org/wikipedia/en/9/9a/Copa_del_Rey_logo.svg",
    competition_type: "cup",
    country: {
      name: "Spain",
      code: "ESP",
      flag: "https://flagcdn.com/w320/es.png",
    },
  },
  {
    id: 109,
    name: "DFB-Pokal",
    logo: "https://upload.wikimedia.org/wikipedia/en/1/15/DFB-Pokal_Logo.svg",
    competition_type: "cup",
    country: {
      name: "Germany",
      code: "GER",
      flag: "https://flagcdn.com/w320/de.png",
    },
  },
];

export const mockLeaguesRepository: LeaguesRepository = {
  async getLeagues(page, limit, search): Promise<LeaguesListResponse> {
    let data = mockLeaguesData;

    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.country.name.toLowerCase().includes(q)
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

  async getLeagueProfile(leagueId): Promise<LeagueProfileResponse | null> {
    const league = mockLeaguesData.find((l) => l.id === leagueId);
    if (!league) return null;

    return {
      ...league,
      current_season: {
        id: leagueId * 10,
        name: "2024/25",
        starting_at: "2024-08-01",
        ending_at: "2025-05-31",
      },
    };
  },

  async getLeagueStandings(leagueId): Promise<LeagueStandingsResponse | null> {
    const league = mockLeaguesData.find((l) => l.id === leagueId);
    if (!league) return null;

    return {
      league: {
        id: league.id,
        name: league.name,
        country: league.country.name,
      },
      season: {
        id: leagueId * 10,
        name: "2024/25",
      },
      table: Array.from({ length: 20 }).map((_, i) => ({
        position: i + 1,
        team: {
          id: leagueId * 100 + i,
          name: `Team ${i + 1}`,
          logo: null,
        },
        points: 60 - i * 2,
      })),
    };
  },

  async getLeagueStatistics(
    leagueId
  ): Promise<LeagueStatisticsResponse | null> {
    const league = mockLeaguesData.find((l) => l.id === leagueId);
    if (!league) return null;

    return {
      league: { id: league.id, name: league.name },
      season: { id: leagueId * 10, name: "2024/25" },
      overview: {
        matches_played: 240,
        total_goals: 680,
        average_goals_per_match: 2.83,
        yellow_cards: 920,
        red_cards: 41,
      },
      scoring: {
        home_goals_percentage: 55,
        away_goals_percentage: 45,
        over_25_percentage: 62,
        under_25_percentage: 38,
      },
      discipline: {
        average_yellow_cards: 3.9,
        average_red_cards: 0.17,
      },
    };
  },

  async getLeagueMatches(leagueId, status): Promise<LeagueMatchesResponse> {
    const league = mockLeaguesData.find((l) => l.id === leagueId)!;

    return {
      league: { id: league.id, name: league.name },
      season: { id: leagueId * 10, name: "2024/25" },
      matches: Array.from({ length: 12 }).map((_, i) => ({
        id: leagueId * 1000 + i,
        kickoff_time: `2026-01-${10 + i}T18:00:00Z`,
        status:
          status ?? (i % 3 === 0 ? "LIVE" : i % 2 === 0 ? "UPCOMING" : "FT"),
        home_team: {
          id: leagueId * 200 + i,
          name: `Home FC ${i + 1}`,
          logo: null,
          score: { goals: i % 4 },
        },
        away_team: {
          id: leagueId * 300 + i,
          name: `Away FC ${i + 1}`,
          logo: null,
          score: { goals: (i + 1) % 3 },
        },
      })),
    };
  },
};
