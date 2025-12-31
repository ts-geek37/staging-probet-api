import {
    MatchDetailResponse,
    MatchDetailView,
    MatchListStatus,
    MatchesListResponse,
} from "./matches.types";
import { MatchesRepository } from "./repositories/matches.repository";

export class MatchesService {
  constructor(private readonly repo: MatchesRepository) {}

  getMatches(
    status: MatchListStatus,
    page: number,
    limit: number,
    leagueId?: number,
    search?: string
  ): Promise<MatchesListResponse> {
    return this.repo.getMatches(status, page, limit, leagueId, search);
  }

  getMatch(
    matchId: number,
    view: MatchDetailView
  ): Promise<MatchDetailResponse | null> {
    return this.repo.getMatchById(matchId, view);
  }
}
