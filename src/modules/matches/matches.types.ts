import { PaginationMeta } from "@/types";

export enum MatchListStatus {
  LIVE = "live",
  UPCOMING = "upcoming",
  TOMORROW = "tomorrow",
  FINISHED = "finished",
}

export enum MatchDetailView {
  OVERVIEW = "overview",
  STATS = "stats",
  LINEUPS = "lineups",
  EVENTS = "events",
  PREDICTIONS = "predictions",
}

export type MatchStatus = "scheduled" | "live" | "finished";

export interface TeamSide {
  id: number;
  name: string;
  logo: string;
  score?: number;
}

export interface MatchCard {
  id: number;
  league: {
    id: number;
    name: string;
  };
  status: MatchStatus;
  kickoff_time: string;
  minute?: number;
  home_team: TeamSide;
  away_team: TeamSide;
}

export interface MatchesListResponse {
  data: MatchCard[];
  pagination: PaginationMeta;
}

export interface MatchBase {
  id: number;
  league: {
    id: number;
    name: string;
    season: string;
  };
  status: MatchStatus;
  kickoff_time: string;
  minute?: number;
  venue?: string;
  referee?: string;
  home_team: TeamSide;
  away_team: TeamSide;
}

export interface MatchOverviewResponse extends MatchBase {
  score: {
    home: number | null;
    away: number | null;
  };
}

export interface MatchStatsResponse extends MatchBase {
  statistics: {
    team_id: number;
    possession?: number;
    shots_on_target?: number;
    shots_off_target?: number;
    corners?: number;
    fouls?: number;
    yellow_cards?: number;
    red_cards?: number;
  }[];
}

export interface Player {
  id: number;
  name: string;
  number?: number;
  position?: string;
  photo?: string;
}

export interface MatchLineupsResponse extends MatchBase {
  lineups: {
    team_id: number;
    formation?: string;
    starting_xi: Player[];
    substitutes: Player[];
  }[];
}

export interface MatchEventsResponse extends MatchBase {
  events: {
    id: number;
    minute: number;
    type: "goal" | "card" | "substitution";
    team_id: number;
    player_name?: string;
    related_player_name?: string;
  }[];
}

export interface MatchPredictionsResponse extends MatchBase {
  prediction: {
    home_win_probability: number;
    draw_probability: number;
    away_win_probability: number;
  };
}

export type MatchDetailResponse =
  | MatchOverviewResponse
  | MatchStatsResponse
  | MatchLineupsResponse
  | MatchEventsResponse
  | MatchPredictionsResponse;
