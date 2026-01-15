import { TeamTransferResponse } from "../../modules/teams/teams.types";
import {
  PlayerMatchesResponse,
  PlayerProfileResponse,
  PlayerSeasonStatsResponse,
} from "./players.types";

export interface PlayersRepository {
  getPlayerProfile: (playerId: number) => Promise<PlayerProfileResponse | null>;

  getPlayerStats: (
    playerId: number
  ) => Promise<PlayerSeasonStatsResponse[] | null>;

  getPlayerMatches: (
    playerId: number,
    page: number,
    limit: number
  ) => Promise<PlayerMatchesResponse | null>;

  getPlayerTransfers: (
    playerId: number,
    page?: number,
    perPage?: number
  ) => Promise<TeamTransferResponse | null>;
}
