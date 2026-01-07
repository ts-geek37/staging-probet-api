import {
  normalizeFixtureStatus,
  normalizeForm,
  SportMonksStanding,
} from "@/integrations/sportmonks";

export const mapStandingsTable = (data: SportMonksStanding[]) =>
  data
    .filter((s) => s.group_id === null)
    .sort((a, b) => a.position - b.position)
    .map((s) => ({
      position: s.position,
      team: {
        id: s.participant.id,
        name: s.participant.name,
        logo: s.participant.image_path,
      },
      points: s.points,
      form: normalizeForm(s.form),
    }));

export const mapSeasonStatistics = (
  season: { id: number; name: string },
  stats: { type_id: number; value: any }[]
) => {
  const byType = new Map(stats.map((s) => [s.type_id, s.value]));

  const goals = byType.get(191);
  const cards = byType.get(193);
  const overUnder = byType.get(197);

  return {
    season: {
      id: season.id,
      name: season.name,
    },
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

export const mapSeasonMatches = (
  fixtures: any[],
  status?: "LIVE" | "UPCOMING" | "FT"
) =>
  fixtures
    .map((f) => {
      const home = f.participants.find((p) => p.meta?.location === "home");
      const away = f.participants.find((p) => p.meta?.location === "away");
      if (!home || !away) return null;

      const matchStatus = normalizeFixtureStatus(f.state_id);

      return {
        id: f.id,
        kickoff_time: f.starting_at,
        status: matchStatus,
        home_team: {
          id: home.id,
          name: home.name,
          logo: home.image_path,
          score: {
            goals:
              f.scores?.find(
                (s) =>
                  s.participant_id === home.id && s.description === "CURRENT"
              )?.score.goals ?? null,
          },
        },
        away_team: {
          id: away.id,
          name: away.name,
          logo: away.image_path,
          score: {
            goals:
              f.scores?.find(
                (s) =>
                  s.participant_id === away.id && s.description === "CURRENT"
              )?.score.goals ?? null,
          },
        },
      };
    })
    .filter(Boolean)
    .filter((m) => {
      if (!status) return true;
      return m.status === status;
    });
