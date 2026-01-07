import { PlayersRepository } from "./players.repository";

export class PlayersService {
  constructor(private readonly repo: PlayersRepository) {}

  getPlayerProfile = (playerId: number) => {
    return this.repo.getPlayerProfile(playerId);
  };

  getPlayerStats = (playerId: number) => {
    return this.repo.getPlayerStats(playerId);
  };

  getPlayerMatches = (playerId: number, page: number, limit: number) => {
    return this.repo.getPlayerMatches(playerId, page, limit);
  };
}
