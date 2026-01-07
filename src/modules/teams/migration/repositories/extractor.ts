import { PlayerSeasonStatsResponse } from "../../../players/migration/players.types";
import { TeamSeasonStatsResponse } from "../teams.types";

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
