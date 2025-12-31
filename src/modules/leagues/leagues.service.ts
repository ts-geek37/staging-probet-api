import {
  LeagueListResponse,
  LeagueResponse,
  LeagueView,
} from "./leagues.types";
import { LeaguesRepository } from "./repositories/leagues.repository";

export class LeaguesService {
  constructor(private readonly repo: LeaguesRepository) {}

  async getLeague(leagueId: number, view: LeagueView): Promise<LeagueResponse> {
    return this.repo.getLeagueById(leagueId, view);
  }

  async getLeaguesList(
    page: number,
    limit: number,
    search?: string
  ): Promise<LeagueListResponse> {
    return this.repo.getLeaguesList(page, limit, search);
  }
}
