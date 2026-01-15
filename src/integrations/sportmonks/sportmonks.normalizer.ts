import { MatchEventType } from "../../modules/matches/matches.types";
import { PlayerSeasonStatsResponse } from "../../modules/players/players.types";
import { TeamStatistics } from "../../modules/teams/teams.types";
import { SportMonksStandingForm } from "./entities";

export type CompetitionType = "league" | "cup";

export const normalizeCompetitionType = (value: unknown): CompetitionType =>
  value === "league" ? "league" : "cup";

export type MatchStatus = "UPCOMING" | "LIVE" | "FINISHED" | "PROBLEM";

type StateCategory = "UPCOMING" | "LIVE" | "FINISHED" | "PROBLEM" | "UNKNOWN";

const STATE_ID_CATEGORY_MAP: Record<number, StateCategory> = {
  // Upcoming / scheduled
  1: "UPCOMING", // NS
  10: "PROBLEM", // POSTPONED
  13: "UPCOMING", // TBA
  16: "PROBLEM", // DELAYED
  26: "UPCOMING", // PENDING

  // Live states
  2: "LIVE", // INPLAY_1ST_HALF
  3: "LIVE", // HT
  4: "LIVE", // BREAK
  6: "LIVE", // INPLAY_ET
  9: "LIVE", // INPLAY_PENALTIES
  21: "LIVE", // EXTRA_TIME_BREAK
  22: "LIVE", // INPLAY_2ND_HALF
  25: "LIVE", // PEN_BREAK

  // Finished states
  5: "FINISHED", // FT
  7: "FINISHED", // AET
  8: "FINISHED", // FT_PEN
  14: "FINISHED", // WO
  17: "FINISHED", // AWARDED

  // Problem / terminal
  11: "PROBLEM", // SUSPENDED
  12: "PROBLEM", // CANCELLED
  15: "PROBLEM", // ABANDONED
  18: "PROBLEM", // INTERRUPTED
  19: "PROBLEM", // AU
  20: "PROBLEM", // DELETED
};

const STATE_CODE_CATEGORY_MAP: Record<string, StateCategory> = {
  NS: "UPCOMING",
  TBA: "UPCOMING",
  PENDING: "UPCOMING",

  LIVE: "LIVE",
  HT: "LIVE",
  BREAK: "LIVE",
  INPLAY_1ST_HALF: "LIVE",
  INPLAY_2ND_HALF: "LIVE",
  INPLAY_ET: "LIVE",
  INPLAY_PENALTIES: "LIVE",
  EXTRA_TIME_BREAK: "LIVE",
  PEN_BREAK: "LIVE",

  FT: "FINISHED",
  AET: "FINISHED",
  FT_PEN: "FINISHED",
  WO: "FINISHED",
  AWARDED: "FINISHED",

  POSTPONED: "UPCOMING",
  DELAYED: "UPCOMING",
  SUSPENDED: "PROBLEM",
  CANCELLED: "PROBLEM",
  ABANDONED: "PROBLEM",
  INTERRUPTED: "PROBLEM",
  AU: "PROBLEM",
  DELETED: "PROBLEM",
};

export const normalizeFixtureStatus = (state: unknown): MatchStatus => {
  let category: StateCategory | undefined;

  if (typeof state === "number") {
    category = STATE_ID_CATEGORY_MAP[state];
  }

  if (!category && typeof state === "string") {
    category = STATE_CODE_CATEGORY_MAP[state.toUpperCase()];
  }

  switch (category) {
    case "UPCOMING":
      return "UPCOMING";
    case "LIVE":
      return "LIVE";
    case "FINISHED":
      return "FINISHED";
    case "PROBLEM":
      return "PROBLEM";
    default:
      // safest fallback: never mark unknown as LIVE
      return "UPCOMING";
  }
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
  FINISHED: [5, 6],
} as const;

