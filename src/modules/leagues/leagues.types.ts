import { MatchListItem } from "../../modules/matches/matches.types";
import { PaginationMeta } from "../../types";

export interface LeagueCard {
  id: number;
  name: string;
  logo: string | null;
  competition_type: "league" | "cup";
  country: {
    name: string;
    code: string | null;
    flag: string | null;
  };
}

export interface LeaguesListResponse {
  data: LeagueCard[];
  pagination: PaginationMeta;
}

export interface StageInfo {
  id: number;
  name: string;
  starting_at: string | null;
  ending_at: string | null;
}
export interface LeagueSeasonInfo {
  id: number;
  name: string;
  starting_at: string | null;
  ending_at: string | null;
  stages?: StageInfo[];
  stage: StageInfo | null;
}

export interface LeagueProfileResponse {
  id: number;
  name: string;
  logo: string | null;
  competition_type: "league" | "cup";
  country: {
    name: string;
    code: string | null;
    flag: string | null;
  };
  current_season: LeagueSeasonInfo | null;
}

export interface LeagueStandingRow {
  position: number;
  team: {
    id: number;
    name: string;
    logo: string | null;
  };
  played: number;
  won: number;
  draw: number;
  lost: number;
  goal_difference: number;
  points: number;
  form: ("W" | "D" | "L")[];
}

export interface LeagueStandingsResponse {
  league: {
    id: number;
    name: string;
    country: string;
  };
  season: LeagueSeasonInfo;
  table: {
    position: number;
    team: {
      id: number;
      name: string;
      logo: string | null;
    };
    points: number;
  }[];
}

export interface CurrentSeason extends LeagueSeasonInfo {}

export interface LeagueSeasonStatistics {
  season: CurrentSeason;
  overview: {
    matches_played: number | null;
    total_goals: number | null;
    average_goals_per_match: number | null;
  };
  scoring: {
    home_goals_percentage: number | null;
    away_goals_percentage: number | null;
    over_25_percentage: number | null;
    under_25_percentage: number | null;
  };
  discipline: {
    yellow_cards: number | null;
    red_cards: number | null;
    average_yellow_cards: number | null;
    average_red_cards: number | null;
  };
}

export interface LeagueStatisticsResponse {
  league: {
    id: number;
    name: string;
  };
  seasons: LeagueSeasonStatistics[];
}

export interface MatchTeam {
  id: number;
  name: string;
  logo: string | null;
  score: {
    goals: number;
  };
}

export interface LeagueMatchesResponse {
  league: {
    id: number;
    name: string;
  };
  season: CurrentSeason;
  matches: MatchListItem[];
}

export interface TopScorerRow {
  position: number;
  total: number;
  player: {
    id: number;
    name: string;
    image: string | null;
  };
  team: {
    id: number;
    name: string;
    logo: string | null;
  };
}

export interface TopScorerTable {
  typeId: number;
  code: string;
  label: string;
  rows: TopScorerRow[];
}

export type TopScorerEntity = "player";
export type TopScorerMetric = "count";

export interface TopScorerTableSchema {
  typeId: number;
  code: string;
  label: string;
  entity: TopScorerEntity;
  metric: TopScorerMetric;
  unit: string | null;
  sortable: boolean;
  defaultSort: "position";
}

export interface TopScorersResponse {
  league: {
    id: number;
    name: string;
  };
  season: CurrentSeason;

  schema: {
    tables: Record<string, TopScorerTableSchema>;
    order: string[];
  };

  tables: Record<string, TopScorerTable>;
}

export interface CachedLeagueContext {
  league: {
    id: number;
    name: string;
    logo: string | null;
    competition_type: "league" | "cup";
    country: {
      name: string;
      code: string | null;
      flag: string | null;
    };
  };
  season: CurrentSeason | null;
}
