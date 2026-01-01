import {
  PlayerDetailResponse,
  PlayerDetailView,
  PlayerListResponse,
} from "./players.types";
import { PlayersRepository } from "./repositories/players.repository";

export class PlayersService {
  constructor(private readonly repo: PlayersRepository) {}

  getPlayers(
    page: number,
    limit: number,
    search?: string,
    teamId?: number
  ): Promise<PlayerListResponse> {
    return this.repo.getPlayers(page, limit, search, teamId);
  }

  getPlayer(
    playerId: number,
    view: PlayerDetailView
  ): Promise<PlayerDetailResponse | null> {
    return this.repo.getPlayerById(playerId, view);
  }
}