export const DATE_RANGES = {
  LIVE: { from: -1, to: +1 },
  UPCOMING: { from: 0, to: +14 },
  FINISHED: { from: -14, to: 0 },
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

export const passthrough: StatExtractor = (value) => value ?? null;

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
  322: { key: "lineups", extract: total },
  323: { key: "bench", extract: total },
  119: { key: "minutes_played", extract: total },

  52: { key: "goals", extract: total },
  324: { key: "own_goals", extract: total },
  79: { key: "assists", extract: total },
  5304: { key: "expected_goals", extract: total },
  27259: { key: "hattricks", extract: total },

  42: { key: "shots_total", extract: total },
  86: { key: "shots_on_target", extract: total },
  41: { key: "shots_off_target", extract: total },
  58: { key: "shots_blocked", extract: total },
  64: { key: "hit_woodwork", extract: total },

  80: { key: "passes", extract: total },
  116: { key: "accurate_passes", extract: total },
  1584: { key: "pass_accuracy", extract: percentage },
  117: { key: "key_passes", extract: total },
  122: { key: "long_balls", extract: total },
  123: { key: "long_balls_won", extract: total },
  124: { key: "through_balls", extract: total },
  125: { key: "through_balls_won", extract: total },
  98: { key: "crosses", extract: total },
  99: { key: "accurate_crosses", extract: total },
  27255: { key: "crosses_blocked", extract: total },

  108: { key: "dribbles_attempted", extract: total },
  109: { key: "dribbles_successful", extract: total },
  110: { key: "dribbled_past", extract: total },
  94: { key: "dispossessed", extract: total },

  78: { key: "tackles", extract: total },
  100: { key: "interceptions", extract: total },
  101: { key: "clearances", extract: total },
  97: { key: "blocked_shots_defensive", extract: total },
  571: { key: "errors_leading_to_goal", extract: total },

  105: { key: "duels_total", extract: total },
  106: { key: "duels_won", extract: total },
  107: { key: "aerials_won", extract: total },

  56: { key: "fouls", extract: total },
  96: { key: "fouls_drawn", extract: total },
  84: { key: "yellow_cards", extract: total },
  83: { key: "red_cards", extract: total },
  85: { key: "yellow_red_cards", extract: total },

  57: { key: "saves", extract: total },
  104: { key: "saves_inside_box", extract: total },
  88: { key: "goals_conceded", extract: total },
  194: { key: "clean_sheets", extract: total },

  214: { key: "wins", extract: total },
  215: { key: "draws", extract: total },
  216: { key: "losses", extract: total },

  580: { key: "big_chances_created", extract: total },
  581: { key: "big_chances_missed", extract: total },
  9676: { key: "points_per_game", extract: average },

  118: { key: "rating", extract: ratingValue },
};

export const TEAM_STAT_EXTRACTORS: Record<
  number,
  { key: keyof TeamStatistics; extract: StatExtractor }
> = {
  /* Core */
  27263: { key: "games_played", extract: total },
  27249: { key: "minutes_played", extract: minutesPlayed },

  /* Results */
  214: { key: "wins", extract: allTotal },
  215: { key: "draws", extract: allTotal },
  216: { key: "losses", extract: allTotal },
  9676: { key: "points_per_game", extract: average },

  /* Goals */
  52: { key: "goals_for", extract: scoredAll },
  88: { key: "goals_against", extract: concededAll },
  5304: { key: "expected_goals", extract: total },
  194: { key: "clean_sheets", extract: allTotal },
  575: { key: "failed_to_score", extract: allTotal },

  /* Attacking */
  1677: { key: "shots", extract: count },
  34: { key: "corners", extract: count },
  43: { key: "attacks", extract: count },
  44: { key: "dangerous_attacks", extract: count },
  45: { key: "possession", extract: average },
  47: { key: "penalties", extract: count },
  51: { key: "offsides", extract: count },
  79: { key: "assists", extract: count },

  /* Defensive */
  78: { key: "tackles", extract: count },
  56: { key: "fouls", extract: count },

  /* Discipline */
  84: { key: "yellow_cards", extract: count },
  83: { key: "red_cards", extract: count },
  85: { key: "yellow_red_cards", extract: count },
  9683: { key: "fouls_per_card", extract: average },

  /* Ratings */
  118: { key: "rating", extract: average },
  211: {
    key: "highest_rated_player",
    extract: (v) => v?.player?.rating ?? null,
  },

  /* Squad */
  9672: {
    key: "average_player_height",
    extract: (v) => v?.avg_total_height ?? null,
  },
  9673: { key: "average_player_age", extract: average },
  9674: { key: "foreign_players", extract: total },
  9677: { key: "appearing_players", extract: total },
  27258: { key: "national_team_players", extract: total },

  9680: { key: "penalty_conversion_rate", extract: average },
  9681: { key: "shot_conversion_rate", extract: average },
  9682: { key: "shot_on_target_percentage", extract: average },
  27248: { key: "scoring_frequency", extract: average },

  /* Structured / passthrough */
  196: { key: "scoring_minutes", extract: passthrough },
  213: { key: "conceded_scoring_minutes", extract: passthrough },
  27250: { key: "most_scored_half", extract: passthrough },
  27251: { key: "most_frequent_scoring_minute", extract: passthrough },
  27256: { key: "half_results", extract: passthrough },
  27261: { key: "goal_results", extract: passthrough },
  27252: { key: "interception_stats", extract: passthrough },
  27253: { key: "pass_stats", extract: passthrough },
  27254: { key: "assist_stats", extract: passthrough },
  9675: { key: "players_footing", extract: passthrough },
  9678: { key: "most_substituted_players", extract: passthrough },
  9679: { key: "most_injured_players", extract: passthrough },
  27257: { key: "team_of_the_week", extract: passthrough },
  27260: { key: "injury_time_goals", extract: passthrough },
};

