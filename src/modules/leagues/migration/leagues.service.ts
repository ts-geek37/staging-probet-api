import { LeaguesRepository } from "./repositories/leagues.repository";

export class LeaguesService {
  constructor(private readonly repo: LeaguesRepository) {}
  getLeagues = (page: number, limit: number, search?: string) => {
    return this.repo.getLeagues(page, limit, search);
  };

  getLeagueProfile = (leagueId: number) => {
    return this.repo.getLeagueProfile(leagueId);
  };

  getLeagueStandings = (leagueId: number) => {
    return this.repo.getLeagueStandings(leagueId);
  };

  getLeagueStatistics = (leagueId: number) => {
    return this.repo.getLeagueStatistics(leagueId);
  };

  getLeagueMatches = (leagueId: number, status?: string) => {
    return this.repo.getLeagueMatches(leagueId, status);
  };
}
