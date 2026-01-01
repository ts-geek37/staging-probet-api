import {
  PlayerDetailResponse,
  PlayerDetailView,
  PlayerListResponse,
} from "../players.types";

export interface PlayersRepository {
  getPlayers(
    page: number,
    limit: number,
    search?: string,
    teamId?: number
  ): Promise<PlayerListResponse>;

  getPlayerById(
    playerId: number,
    view: PlayerDetailView
  ): Promise<PlayerDetailResponse | null>;
}
