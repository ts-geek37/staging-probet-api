import {
  normalizeFixtureStatus,
  SportMonksClient,
  SportMonksFixture,
  SportMonksPlayer,
  SportMonksPlayerSeasonStatistic,
  SportMonksResponse,
  SportMonksTeamTransfer,
} from "@/integrations/sportmonks";
import { mapTeamTransferRows } from "@/modules/teams/mappers";
import { TeamTransferResponse } from "@/modules/teams/teams.types";
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
      {
        include:
          "country;city;position;detailedPosition;teams.team;trophies.team;trophies.trophy;nationality",
      }
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
    playerId: number,
    page: number,
    limit: number
  ): Promise<PlayerMatchesResponse> => {
    const now = new Date();

    const from = new Date(now);
    from.setDate(now.getDate() - 15);

    const to = new Date(now);
    to.setDate(now.getDate() + 15);

    const res = await client.get<SportMonksResponse<SportMonksFixture[]>>(
      `/football/fixtures/between/${formatDate(from)}/${formatDate(to)}`,
      {
        include: "participants;league;scores;state",
        participantsearch: playerId,
        order: "asc",
        page,
        per_page: limit,
      }
    );

    const matches = (res.data ?? [])
      .map((f: SportMonksFixture) =>
        mapPlayerMatch(f, normalizeFixtureStatus(f.state_id))
      )
      .filter((m): m is any => !!m);

    return {
      matches,
      pagination: {
        page: res.pagination?.current_page ?? page,
        limit: res.pagination?.per_page ?? limit,
        count: res.pagination?.count ?? matches.length,
        total_pages: Math.ceil(
          (res.pagination?.count ?? matches.length) /
            (res.pagination?.per_page ?? limit)
        ),
      },
    };
  };

  const getPlayerTransfers = async (
    playerId: number,
    page: number = 1,
    perPage: number = 10
  ): Promise<TeamTransferResponse> => {
    const client = new SportMonksClient();

    const res = await client.get<SportMonksResponse<SportMonksTeamTransfer[]>>(
      `/football/transfers/players/${playerId}`,
      {
        include: "type;fromTeam;toTeam;player",
        page,
        per_page: perPage,
      }
    );
    return {
      transfers: mapTeamTransferRows(res.data ?? []),
      pagination: {
        page: res.pagination?.current_page ?? page,
        limit: res.pagination?.per_page,
        count: res.pagination?.count,
        total_pages: Math.ceil(
          res.pagination?.count / res.pagination?.per_page
        ),
      },
    };
  };
  return {
    getPlayerProfile,
    getPlayerStats,
    getPlayerMatches,
    getPlayerTransfers,
  };
};
