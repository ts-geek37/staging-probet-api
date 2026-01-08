import { MatchEventType } from "@/modules/matches/migration/matches.types";
import { PlayerSeasonStatsResponse } from "@/modules/players/migration/players.types";
import { SportMonksStandingForm } from "./entities";

export type CompetitionType = "league" | "cup";

export const normalizeCompetitionType = (value: unknown): CompetitionType =>
  value === "league" ? "league" : "cup";

export type FixtureStatus = "UPCOMING" | "LIVE" | "FT";

const STATE_ID_MAP: Record<number, FixtureStatus> = {
  1: "UPCOMING",

  2: "LIVE",
  3: "LIVE",
  4: "LIVE",

  5: "FT",
  6: "FT",
  7: "FT",
};

const STATE_CODE_MAP: Record<string, FixtureStatus> = {
  NS: "UPCOMING",
  LIVE: "LIVE",
  HT: "LIVE",
  ET: "LIVE",
  FT: "FT",
  AET: "FT",
  PEN: "FT",
};

export const normalizeFixtureStatus = (state: unknown): FixtureStatus => {
  if (typeof state === "number") {
    const mapped = STATE_ID_MAP[state];
    if (mapped) return mapped;

    return "LIVE";
  }

  if (typeof state === "string") {
    const mapped = STATE_CODE_MAP[state.toUpperCase()];
    if (mapped) return mapped;

    return "LIVE";
  }
  return "LIVE";
};

export type FormValue = "W" | "D" | "L";

export const normalizeForm = (
  SportMonksStandingForm?: SportMonksStandingForm[]
): FormValue[] => {
  if (!SportMonksStandingForm) return [];
  return SportMonksStandingForm.sort((a, b) => a.sort_order - b.sort_order)
    .map((form) => {
      if (form.form === "W") return "W";
      if (form.form === "D") return "D";
      return "L";
    })
    .slice(0, 5);
};

const EVENT_TYPE_ID_MAP: Record<number, MatchEventType> = {
  14: "GOAL",
  15: "OWN_GOAL",
  16: "PENALTY_GOAL",

  17: "CARD",
  18: "CARD",
  19: "CARD",

  20: "SUBSTITUTION",

  1: "PERIOD_START",
  2: "PERIOD_END",
  3: "PERIOD_START",
  4: "PERIOD_END",

  70: "VAR",
};

export const normalizeEventType = (
  typeId: number | null | undefined
): MatchEventType => {
  if (!typeId) return "OTHER";

  const mapped = EVENT_TYPE_ID_MAP[typeId];
  if (mapped) return mapped;

  return "OTHER";
};

export const FIXTURE_STATE_MAP = {
  LIVE: [2, 3],
  UPCOMING: [1],
  FT: [5, 6],
} as const;

export const DATE_RANGES = {
  LIVE: { from: -1, to: +1 },
  UPCOMING: { from: 0, to: +14 },
  FT: { from: -14, to: 0 },
};

export const LINEUP_TYPE_MAP: Record<number, "starter" | "substitute"> = {
  11: "starter",
  12: "substitute",
};

export const formatDate = (date: Date): string =>
  date.toISOString().split("T")[0];

export const MATCH_TEAM_STAT_EXTRACTORS: Record<
  number,
  { key: string; extract: (v: any) => number | null }
> = {
  34: { key: "corners", extract: (v) => v ?? null },
  41: { key: "shots_off_target", extract: (v) => v ?? null },
  42: { key: "shots_total", extract: (v) => v ?? null },
  43: { key: "attacks", extract: (v) => v ?? null },
  44: { key: "dangerous_attacks", extract: (v) => v ?? null },
  45: { key: "ball_possession", extract: (v) => v ?? null },
  47: { key: "penalties", extract: (v) => v ?? null },
  49: { key: "shots_inside_box", extract: (v) => v ?? null },
  50: { key: "shots_outside_box", extract: (v) => v ?? null },
  51: { key: "offsides", extract: (v) => v ?? null },
  52: { key: "goals", extract: (v) => v ?? null },
  55: { key: "free_kicks", extract: (v) => v ?? null },
  56: { key: "fouls", extract: (v) => v ?? null },
  57: { key: "saves", extract: (v) => v ?? null },
  58: { key: "shots_blocked", extract: (v) => v ?? null },
  59: { key: "substitutions", extract: (v) => v ?? null },
  60: { key: "throwins", extract: (v) => v ?? null },
  64: { key: "hit_woodwork", extract: (v) => v ?? null },
  65: { key: "successful_headers", extract: (v) => v ?? null },
  68: { key: "substitutions_overtime", extract: (v) => v ?? null },
  70: { key: "headers", extract: (v) => v ?? null },
  77: { key: "challenges", extract: (v) => v ?? null },
  78: { key: "tackles", extract: (v) => v ?? null },
  79: { key: "assists", extract: (v) => v ?? null },
  80: { key: "passes", extract: (v) => v ?? null },
  81: { key: "successful_passes", extract: (v) => v ?? null },
  82: { key: "successful_passes_percentage", extract: (v) => v ?? null },
  83: { key: "red_cards", extract: (v) => v ?? null },
  84: { key: "yellow_cards", extract: (v) => v ?? null },
  85: { key: "yellowred_cards", extract: (v) => v ?? null },
  86: { key: "shots_on_target", extract: (v) => v ?? null },
  98: { key: "total_crosses", extract: (v) => v ?? null },
  99: { key: "accurate_crosses", extract: (v) => v ?? null },
  100: { key: "interceptions", extract: (v) => v ?? null },
  106: { key: "duels_won", extract: (v) => v ?? null },
  108: { key: "dribble_attempts", extract: (v) => v ?? null },
  109: { key: "successful_dribbles", extract: (v) => v ?? null },
  117: { key: "key_passes", extract: (v) => v ?? null },
  580: { key: "big_chances_created", extract: (v) => v ?? null },
  581: { key: "big_chances_missed", extract: (v) => v ?? null },
  1489: { key: "treatments", extract: (v) => v ?? null },
  1527: { key: "counter_attacks", extract: (v) => v ?? null },
  1533: { key: "successful_crosses_percentage", extract: (v) => v ?? null },
  1605: { key: "successful_dribbles_percentage", extract: (v) => v ?? null },
  27264: { key: "successful_long_passes", extract: (v) => v ?? null },
  27265: {
    key: "successful_long_passes_percentage",
    extract: (v) => v ?? null,
  },
};

