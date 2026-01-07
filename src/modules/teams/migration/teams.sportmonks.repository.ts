import {
  formatDate,
  SportMonksClient,
  SportMonksFixture,
  SportMonksResponse,
  SportMonksSquadMember,
  SportMonksTeam,
} from "@/integrations/sportmonks";
import {
  mapTeamMatches,
  mapTeamOverview,
  mapTeamPlayers,
  mapTeamSeasonStats,
} from "./mappers";
import { TeamsRepository } from "./teams.repository";
import {
  SportMonksTeamSeasonStatistic,
  TeamMatchesResponse,
  TeamOverviewResponse,
  TeamPlayersResponse,
  TeamSeasonStatsResponse,
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
      { include: "country;venue;activeSeasons" }
    );

    if (!res.data) return null;

    return mapTeamOverview(res.data);
  };

  const getTeamMatches = async (
    teamId: number
  ): Promise<TeamMatchesResponse> => {
    const now = new Date();

    const from = new Date(now);
    from.setDate(now.getDate() - 15);

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
      include: "season;team",
      order: "desc",
      per_page: 5,
    });

    return mapTeamSeasonStats(res.data ?? []);
  };

  return {
    getTeams,
    getTeamPlayers,
    getTeamOverview,
    getTeamMatches,
    getTeamStats,
  };
};
