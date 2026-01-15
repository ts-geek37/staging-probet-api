import { MatchesRepository } from "./matches.repository";
import {
  MatchesListResponse,
  MatchEventsResponse,
  MatchLineupsResponse,
  MatchListFilters,
  MatchStatsResponse,
} from "./matches.types";

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

  getMatchComments = (matchId: number) => {
    return this.repo.getMatchComments(matchId);
  };

  getHeadToHeadMatches = (teams: { team1: number; team2: number }) => {
    return this.repo.getHeadToHeadMatches(teams);
  };

  getMatchesTeamStats = (matchId: number, seasonId: number) => {
    return this.repo.getTeamStats(matchId, seasonId);
  };
}
