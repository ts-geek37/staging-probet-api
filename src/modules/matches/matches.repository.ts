import { SportMonksFixtureComment } from "../../integrations/sportmonks";
import {
  MatchesListResponse,
  MatchesTeamStats,
  MatchEventsResponse,
  MatchLineupsResponse,
  MatchListFilters,
  MatchListItem,
  MatchStatsResponse,
  PredictableMatchesResponse,
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

  getPredictableMatches: (
    page: number,
    limit: number
  ) => Promise<PredictableMatchesResponse>;

  getHeadToHeadMatches: ({
    team1,
    team2,
  }: {
    team1: number;
    team2: number;
  }) => Promise<{ matches: MatchListItem[] }>;

  getMatchComments: (
    matchId: number
  ) => Promise<SportMonksFixtureComment[] | null>;

  getTeamStats: (
    matchId: number,
    seasonId: number
  ) => Promise<MatchesTeamStats | null>;
}
