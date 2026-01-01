import {
  TeamDetailResponse,
  TeamDetailView,
  TeamListResponse,
} from "./teams.types";
import { TeamsRepository } from "./repositories/teams.repository";

export class TeamsService {
  constructor(private readonly repo: TeamsRepository) {}

  getTeams(
    page: number,
    limit: number,
    search?: string,
    region?: string
  ): Promise<TeamListResponse> {
    return this.repo.getTeams(page, limit, search, region);
  }

  getTeam(
    teamId: number,
    view: TeamDetailView
  ): Promise<TeamDetailResponse | null> {
    return this.repo.getTeamById(teamId, view);
  }
}
