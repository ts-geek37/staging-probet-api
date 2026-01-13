import { MatchListItem } from "@/modules/matches/migration/matches.types";
import { PaginationMeta } from "@/types";
import { LeaguesRepository } from "./leagues.repository";
import {
  CachedLeagueContext,
  CurrentSeason,
  LeagueCard,
  LeagueMatchesResponse,
  LeagueProfileResponse,
  LeaguesListResponse,
  LeagueStandingsResponse,
  LeagueStatisticsResponse,
  TopScorersResponse,
} from "./leagues.types";

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
];

const buildPagination = (
  page: number,
  limit: number,
  total: number
): PaginationMeta => ({
  page,
  limit,
  count: total,
  total_pages: Math.ceil(total / limit),
});

const buildSeason = (leagueId: number): CurrentSeason => ({
  id: leagueId * 10,
  name: "2024/25",
  starting_at: "2024-08-01",
  ending_at: "2025-05-31",
  stage: {
    id: leagueId * 100,
    name: "Regular Season",
    starting_at: "2024-08-01",
    ending_at: "2025-05-31",
  },
  stages: [
    {
      id: leagueId * 100,
      name: "Regular Season",
      starting_at: "2024-08-01",
      ending_at: "2025-05-31",
    },
  ],
});

const buildStandings = (league: LeagueCard): LeagueStandingsResponse => ({
  league: {
    id: league.id,
    name: league.name,
    country: league.country.name,
  },
  season: buildSeason(league.id),
  table: Array.from({ length: 20 }).map((_, i) => ({
    position: i + 1,
    team: {
      id: league.id * 100 + i,
      name: `${league.name} Team ${i + 1}`,
      logo: "https://cdn.sportmonks.com/images/soccer/teams/1/1.png",
    },
    points: 65 - i * 2,
  })),
});

const buildMatches = (league: LeagueCard): MatchListItem[] =>
  Array.from({ length: 18 }).map((_, i) => ({
    id: league.id * 1000 + i,
    kickoff_time: `2026-01-${String(i + 1).padStart(2, "0")}T18:00:00Z`,
    status: i < 6 ? "LIVE" : i < 12 ? "UPCOMING" : "FINISHED",
    league: {
      id: league.id,
      name: league.name,
      logo: league.logo,
    },
    teams: {
      home: {
        id: league.id * 10 + i,
        name: `${league.name} Home ${i + 1}`,
        logo: "https://cdn.sportmonks.com/images/soccer/teams/2/2.png",
      },
      away: {
        id: league.id * 20 + i,
        name: `${league.name} Away ${i + 1}`,
        logo: "https://cdn.sportmonks.com/images/soccer/teams/3/3.png",
      },
    },
    score: i >= 12 ? { home: i % 4, away: (i + 1) % 3 } : undefined,
  }));

const buildStatistics = (league: LeagueCard): LeagueStatisticsResponse => ({
  league: { id: league.id, name: league.name },
  seasons: [
    {
      season: buildSeason(league.id),
      overview: {
        matches_played: 240,
        total_goals: 680,
        average_goals_per_match: 2.83,
      },
      scoring: {
        home_goals_percentage: 56,
        away_goals_percentage: 44,
        over_25_percentage: 61,
        under_25_percentage: 39,
      },
      discipline: {
        yellow_cards: 920,
        red_cards: 41,
        average_yellow_cards: 3.8,
        average_red_cards: 0.17,
      },
    },
  ],
});

