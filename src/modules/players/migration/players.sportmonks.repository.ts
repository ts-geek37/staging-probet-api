import {
  normalizeFixtureStatus,
  SportMonksClient,
  SportMonksFixture,
  SportMonksPlayer,
  SportMonksPlayerSeasonStatistic,
  SportMonksResponse,
} from "@/integrations/sportmonks";
import {
  formatDate,
  mapPlayerMatch,
  mapPlayerProfile,
  mapPlayerSeasonStats,
} from "./mappers";
import { PlayersRepository } from "./players.repository";
import {
  PlayerMatchesResponse,
  PlayerProfileResponse,
  PlayerSeasonStatsResponse,
} from "./players.types";

export const PlayersSportMonksRepository = (): PlayersRepository => {
  const client = new SportMonksClient();

  const getPlayerProfile = async (
    playerId: number
  ): Promise<PlayerProfileResponse | null> => {
    const res = await client.get<SportMonksResponse<SportMonksPlayer>>(
      `/football/players/${playerId}`,
      { include: "nationality;position;teams;teams.team" }
    );

    if (!res.data) return null;

    return mapPlayerProfile(res.data);
  };

  const getPlayerStats = async (
    playerId: number
  ): Promise<PlayerSeasonStatsResponse[]> => {
    const res = await client.get<
      SportMonksResponse<SportMonksPlayerSeasonStatistic[]>
    >(`/football/statistics/seasons/players/${playerId}`, {
      include: "season;team;position",
      order: "desc",
      per_page: 10,
    });

    return mapPlayerSeasonStats(res.data ?? []);
  };

  const getPlayerMatches = async (
    playerId: number
  ): Promise<PlayerMatchesResponse> => {
    const now = new Date();

    const from = new Date(now);
    from.setDate(now.getDate() - 15);

    const to = new Date(now);
    to.setDate(now.getDate() + 30);

    const res = await client.get<SportMonksResponse<SportMonksFixture[]>>(
      `/football/fixtures/between/${formatDate(from)}/${formatDate(to)}`,
      {
        include: "participants;league;scores;state",
        participantsearch: playerId,
        order: "asc", 
      }
    );

    const matches = (res.data ?? [])
      .map((f) => mapPlayerMatch(f, normalizeFixtureStatus(f.state_id)))
      .filter(Boolean);

    return { matches };
  };

  return {
    getPlayerProfile,
    getPlayerStats,
    getPlayerMatches,
  };
};
