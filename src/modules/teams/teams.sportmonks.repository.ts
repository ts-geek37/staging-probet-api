import {
  formatDate,
  SportMonksClient,
  SportMonksFixture,
  SportMonksResponse,
  SportMonksSquadMember,
  SportMonksTeam,
  SportMonksTeamSeasonStatistic,
  SportMonksTeamTransfer,
} from "../../integrations/sportmonks";
import {
  mapTeamMatches,
  mapTeamOverview,
  mapTeamPlayers,
  mapTeamSeasonStats,
  mapTeamTransferRows,
} from "./mappers";
import { TeamsRepository } from "./teams.repository";
import {
  TeamMatchesResponse,
  TeamOverviewResponse,
  TeamPlayersResponse,
  TeamSeasonStatsResponse,
  TeamTransferResponse,
} from "./teams.types";

export const TeamsSportMonksRepository = (baseRepo: {
  getTeams: TeamsRepository["getTeams"];
}): TeamsRepository => {
  const client = new SportMonksClient();

  const getTeams = baseRepo.getTeams;

  const getTeamPlayers = async (
    teamId: number
  ): Promise<TeamPlayersResponse | null> => {
    const res = await client.get<SportMonksResponse<SportMonksSquadMember[]>>(
      `/football/squads/teams/${teamId}`,
      { include: "player;player.country;position;detailedPosition" }
    );

    if (!res.data || res.data.length === 0) return null;

    return mapTeamPlayers(teamId, res.data);
  };

  const getTeamOverview = async (
    teamId: number
  ): Promise<TeamOverviewResponse | null> => {
    const res = await client.get<SportMonksResponse<SportMonksTeam>>(
      `/football/teams/${teamId}`,
      {
        include:
          "country;venue;activeSeasons;rivals;socials;rankings;activeSeasons.league",
      }
    );

    if (!res.data) return null;

    return mapTeamOverview(res.data);
  };

  const getTeamMatches = async (
    teamId: number
  ): Promise<TeamMatchesResponse> => {
    const now = new Date();

    const from = new Date(now);
    from.setDate(now.getDate() - 30);

    const to = new Date(now);
    to.setDate(now.getDate() + 30);

    const res = await client.get<SportMonksResponse<SportMonksFixture[]>>(
      `/football/fixtures/between/${formatDate(from)}/${formatDate(
        to
      )}/${teamId}`,
      { include: "participants;league;scores;state" }
    );

    return mapTeamMatches(res.data ?? []);
  };

  const getTeamStats = async (
    teamId: number
  ): Promise<TeamSeasonStatsResponse | null> => {
    const res = await client.get<
      SportMonksResponse<SportMonksTeamSeasonStatistic[]>
    >(`/football/statistics/seasons/teams/${teamId}`, {
      include: "season;team;season.league",
      order: "desc",
      per_page: 10,
    });

    return mapTeamSeasonStats(res.data ?? []);
  };

  const getTeamTransfers = async (
    teamId: number,
    page: number = 1,
    perPage: number = 10
  ): Promise<TeamTransferResponse> => {
    const client = new SportMonksClient();

    const res = await client.get<SportMonksResponse<SportMonksTeamTransfer[]>>(
      `/football/transfers/teams/${teamId}`,
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
    getTeams,
    getTeamPlayers,
    getTeamOverview,
    getTeamMatches,
    getTeamStats,
    getTeamTransfers,
  };
};
