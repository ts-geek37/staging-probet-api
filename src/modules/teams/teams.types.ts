export enum TeamDetailView {
  OVERVIEW = "overview",
  MATCHES = "matches",
  SQUAD = "squad",
  STATS = "stats",
}

export interface TeamListResponse {
  data: TeamCard[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    has_next: boolean;
  };
}

export interface TeamCard {
  id: number;
  name: string;
  short_code: string | null;
  country: string;
  founded: number | null;
  stadium: {
    name: string | null;
    capacity: number | null;
  };
  league: {
    id: number;
    name: string;
  };
  coach: {
    id: number;
    name: string;
  } | null;
}

export interface TeamBase {
  id: number;
  name: string;
  logo: string;
  country: string;
  country_flag?: string;
  founded: number | null;
  stadium: {
    name: string | null;
    capacity: number | null;
  };
  league: {
    id: number;
    name: string;
    season: string;
  };
}

export interface TeamOverviewResponse extends TeamBase {
  season_summary: {
    played: number;
    won: number;
    drawn: number;
    lost: number;
  };
  key_stats: {
    goals_scored: number;
    goals_conceded: number;
    clean_sheets: number;
    goal_difference: number;
  };
  recent_matches: TeamMatchSummary[];
  upcoming_matches: TeamMatchSummary[];
  key_players: TeamPlayerSummary[];
}

export interface TeamMatchesResponse extends TeamBase {
  matches: { recent: TeamMatchSummary[]; upcoming: TeamMatchSummary[] };
}

export interface TeamSquadResponse extends TeamBase {
  squad: TeamPlayerSummary[];
}

export interface TeamStatsResponse extends TeamBase {
  stats: {
    matches_played: number;
    wins: number;
    draws: number;
    losses: number;
    goals_scored: number;
    goals_conceded: number;
    clean_sheets: number;
    goal_difference: number;
    possession_percentage: number;
    pass_accuracy_percentage: number;
    average_shots: number;
    performance_index: number;
  };
}

export type TeamDetailResponse =
  | TeamOverviewResponse
  | TeamMatchesResponse
  | TeamSquadResponse
  | TeamStatsResponse;

export interface TeamMatchSummary {
  match_id: number;
  kickoff_time: string;
  opponent: string;
  home_away: "home" | "away";
  score: string | null;
  competition: string;
}

export interface TeamPlayerSummary {
  player_id: number;
  name: string;
  position: string | null;
  shirt_number: number | null;
  nationality: string;
  photo: string | null;
}
