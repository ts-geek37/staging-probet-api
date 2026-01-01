export enum PlayerDetailView {
  OVERVIEW = "overview",
  STATS = "stats",
  MATCHES = "matches",
}

export interface PlayerListResponse {
  data: PlayerCard[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    has_next: boolean;
  };
}

export interface PlayerCard {
  id: number;
  full_name: string;
  nationality: string;
  position: string | null;
  photo: string | null;
  team: {
    id: number;
    name: string;
    logo: string;
  };
}

export interface PlayerBase {
  id: number;
  full_name: string;
  nationality: string;
  date_of_birth: string;
  age: number;
  height: string | null;
  weight: string | null;
  preferred_foot: string | null;
  position: string | null;
  shirt_number: number | null;
  photo: string | null;
  team: {
    id: number;
    name: string;
    logo: string;
  };
  contract_end_year: number | null;
  market_value: number | null;
}

export interface PlayerOverviewResponse extends PlayerBase {
  current_season_summary: {
    appearances: number;
    goals: number;
    assists: number;
    minutes: number;
  };
}

export interface PlayerStatsResponse extends PlayerBase {
  career_totals: {
    appearances: number;
    goals: number;
    assists: number;
    yellow_cards: number;
    red_cards: number;
  };
  seasons: {
    season: string;
    competition: string;
    appearances: number;
    goals: number;
    assists: number;
    minutes: number;
  }[];
}

export interface PlayerMatchesResponse extends PlayerBase {
  matches: {
    match_id: number;
    kickoff_time: string;
    competition: string;
    opponent: string;
    minutes_played: number | null;
    goals: number | null;
    assists: number | null;
  }[];
}

export type PlayerDetailResponse =
  | PlayerOverviewResponse
  | PlayerStatsResponse
  | PlayerMatchesResponse;
