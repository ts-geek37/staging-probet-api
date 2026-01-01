import {
  MatchDetailResponse,
  MatchDetailView,
  MatchListStatus,
  MatchesListResponse,
} from "../matches.types";

export interface MatchesRepository {
  getMatches(
    status: MatchListStatus,
    page: number,
    limit: number,
    leagueId?: number,
    search?: string
  ): Promise<MatchesListResponse>;

  getMatchById(
    matchId: number,
    view: MatchDetailView
  ): Promise<MatchDetailResponse | null>;
}
