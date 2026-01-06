import {
  SportMonksFixture,
  SportMonksSquadMember,
  SportMonksTeam,
} from "../../../../integrations/sportmonks/entities";
import { SportMonksClient } from "../../../../integrations/sportmonks/sportmonks.client";
import { SportMonksResponse } from "../../../../integrations/sportmonks/sportmonks.types";
import { SportMonksSeasonStatistic } from "../../../players/migration/players.sportsmonk.types";
import {
  MatchListItem,
  SportMonksTeamSeasonStatistic,
  TeamMatchesResponse,
  TeamOverviewResponse,
  TeamPlayersResponse,
  TeamSeasonStatsResponse,
} from "../teams.types";
import { TeamsRepository } from "./teams.repository";

const normalizeMatchStatus = (stateId: number): "UPCOMING" | "LIVE" | "FT" => {
  if (stateId === 1 || stateId === 2) return "UPCOMING";
  if (stateId === 3 || stateId === 4) return "LIVE";
  return "FT";
};

const formatDate = (d: Date) => d.toISOString().slice(0, 10);
type StatExtractor = (value: any) => number | null;

const TEAM_STAT_EXTRACTORS: Record<
  number,
  { key: keyof TeamSeasonStatsResponse["stats"]; extract: StatExtractor }
> = {
  // Goals
  52: { key: "goals_for", extract: v => v?.all?.scored ?? null },
  53: { key: "goals_against", extract: v => v?.all?.conceded ?? null },

  // Shots
  34: { key: "shots", extract: v => v?.count ?? null },

  // Cards
  64: { key: "yellow_cards", extract: v => v?.count ?? null },
  78: { key: "red_cards", extract: v => v?.count ?? null },

  // Minutes
  27249: { key: "minutes_played", extract: v => v?.total_minutes_played ?? null },
};


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

  const resolveLatestSeasonStat = (
  stats: SportMonksSeasonStatistic[]
): SportMonksSeasonStatistic | null => {
  if (!stats || stats.length === 0) return null;

  return stats
    .filter(s => s.has_values && s.details?.length > 0)
    .sort((a, b) => b.season_id - a.season_id)[0] ?? null;
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

  const seasons = res.data?.filter(s => s.has_values) ?? [];
  if (seasons.length === 0) return null;

  // Latest season with values
  const current = seasons[0];

  const stats: TeamSeasonStatsResponse["stats"] = {};

  for (const detail of current.details ?? []) {
    const mapping = TEAM_STAT_EXTRACTORS[detail.type_id];
    if (!mapping) continue;

    const value = mapping.extract(detail.value);
    if (value !== null) {
      stats[mapping.key] = value;
    }
  }

  return {
    season: {
      id: current.season_id,
      name: current.season?.name ?? "Unknown",
    },
    team: {
      id: current.team_id,
      name: current.team?.name ?? "Unknown",
      logo: current.team?.image_path ?? null,
    },
    stats,
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
