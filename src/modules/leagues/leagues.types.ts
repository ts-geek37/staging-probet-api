export interface LeagueResponse {
  league: LeagueHeader;
  recent?: LeagueMatch[];
  overview?: LeagueOverview;
  standings?: LeagueStandings;
  matches?: LeagueMatches;
  stats?: LeagueStats;
  teams?: LeagueTeams;
}

export interface LeagueHeader {
  id: number;
  name: string;
  country: string;
  season: string;
  logo: string;
  country_flag: string;
}

export interface LeagueOverview {
  description: string;
  total_teams: number;
  matches_played: number;
  goals_scored: number;
  goals_per_match: number;
  top_teams: Array<{
    id: number;
    name: string;
    logo: string;
    points: number;
  }>;
}

export interface LeagueStandings {
  table: Array<{
    position: number;
    team: {
      id: number;
      name: string;
      logo: string;
    };
    played: number;
    wins: number;
    draws: number;
    losses: number;
    goal_difference: number;
    points: number;
    form: Array<"W" | "D" | "L">;
  }>;
}

export interface LeagueMatches {
  upcoming: LeagueMatch[];
  recent: LeagueMatch[];
}

export interface LeagueMatch {
  id: number;
  kickoff_time: string;
  status: "UPCOMING" | "LIVE" | "FT";
  home_team: {
    id: number;
    name: string;
    logo: string;
    score?: number;
  };
  away_team: {
    id: number;
    name: string;
    logo: string;
    score?: number;
  };
}

export interface LeagueStats {
  total_goals: number;
  clean_sheets: number;
  yellow_cards: number;
  goals_per_match: number;
  top_scorers: Array<{
    player_id: number;
    name: string;
    team: string;
    team_logo_url: string;
    goals: number;
  }>;
}

export interface LeagueTeams {
  teams: Array<{
    id: number;
    name: string;
    logo: string;
  }>;
}

export enum LeagueView {
  OVERVIEW = "overview",
  STANDINGS = "standings",
  MATCHES = "matches",
  STATS = "stats",
  TEAMS = "teams",
}

export interface LeagueListResponse {
  data: LeagueListItem[];
  pagination: PaginationMeta;
}

export interface LeagueListItem {
  id: number;
  name: string;
  country: string;
  season: string;
  logo: string;
  country_flag: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  has_next: boolean;
}