export type StatExtractor = (value: any) => number | null;
export const total: StatExtractor = (v) =>
  typeof v?.total === "number" ? v.total : null;

export const count: StatExtractor = (v) =>
  typeof v?.count === "number" ? v.count : null;

export const average: StatExtractor = (v) =>
  typeof v?.average === "number" ? v.average : null;

export const allTotal: StatExtractor = (v) =>
  typeof v?.all?.total === "number" ? v.all.total : null;

export const homeTotal: StatExtractor = (v) =>
  typeof v?.home?.total === "number" ? v.home.total : null;

export const awayTotal: StatExtractor = (v) =>
  typeof v?.away?.total === "number" ? v.away.total : null;
export const scoredAll: StatExtractor = (v) =>
  typeof v?.all?.scored === "number" ? v.all.scored : null;

export const concededAll: StatExtractor = (v) =>
  typeof v?.all?.conceded === "number" ? v.all.conceded : null;

export const percentage: StatExtractor = (v) =>
  typeof v === "number"
    ? v
    : typeof v?.percentage === "number"
    ? v.percentage
    : null;

export const minutesPlayed: StatExtractor = (v) =>
  typeof v?.total_minutes_played === "number" ? v.total_minutes_played : null;

export const ratingValue: StatExtractor = (v) =>
  typeof v?.average === "number" ? v.average : null;

export const PLAYER_STAT_EXTRACTORS: Record<
  number,
  { key: keyof PlayerSeasonStatsResponse["stats"]; extract: StatExtractor }
> = {
  321: { key: "appearances", extract: total },
  119: { key: "minutes_played", extract: total },

  52: { key: "goals", extract: total },
  79: { key: "assists", extract: total },
  5304: { key: "expected_goals", extract: total },

  42: { key: "shots_total", extract: total },
  86: { key: "shots_on_target", extract: total },
  41: { key: "shots_off_target", extract: total },
  58: { key: "shots_blocked", extract: total },

  80: { key: "passes", extract: total },
  116: { key: "accurate_passes", extract: total },
  1584: { key: "pass_accuracy", extract: percentage },
  117: { key: "key_passes", extract: total },

  78: { key: "tackles", extract: total },
  100: { key: "interceptions", extract: total },
  101: { key: "clearances", extract: total },

  108: { key: "dribbles_attempted", extract: total },
  109: { key: "dribbles_successful", extract: total },

  56: { key: "fouls", extract: total },
  96: { key: "fouls_drawn", extract: total },

  84: { key: "yellow_cards", extract: total },
  83: { key: "red_cards", extract: total },

  105: { key: "duels_total", extract: total },
  106: { key: "duels_won", extract: total },
  107: { key: "aerials_won", extract: total },

  194: { key: "clean_sheets", extract: total },
  214: { key: "wins", extract: total },
  215: { key: "draws", extract: total },
  216: { key: "losses", extract: total },

  118: { key: "rating", extract: ratingValue },
};

export const TEAM_STAT_EXTRACTORS: Record<
  number,
  { key: string; extract: StatExtractor }
> = {
  27263: { key: "games_played", extract: total },

  52: { key: "goals_for", extract: scoredAll },
  88: { key: "goals_against", extract: concededAll },

  214: { key: "wins", extract: allTotal },
  215: { key: "draws", extract: allTotal },
  216: { key: "losses", extract: allTotal },

  1677: { key: "shots", extract: count },
  34: { key: "corners", extract: count },
  43: { key: "attacks", extract: count },
  44: { key: "dangerous_attacks", extract: count },

  84: { key: "yellow_cards", extract: count },
  83: { key: "red_cards", extract: count },

  45: { key: "possession", extract: average },
  118: { key: "rating", extract: average },

  27249: { key: "minutes_played", extract: minutesPlayed },
  5304: { key: "expected_goals", extract: total },

  194: { key: "clean_sheets", extract: allTotal },
  575: { key: "failed_to_score", extract: allTotal },

  9672: {
    key: "average_player_height",
    extract: (v) => v?.avg_total_height ?? null,
  },
  9673: { key: "average_player_age", extract: average },
  9674: { key: "foreign_players", extract: total },

  9676: { key: "points_per_game", extract: average },
};
