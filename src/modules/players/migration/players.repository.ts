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
}
