import {
  MatchesListResponse,
  MatchEventsResponse,
  MatchLineupsResponse,
  MatchListFilters,
  MatchStatsResponse,
} from "./matches.types";
import { MatchesRepository } from "./matches.repository";

export class MatchesService {
  constructor(private readonly repo: MatchesRepository) {}

  getMatches = (filters: MatchListFilters): Promise<MatchesListResponse> => {
    return this.repo.getMatches(filters);
  };

  getMatch = (matchId: number) => {
    return this.repo.getMatchById(matchId);
  };
  getMatchStats = (matchId: number): Promise<MatchStatsResponse | null> => {
    return this.repo.getMatchStats(matchId);
  };

  getMatchLineups = (matchId: number): Promise<MatchLineupsResponse | null> => {
    return this.repo.getMatchLineups(matchId);
  };

  getMatchEvents = (matchId: number): Promise<MatchEventsResponse | null> => {
    return this.repo.getMatchEvents(matchId);
  };
}
