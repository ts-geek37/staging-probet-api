import {
  LeagueListResponse,
  LeagueResponse,
  LeagueView,
} from "../leagues.types";
export interface LeaguesRepository {
  getLeagueById(leagueId: number, view: LeagueView): Promise<LeagueResponse>;

  getLeaguesList(
    page: number,
    limit: number,
    search?: string
  ): Promise<LeagueListResponse>;
}
