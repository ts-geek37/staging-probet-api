import {
  LINEUP_TYPE_MAP,
  MATCH_TEAM_STAT_EXTRACTORS,
  MatchStatus,
  normalizeEventType,
  SportMonksFixture,
  SportMonksFixtureStatistic,
  SportMonksLineup,
  SportMonksParticipant,
  TEAM_STAT_EXTRACTORS,
} from "../../integrations/sportmonks";
import { TeamStatistics } from "../../modules/teams/teams.types";
import {
  MatchEventsResponse,
  MatchLineupsResponse,
  MatchListItem,
  MatchStatsResponse,
} from "./matches.types";

export const mapFixtureToListItem = (
  f: SportMonksFixture,
  status: MatchStatus,
  withVenue = false
): MatchListItem[] => {
  const home = f.participants?.find((p) => p.meta?.location === "home");
  const away = f.participants?.find((p) => p.meta?.location === "away");

  if (!home || !away || !f.league || !f.season) return [];

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
      season: {
        id: f.season.id,
        name: f.season.name,
      },
      league: {
        id: f.league.id,
        name: f.league.name,
        logo: f.league.image_path ?? null,
      },
      venue: withVenue
        ? {
            id: f.venue.id,
            name: f.venue.name,
            image: f.venue.image_path,
            capacity: f.venue.capacity,
            city: f.venue.city_name,
            country: f.venue.country?.name,
          }
        : undefined,
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
};

export const mapMatchEvents = (
  matchId: number,
  f: SportMonksFixture
): MatchEventsResponse => {
  if (!f.events || f.events.length === 0) {
    return { match_id: matchId, events: [] };
  }

  const teamMap = new Map(
    f.participants?.map((p) => [
      p.id,
      { id: p.id, name: p.name, logo: p.image_path ?? null },
    ])
  );

  return {
    match_id: matchId,
    events: f.events.map((e) => {
      const team = e.participant_id
        ? teamMap.get(e.participant_id) ?? null
        : null;

      return {
        id: e.id,
        minute: e.minute ?? null,
        extra_minute: e.extra_minute ?? null,
        type: normalizeEventType(e.type_id),
        team,
        player:
          e.player_id && e.player_name
            ? { id: e.player_id, name: e.player_name }
            : undefined,
        related_player:
          e.related_player_id && e.related_player_name
            ? { id: e.related_player_id, name: e.related_player_name }
            : undefined,
        detail: e.info ?? e.addition ?? null,
      };
    }),
  };
};

export const mapMatchStats = (
  matchId: number,
  f: SportMonksFixture
): MatchStatsResponse => {
  if (!Array.isArray(f.statistics) || f.statistics.length === 0) {
    return { match_id: matchId, teams: [] };
  }

  const teamMap = new Map(
    f.participants.map((p) => [
      p.id,
      { id: p.id, name: p.name, logo: p.image_path ?? null },
    ])
  );

  const grouped = new Map<number, SportMonksFixtureStatistic[]>();

  f.statistics.forEach((s) => {
    if (!grouped.has(s.participant_id)) grouped.set(s.participant_id, []);
    grouped.get(s.participant_id)!.push(s);
  });

  const teams = Array.from(grouped.entries()).map(([teamId, stats]) => {
    const statistics: Record<string, number | null> = {};

    stats.forEach((s) => {
      const extractor = MATCH_TEAM_STAT_EXTRACTORS[s.type_id];
      if (!extractor) return;
      statistics[extractor.key] = extractor.extract(s.data?.value ?? null);
    });

    return {
      team: teamMap.get(teamId) ?? { id: teamId, name: "Unknown", logo: null },
      statistics,
    };
  });

  return { match_id: matchId, teams };
};

export const mapMatchLineups = (
  matchId: number,
  f: SportMonksFixture
): MatchLineupsResponse => {
  if (!f.lineups || f.lineups.length === 0) {
    return { match_id: matchId, teams: [] };
  }

  const teamMap = new Map(
    f.participants.map((p) => [
      p.id,
      { id: p.id, name: p.name, logo: p.image_path ?? null },
    ])
  );

  const grouped = new Map<number, SportMonksLineup[]>();

  f.lineups.forEach((l) => {
    if (!grouped.has(l.team_id)) grouped.set(l.team_id, []);
    grouped.get(l.team_id)!.push(l);
  });

  const teams = Array.from(grouped.entries()).map(([teamId, rows]) => {
    const team = teamMap.get(teamId) ?? null;

    const starters = rows.filter(
      (r) => LINEUP_TYPE_MAP[r.type_id] === "starter"
    );
    const subs = rows.filter(
      (r) => LINEUP_TYPE_MAP[r.type_id] === "substitute"
    );

    const formation =
      starters.map((s) => s.formation_field).find(Boolean) ?? null;

    return {
      team,
      formation,
      starting_xi: starters.map((p) => ({
        id: p.player_id,
        name: p.player_name,
        number: p.jersey_number ?? null,
        position_id: p.position_id ?? null,
        formation_field: p.formation_field ?? null,
        formation_position: p.formation_position ?? null,
      })),
      substitutes: subs.map((p) => ({
        id: p.player_id,
        name: p.player_name,
        number: p.jersey_number ?? null,
        position_id: p.position_id ?? null,
        formation_field: null,
        formation_position: null,
      })),
    };
  });

  return { match_id: matchId, teams };
};

type TeamStatsMap = Partial<
  Record<(typeof TEAM_STAT_EXTRACTORS)[number]["key"], number>
>;

export const mapTeamSeasonStats = (
  teams: SportMonksParticipant[],
  season_id: number
): {
  home: {
    id: number | null;
    name: string | null;
    logo: string | null;
    stats: TeamStatistics | null;
  };
  away: {
    id: number | null;
    name: string | null;
    logo: string | null;
    stats: TeamStatistics | null;
  };
} => {
  const extractStats = (
    participant?: SportMonksParticipant
  ): TeamStatistics | null => {
    if (!participant?.statistics?.length) return null;

    const seasonStats = participant.statistics.find(
      (s) => s.season_id === season_id
    );

    if (!seasonStats?.details?.length) return null;

    const stats: Partial<TeamStatistics> = {};

    for (const detail of seasonStats.details) {
      const extractor = TEAM_STAT_EXTRACTORS[detail.type_id];
      if (!extractor) continue;

      const value = extractor.extract(detail.value);

      if (value !== null && value !== undefined) {
        stats[extractor.key as any] = value;
      }
    }

    return Object.keys(stats).length > 0 ? (stats as TeamStatistics) : null;
  };

  const home = teams.find((t) => t.meta?.location === "home");
  const away = teams.find((t) => t.meta?.location === "away");

  return {
    home: {
      id: home?.id ?? null,
      name: home?.name ?? null,
      logo: home?.image_path ?? null,
      stats: extractStats(home),
    },
    away: {
      id: away?.id ?? null,
      name: away?.name ?? null,
      logo: away?.image_path ?? null,
      stats: extractStats(away),
    },
  };
};
