import {
  normalizeFixtureStatus,
  SportMonksFixture,
  SportMonksSocial,
  SportMonksSquadMember,
  SportMonksTeam,
  SportMonksTeamSeasonStatistic,
  SportMonksTeamTransfer,
  TEAM_STAT_EXTRACTORS,
} from "../../integrations/sportmonks";
import {
  SocialDTO,
  TeamMatchesResponse,
  TeamOverviewResponse,
  TeamPlayersResponse,
  TeamSeasonStatsResponse,
  TeamTransferRow,
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

export const mapSportMonksSocialToDTO = (
  social: SportMonksSocial
): SocialDTO | null => {
  if (!social.channel) return null;

  return {
    id: social.id,
    channel: {
      id: social.channel.id,
      name: social.channel.name,
      color: social.channel.hex_color,
    },
    handle: social.value,
    url: `${social.channel.base_url}${social.value}`,
  };
};

export const mapTeamOverview = (t: SportMonksTeam): TeamOverviewResponse => {
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
      image: t.venue?.image_path ?? null,
    },
    rivals: t.rivals.map((r) => ({
      id: r.id,
      name: r.name,
      logo: r.image_path ?? null,
      type: r.type ?? null,
    })),
    rankings: t.rankings.map((r) => ({
      id: r.id,
      name: r.type,
      rank: r.position,
      points: r.points,
    })),
    socials: t.socials
      .map(mapSportMonksSocialToDTO)
      .filter(Boolean) as SocialDTO[],
    current_seasons: t.activeseasons.map((s) => ({
      id: s.id,
      name: s.name,
      is_current: s.is_current,
      starting_at: s.starting_at,
      ending_at: s.ending_at,
      league: {
        id: s.league.id,
        name: s.league.name,
        logo: s.league.image_path ?? null,
      },
    })),
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
    latest: mapped.filter((m) => m.status === "FINISHED"),
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
        starting_at: seasonStat.season?.starting_at ?? null,
        ending_at: seasonStat.season?.ending_at ?? null,
        league: {
          id: seasonStat.season?.league?.id ?? 0,
          name: seasonStat.season?.league?.name ?? "Unknown",
          logo: seasonStat.season?.league?.image_path ?? null,
        },
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

export const mapTeamTransferRows = (
  rows: SportMonksTeamTransfer[]
): TeamTransferRow[] => {
  return rows.map((t) => ({
    id: t.id,
    date: t.date,
    amount: t.amount,
    completed: t.completed,

    type: t.type
      ? {
          id: t.type.id,
          code: t.type.code,
          label: t.type.name,
        }
      : undefined,

    player: {
      id: t.player.id,
      name: t.player.name,
      image: t.player.image_path ?? null,
    },

    from_team: t.fromteam
      ? {
          id: t.fromteam.id,
          name: t.fromteam.name,
          logo: t.fromteam.image_path ?? null,
        }
      : null,

    to_team: t.toteam
      ? {
          id: t.toteam.id,
          name: t.toteam.name,
          logo: t.toteam.image_path ?? null,
        }
      : null,
  }));
};
