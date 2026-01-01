import {
  TeamDetailResponse,
  TeamDetailView,
  TeamListResponse,
} from "../teams.types";

export interface TeamsRepository {
  getTeams(
    page: number,
    limit: number,
    search?: string,
    region?: string
  ): Promise<TeamListResponse>;

  getTeamById(
    teamId: number,
    view: TeamDetailView
  ): Promise<TeamDetailResponse | null>;
}
