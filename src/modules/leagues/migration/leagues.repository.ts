import {
  LeagueMatchesResponse,
  LeagueProfileResponse,
  LeaguesListResponse,
  LeagueStandingsResponse,
  LeagueStatisticsResponse,
} from "./leagues.types";

export interface LeaguesRepository {
  getLeagues: (
    page: number,
    limit: number,
    search?: string
  ) => Promise<LeaguesListResponse>;

  getLeagueProfile: (leagueId: number) => Promise<LeagueProfileResponse | null>;

  getLeagueStandings: (
    leagueId: number
  ) => Promise<LeagueStandingsResponse | null>;

  getLeagueStatistics: (
    leagueId: number
  ) => Promise<LeagueStatisticsResponse | null>;

  getLeagueMatches: (
    leagueId: number,
    status: string | undefined
  ) => Promise<LeagueMatchesResponse>;
}