export enum StandingDetailKey {
  MATCHES_PLAYED = "matchesPlayed",
  WINS = "wins",
  DRAWS = "draws",
  LOSSES = "losses",
  GOALS_FOR = "goalsFor",
  GOALS_AGAINST = "goalsAgainst",
  GOAL_DIFFERENCE = "goalDifference",
  POINTS = "points",
}

export enum StandingScope {
  OVERALL = "overall",
  HOME = "home",
  AWAY = "away",
}

export const STANDING_DETAIL_TYPE_MAP: Record<
  number,
  { scope: StandingScope; key: StandingDetailKey }
> = {
  129: { scope: StandingScope.OVERALL, key: StandingDetailKey.MATCHES_PLAYED },
  130: { scope: StandingScope.OVERALL, key: StandingDetailKey.WINS },
  131: { scope: StandingScope.OVERALL, key: StandingDetailKey.DRAWS },
  132: { scope: StandingScope.OVERALL, key: StandingDetailKey.LOSSES },
  133: { scope: StandingScope.OVERALL, key: StandingDetailKey.GOALS_FOR },
  134: { scope: StandingScope.OVERALL, key: StandingDetailKey.GOALS_AGAINST },
  179: { scope: StandingScope.OVERALL, key: StandingDetailKey.GOAL_DIFFERENCE },
  187: { scope: StandingScope.OVERALL, key: StandingDetailKey.POINTS },

  135: { scope: StandingScope.HOME, key: StandingDetailKey.MATCHES_PLAYED },
  136: { scope: StandingScope.HOME, key: StandingDetailKey.WINS },
  137: { scope: StandingScope.HOME, key: StandingDetailKey.DRAWS },
  138: { scope: StandingScope.HOME, key: StandingDetailKey.LOSSES },
  139: { scope: StandingScope.HOME, key: StandingDetailKey.GOALS_FOR },
  140: { scope: StandingScope.HOME, key: StandingDetailKey.GOALS_AGAINST },
  185: { scope: StandingScope.HOME, key: StandingDetailKey.POINTS },

  141: { scope: StandingScope.AWAY, key: StandingDetailKey.MATCHES_PLAYED },
  142: { scope: StandingScope.AWAY, key: StandingDetailKey.WINS },
  143: { scope: StandingScope.AWAY, key: StandingDetailKey.DRAWS },
  144: { scope: StandingScope.AWAY, key: StandingDetailKey.LOSSES },
  145: { scope: StandingScope.AWAY, key: StandingDetailKey.GOALS_FOR },
  146: { scope: StandingScope.AWAY, key: StandingDetailKey.GOALS_AGAINST },
  186: { scope: StandingScope.AWAY, key: StandingDetailKey.POINTS },
};
