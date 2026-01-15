import {
  normalizeFixtureStatus,
  normalizeForm,
  SportMonksFixture,
  SportMonksStanding,
  SportMonksStandingDetail,
  SportMonksTopScorer,
  STANDING_DETAIL_TYPE_MAP,
  StandingDetailKey,
  StandingScope,
} from "../../integrations/sportmonks";
import {
  CurrentSeason,
  TopScorerTable,
  TopScorerTableSchema,
} from "./leagues.types";

type NormalizedStandingStats = Record<
  StandingScope,
  Partial<Record<StandingDetailKey, number>>
>;

export const normalizeStandingDetails = (
  details: SportMonksStandingDetail[] | undefined
): NormalizedStandingStats => {
  const stats: NormalizedStandingStats = {
    overall: {},
    home: {},
    away: {},
  };

  if (!details) return stats;

  for (const d of details) {
    const mapping = STANDING_DETAIL_TYPE_MAP[d.type_id];
    if (!mapping) continue;

    stats[mapping.scope][mapping.key] = d.value;
  }

  return stats;
};

export const mapStandingsTable = (data: SportMonksStanding[]) => {
  return data
    .filter((s) => s.group_id === null)
    .sort((a, b) => a.position - b.position)
    .map((s) => {
      const stats = normalizeStandingDetails(s.details);

      return {
        position: s.position,
        team: {
          id: s.participant.id,
          name: s.participant.name,
          logo: s.participant.image_path,
        },

        points: stats.overall.points ?? s.points,

        form: normalizeForm(s.form),

        stats: {
          overall: stats.overall,
          home: stats.home,
          away: stats.away,
        },

        meta: {
          standingId: s.id,
          standingRuleId: s.standing_rule_id,
          movement: s.result,
        },
      };
    });
};

export const mapSeasonStatistics = (
  season: CurrentSeason,
  stats: { type_id: number; value: any }[]
) => {
  const byType = new Map(stats.map((s) => [s.type_id, s.value]));

  const goals = byType.get(191);
  const cards = byType.get(193);
  const overUnder = byType.get(197);

  return {
    season,
    overview: {
      matches_played: byType.get(188)?.played ?? null,
      total_goals: goals?.total ?? null,
      average_goals_per_match: goals?.average ?? null,
    },
    scoring: {
      home_goals_percentage: goals?.home?.percentage ?? null,
      away_goals_percentage: goals?.away?.percentage ?? null,
      over_25_percentage: overUnder?.over?.["2_5"]?.percentage ?? null,
      under_25_percentage: overUnder?.under?.["2_5"]?.percentage ?? null,
    },
    discipline: {
      yellow_cards: cards?.yellowcards ?? null,
      red_cards: cards?.redcards ?? null,
      average_yellow_cards: cards?.average_yellowcards ?? null,
      average_red_cards: cards?.average_redcards ?? null,
    },
  };
};

export const mapLeagueFixtureMatch = (f: SportMonksFixture) => {
  const home = f.participants.find((p) => p.meta?.location === "home");
  const away = f.participants.find((p) => p.meta?.location === "away");
  if (!home || !away || !f.league) return null;

  const status = normalizeFixtureStatus(f.state_id);

  return {
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
            home:
              f.scores?.find(
                (s) =>
                  s.participant_id === home.id && s.description === "CURRENT"
              )?.score.goals ?? null,
            away:
              f.scores?.find(
                (s) =>
                  s.participant_id === away.id && s.description === "CURRENT"
              )?.score.goals ?? null,
          }
        : undefined,
  };
};

export const mapTopScorers = (data: SportMonksTopScorer[]) => {
  const tables: Record<string, TopScorerTable> = {};
  const schema: Record<string, TopScorerTableSchema> = {};

  for (const row of data) {
    if (!row.type) continue;

    const key = row.type.code;

    if (!tables[key]) {
      tables[key] = {
        typeId: row.type.id,
        code: row.type.code,
        label: row.type.name,
        rows: [],
      };

      schema[key] = {
        typeId: row.type.id,
        code: row.type.code,
        label: row.type.name,

        entity: "player",
        metric: "count",
        unit: row.type.name, // FE can display "Goals", "Yellow Cards"

        sortable: true,
        defaultSort: "position",
      };
    }

    tables[key].rows.push({
      position: row.position,
      total: row.total,
      player: {
        id: row.player!.id,
        name: row.player!.display_name ?? row.player!.name,
        image: row.player!.image_path ?? null,
      },
      team: {
        id: row.participant!.id,
        name: row.participant!.name,
        logo: row.participant!.image_path ?? null,
      },
    });
  }

  return {
    schema,
    tables,
    order: Object.keys(schema),
  };
};
