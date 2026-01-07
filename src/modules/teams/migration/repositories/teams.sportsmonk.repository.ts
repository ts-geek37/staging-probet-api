import {
  SportMonksFixture,
  SportMonksSquadMember,
  SportMonksTeam,
} from "../../../../integrations/sportmonks/entities";
import { SportMonksClient } from "../../../../integrations/sportmonks/sportmonks.client";
import { SportMonksResponse } from "../../../../integrations/sportmonks/sportmonks.types";
import {
  MatchListItem,
  SportMonksTeamSeasonStatistic,
  TeamMatchesResponse,
  TeamOverviewResponse,
  TeamPlayersResponse,
  TeamSeasonStatsResponse,
} from "../teams.types";
import { TEAM_STAT_EXTRACTORS } from "./extractor";
import { TeamsRepository } from "./teams.repository";

const normalizeMatchStatus = (stateId: number): "UPCOMING" | "LIVE" | "FT" => {
  if (stateId === 1 || stateId === 2) return "UPCOMING";
  if (stateId === 3 || stateId === 4) return "LIVE";
  return "FT";
};

const formatDate = (d: Date) => d.toISOString().slice(0, 10);

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
      {
        include: "player;player.country;position;detailedPosition",
      }
    );

    const squad = res.data;
    if (!squad || squad.length === 0) return null;

    return {
      team_id: teamId,
      players: squad.map((m) => ({
        id: m.player.id,
        name: m.player.name,
        photo: m.player.image_path ?? null,

        position: {
          id: m.position_id ?? null,
          label: m.position?.name ?? m.detailedposition?.name ?? null,
        },

        jersey_number: m.jersey_number ?? null,
        nationality: m.player.country?.name ?? null,

        contract: {
          start: m.start ?? null,
          end: m.end ?? null,
        },
      })),
    };
  };

  const getTeamOverview = async (
    teamId: number
  ): Promise<TeamOverviewResponse | null> => {
    const res = await client.get<SportMonksResponse<SportMonksTeam>>(
      `/football/teams/${teamId}`,
      {
        include: "country;venue;activeSeasons",
      }
    );

    const t = res.data;
    if (!t) return null;

    const currentSeason = t.activeseasons?.find((s) => s.is_current) ?? null;

    return {
      id: t.id,
      name: t.name,
      short_code: t.short_code ?? null,
      logo: t.image_path ?? null,
      founded: t.founded ?? null,

      country: {
        name: t.country?.name ?? "",
        code: t.country?.iso2 ?? null,
        flag: t.country?.image_path ?? null,
      },

      stadium: {
        name: t.venue?.name ?? null,
        capacity: t.venue?.capacity ?? null,
      },

      current_season: currentSeason
        ? {
            id: currentSeason.id,
            name: currentSeason.name,
          }
        : null,
    };
  };

  const getTeamMatches = async (
    teamId: number
  ): Promise<TeamMatchesResponse> => {
    const now = new Date();

    const from = new Date(now);
    from.setDate(now.getDate() - 7);

    const to = new Date(now);
    to.setDate(now.getDate() + 7);

    const res = await client.get<SportMonksResponse<SportMonksFixture[]>>(
      `/football/fixtures/between/${formatDate(from)}/${formatDate(
        to
      )}/${teamId}`,
      {
        include: "participants;league;scores;state",
      }
    );

    const fixtures = res.data ?? [];

    const mapped: MatchListItem[] = fixtures.flatMap((f) => {
      if (!f.participants || !f.league) return [];

      const home = f.participants.find((p) => p.meta?.location === "home");
      const away = f.participants.find((p) => p.meta?.location === "away");
      if (!home || !away) return [];

      const status = normalizeMatchStatus(f.state_id);

      const homeScore =
        f.scores?.find(
          (s) => s.participant_id === home.id && s.description === "CURRENT"
        )?.score.goals ?? null;

      const awayScore =
        f.scores?.find(
          (s) => s.participant_id === away.id && s.description === "CURRENT"
        )?.score.goals ?? null;

      return [
        {
          id: f.id,
          kickoff_time: f.starting_at,
          status,

          league: {
            id: f.league.id,
            name: f.league.name,
            logo: f.league.image_path ?? null,
          },

          teams: {
            home: {
              id: home.id,
              name: home.name,
              logo: home.image_path ?? null,
            },
            away: {
              id: away.id,
              name: away.name,
              logo: away.image_path ?? null,
            },
          },

          score:
            status !== "UPCOMING"
              ? {
                  home: homeScore,
                  away: awayScore,
                }
              : undefined,
        },
      ];
    });

    return {
      latest: mapped.filter((m) => m.status === "FT"),
      upcoming: mapped.filter((m) => m.status === "UPCOMING"),
    };
  };

  const getTeamStats = async (
    teamId: number
  ): Promise<TeamSeasonStatsResponse | null> => {
    const client = new SportMonksClient();

    const res = await client.get<
      SportMonksResponse<SportMonksTeamSeasonStatistic[]>
    >(`/football/statistics/seasons/teams/${teamId}`, {
      include: "season;team",
      order: "desc",
      per_page: 5,
    });

    const seasonsRaw = (res.data ?? []).filter((s) => s.has_values);
    if (seasonsRaw.length === 0) return null;

    const team = seasonsRaw[0].team;
    if (!team) return null;

    const seasons = seasonsRaw.map((seasonStat) => {
      const stats: Record<string, number | null> = {};

      for (const detail of seasonStat.details ?? []) {
        const extractor = TEAM_STAT_EXTRACTORS[detail.type_id];
        if (!extractor) continue;

        const value = extractor.extract(detail.value);
        if (value !== null) {
          stats[extractor.key as string] = value;
        }
      }

      return {
        season: {
          id: seasonStat.season_id,
          name: seasonStat.season?.name ?? "Unknown",
        },
        stats,
      };
    });

    return {
      team: {
        id: team.id,
        name: team.name,
        logo: team.image_path ?? null,
      },
      seasons,
    };
  };

  return {
    getTeams,
    getTeamPlayers,
    getTeamOverview,
    getTeamMatches,
    getTeamStats,
  };
};
