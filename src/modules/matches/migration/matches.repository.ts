import {
  MatchesListResponse,
  MatchEventsResponse,
  MatchLineupsResponse,
  MatchListFilters,
  MatchListItem,
  MatchStatsResponse,
} from "./matches.types";

export interface MatchesRepository {
  getMatches: ({
    tab,
    page,
    limit,
    q,
  }: MatchListFilters) => Promise<MatchesListResponse>;

  getMatchById: (matchId: number) => Promise<MatchListItem | null>;

  getMatchStats: (matchId: number) => Promise<MatchStatsResponse | null>;

  getMatchLineups: (matchId: number) => Promise<MatchLineupsResponse | null>;

  getMatchEvents: (matchId: number) => Promise<MatchEventsResponse | null>;
}
