import {
  TeamMatchesResponse,
  TeamOverviewResponse,
  TeamPlayersResponse,
  TeamSeasonStatsResponse,
  TeamsListResponse,
  TeamTransferResponse,
} from "./teams.types";

export interface TeamsRepository {
  getTeams: (
    page: number,
    limit: number,
    search?: string
  ) => Promise<TeamsListResponse>;

  getTeamPlayers: (teamId: number) => Promise<TeamPlayersResponse | null>;

  getTeamOverview: (teamId: number) => Promise<TeamOverviewResponse | null>;

  getTeamMatches: (teamId: number) => Promise<TeamMatchesResponse | null>;

  getTeamStats: (teamId: number) => Promise<TeamSeasonStatsResponse | null>;

  getTeamTransfers: (teamId: number, page?: number, perPage?: number) => Promise<TeamTransferResponse | null>;
}
