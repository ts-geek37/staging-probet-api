import { TeamsRepository } from "./teams.repository";
import {PaginationMeta} from "../../types"
export class TeamsService {
  constructor(private readonly repo: TeamsRepository) {}

  getTeams = (page: number, limit: number, search?: string) => {
    return this.repo.getTeams(page, limit, search);
  };

  getTeamProfile = (teamId: number) => {
    return this.repo.getTeamOverview(teamId);
  };

  getTeamPlayers = (teamId: number) => {
    return this.repo.getTeamPlayers(teamId);
  };

  getTeamMatches = (teamId: number) => {
    return this.repo.getTeamMatches(teamId);
  };

  getTeamStats = (teamId: number) => {
    return this.repo.getTeamStats(teamId);
  };

  getTeamTransfers = (teamId: number, page?: number, perPage?: number) => {
    return this.repo.getTeamTransfers(teamId, page, perPage);
  };
}
