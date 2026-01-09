import {
  normalizeFixtureStatus,
  SportMonksFixture,
  SportMonksSquadMember,
  SportMonksTeam,
  TEAM_STAT_EXTRACTORS,
} from "@/integrations/sportmonks";
import {
  SportMonksTeamSeasonStatistic,
  TeamMatchesResponse,
  TeamOverviewResponse,
  TeamPlayersResponse,
  TeamSeasonStatsResponse,
} from "./teams.types";

export const mapTeamPlayers = (
  teamId: number,
  squad: SportMonksSquadMember[]
): TeamPlayersResponse => ({
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
});

export const mapTeamOverview = (t: SportMonksTeam): TeamOverviewResponse => {
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
      ? { id: currentSeason.id, name: currentSeason.name }
      : null,
  };
};

export const mapTeamMatches = (
  fixtures: SportMonksFixture[]
): TeamMatchesResponse => {
  const mapped = fixtures.flatMap((f) => {
    if (!f.participants || !f.league) return [];

    const home = f.participants.find((p) => p.meta?.location === "home");
    const away = f.participants.find((p) => p.meta?.location === "away");
    if (!home || !away) return [];

    const status = normalizeFixtureStatus(f.state_id);

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
            ? { home: homeScore, away: awayScore }
            : undefined,
      },
    ];
  });

  return {
    latest: mapped.filter((m) => m.status === "FT"),
    upcoming: mapped.filter((m) => m.status === "UPCOMING"),
  };
};

export const mapTeamSeasonStats = (
  rows: SportMonksTeamSeasonStatistic[]
): TeamSeasonStatsResponse | null => {
  const seasonsRaw = rows.filter((s) => s.has_values);
  if (seasonsRaw.length === 0) return null;

  const team = seasonsRaw[0].team;
  if (!team) return null;

  const seasons = seasonsRaw.map((seasonStat) => {
    const stats: Record<string, number | null> = {};

    for (const detail of seasonStat.details ?? []) {
      const extractor = TEAM_STAT_EXTRACTORS[detail.type_id];
      if (!extractor) continue;

      const value = extractor.extract(detail.value);
      if (value !== null) stats[extractor.key as string] = value;
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