export const mockTopScorers = (leagueId: number): TopScorersResponse => {
  const league = mockLeaguesData.find((l) => l.id === leagueId);

  if (!league) {
    throw new Error(`League not found for id ${leagueId}`);
  }

  return {
    league: {
      id: league.id,
      name: league.name,
    },
    season: buildSeason(league.id),
    schema: {
      tables: {
        goals: {
          typeId: 1,
          code: "goals",
          label: "Goals",
          entity: "player",
          metric: "count",
          unit: "Goals",
          sortable: true,
          defaultSort: "position",
        },
        yellowCards: {
          typeId: 2,
          code: "yellowCards",
          label: "Yellow Cards",
          entity: "player",
          metric: "count",
          unit: "Yellow Cards",
          sortable: true,
          defaultSort: "position",
        },
        redCards: {
          typeId: 3,
          code: "redCards",
          label: "Red Cards",
          entity: "player",
          metric: "count",
          unit: "Red Cards",
          sortable: true,
          defaultSort: "position",
        },
      },
      order: ["goals", "yellowCards", "redCards"],
    },
    tables: {
      goals: {
        typeId: 1,
        code: "goals",
        label: "Goals",
        rows: Array.from({ length: 15 }).map((_, i) => ({
          position: i + 1,
          total: 22 - i,
          player: {
            id: league.id * 1000 + i,
            name: `Top Scorer ${i + 1}`,
            image: "https://cdn.sportmonks.com/images/soccer/players/1/1.png",
          },
          team: {
            id: league.id * 100 + i,
            name: `${league.name} Team ${i + 1}`,
            logo: "https://cdn.sportmonks.com/images/soccer/teams/4/4.png",
          },
        })),
      },
      yellowCards: {
        typeId: 2,
        code: "yellowCards",
        label: "Yellow Cards",
        rows: Array.from({ length: 15 }).map((_, i) => ({
          position: i + 1,
          total: 10 - Math.floor(i / 2),
          player: {
            id: league.id * 2000 + i,
            name: `Discipline Player ${i + 1}`,
            image: "https://cdn.sportmonks.com/images/soccer/players/2/2.png",
          },
          team: {
            id: league.id * 200 + i,
            name: `${league.name} Team ${i + 1}`,
            logo: "https://cdn.sportmonks.com/images/soccer/teams/5/5.png",
          },
        })),
      },
      redCards: {
        typeId: 3,
        code: "redCards",
        label: "Red Cards",
        rows: Array.from({ length: 15 }).map((_, i) => ({
          position: i + 1,
          total: i < 3 ? 2 : 1,
          player: {
            id: league.id * 3000 + i,
            name: `Aggressive Player ${i + 1}`,
            image: "https://cdn.sportmonks.com/images/soccer/players/3/3.png",
          },
          team: {
            id: league.id * 300 + i,
            name: `${league.name} Team ${i + 1}`,
            logo: "https://cdn.sportmonks.com/images/soccer/teams/6/6.png",
          },
        })),
      },
    },
  };
};

export const mockCachedLeagueContext = (
  league: LeagueCard
): CachedLeagueContext => ({
  league,
  season: buildSeason(league.id),
});

export const mockLeaguesListResponse = (
  page = 1,
  limit = 10
): LeaguesListResponse => ({
  data: mockLeaguesData.slice((page - 1) * limit, page * limit),
  pagination: buildPagination(page, limit, mockLeaguesData.length),
});

export const mockLeagueProfile = (
  leagueId: number
): LeagueProfileResponse | null => {
  const league = mockLeaguesData.find((l) => l.id === leagueId);
  if (!league) return null;

  return {
    ...league,
    current_season: buildSeason(league.id),
  };
};

export const mockLeagueStandings = (leagueId: number) => {
  const league = mockLeaguesData.find((l) => l.id === leagueId);
  return league ? buildStandings(league) : null;
};

export const mockLeagueStatistics = (leagueId: number) => {
  const league = mockLeaguesData.find((l) => l.id === leagueId);
  return league ? buildStatistics(league) : null;
};

export const mockLeagueMatches = (
  leagueId: number
): LeagueMatchesResponse | null => {
  const league = mockLeaguesData.find((l) => l.id === leagueId);
  if (!league) return null;

  return {
    league: { id: league.id, name: league.name },
    season: buildSeason(league.id),
    matches: buildMatches(league),
  };
};

export const mockLeaguesRepository = (): LeaguesRepository => ({
  getLeagues: () => Promise.resolve(mockLeaguesListResponse()),
  getLeagueProfile: (leagueId: number) =>
    Promise.resolve(mockLeagueProfile(leagueId)),
  getLeagueStandings: (leagueId: number) =>
    Promise.resolve(mockLeagueStandings(leagueId)),
  getLeagueStatistics: (leagueId: number) =>
    Promise.resolve(mockLeagueStatistics(leagueId)),
  getLeagueMatches: (leagueId: number) =>
    Promise.resolve(mockLeagueMatches(leagueId)),
  getTopScorers: (leagueId: number) =>
    Promise.resolve(mockTopScorers(leagueId)),
});
