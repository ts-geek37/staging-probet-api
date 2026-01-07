import { TeamsRepository } from "./teams.repository";

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
}
