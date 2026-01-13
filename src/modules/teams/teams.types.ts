import { MatchListItem } from "@/modules/matches/migration/matches.types";
import { PaginationMeta } from "@/types";

export interface TeamCard {
  id: number;
  name: string;
  short_code: string | null;
  logo: string | null;

  country: {
    name: string;
    code: string | null;
    flag: string | null;
  };

  founded: number | null;

  stadium: {
    name: string | null;
    capacity: number | null;
  };
}

export interface TeamsListResponse {
  data: TeamCard[];
  pagination: PaginationMeta;
}

export interface TeamSeason {
  id: number;
  name: string;
  is_current?: boolean;
  starting_at: string | null;
  ending_at: string | null;
  league: {
    id: number;
    name: string;
    logo: string | null;
  };
}

export interface SocialDTO {
  id: number;
  channel: {
    id: number;
    name: string;
    color: string;
  };
  handle: string;
  url: string;
}

export interface TeamOverviewResponse {
  id: number;
  name: string;
  short_code: string | null;
  logo: string | null;
  founded: number | null;

  country: {
    name: string;
    code: string | null;
    flag: string | null;
  };

  stadium: {
    name: string | null;
    capacity: number | null;
    image: string | null;
  };
  socials: SocialDTO[] | null;
  rivals:
    | {
        id: number;
        name: string;
        logo: string | null;
        type: string | null;
      }[]
    | null;
  current_seasons: TeamSeason[] | null;

  rankings:
    | {
        id: number;
        name: string;
        rank: number | null;
        points: number | null;
      }[]
    | null;
}

export interface TeamPlayer {
  id: number;
  name: string;
  photo: string | null;

  position: {
    id: number | null;
    label: string | null;
  };

  jersey_number: number | null;
  nationality: string | null;

  contract: {
    start: string | null;
    end: string | null;
  };
}

export interface TeamPlayersResponse {
  team_id: number;
  players: TeamPlayer[];
}

export interface TeamMatchesResponse {
  latest: MatchListItem[];
  upcoming: MatchListItem[];
}

export interface TeamSeasonStatsItem {
  season: TeamSeason;
  stats?: { 
    games_played?: number | null;
    minutes_played?: number | null;
 
    wins?: number | null;
    draws?: number | null;
    losses?: number | null;
    points_per_game?: number | null;
 
    goals_for?: number | null;
    goals_against?: number | null;
    expected_goals?: number | null;
    clean_sheets?: number | null;
    failed_to_score?: number | null;
 
    shots?: number | null;
    corners?: number | null;
    attacks?: number | null;
    dangerous_attacks?: number | null;
    possession?: number | null;
    penalties?: number | null;
    offsides?: number | null;
    assists?: number | null;
 
    tackles?: number | null;
    fouls?: number | null;
 
    yellow_cards?: number | null;
    red_cards?: number | null;
    yellow_red_cards?: number | null;
    fouls_per_card?: number | null;
 
    rating?: number | null;
    highest_rated_player?: number | null;
 
    average_player_height?: number | null;
    average_player_age?: number | null;
    foreign_players?: number | null;
    appearing_players?: number | null;
    national_team_players?: number | null;
 
    penalty_conversion_rate?: number | null;
    shot_conversion_rate?: number | null;
    shot_on_target_percentage?: number | null;
    scoring_frequency?: number | null;
 
    scoring_minutes?: unknown | null;
    conceded_scoring_minutes?: unknown | null;
    most_scored_half?: unknown | null;
    most_frequent_scoring_minute?: unknown | null;
    half_results?: unknown | null;
    goal_results?: unknown | null;
    interception_stats?: unknown | null;
    pass_stats?: unknown | null;
    assist_stats?: unknown | null;
    players_footing?: unknown | null;
    most_substituted_players?: unknown | null;
    most_injured_players?: unknown | null;
    team_of_the_week?: unknown | null;
    injury_time_goals?: unknown | null;
  };
}

export interface TeamSeasonStatsResponse {
  team: {
    id: number;
    name: string;
    logo: string | null;
  };
  seasons: TeamSeasonStatsItem[];
}

export interface TeamTransferRow {
  id: number;
  date: string;
  amount: number | null;
  completed: boolean;
  type?: {
    id: number;
    code: string;
    label: string;
  };

  player: {
    id: number;
    name: string;
    image: string | null;
  };

  from_team: {
    id: number;
    name: string;
    logo: string | null;
  } | null;

  to_team: {
    id: number;
    name: string;
    logo: string | null;
  } | null;
}

export interface TeamTransferResponse {
  transfers: TeamTransferRow[];
  pagination: PaginationMeta;
}

export interface TeamStatistics {
  games_played?: number;
  minutes_played?: number;

  wins?: number;
  draws?: number;
  losses?: number;
  points_per_game?: number;

  goals_for?: number;
  goals_against?: number;
  expected_goals?: number;
  clean_sheets?: number;
  failed_to_score?: number;

  shots?: number;
  corners?: number;
  attacks?: number;
  dangerous_attacks?: number;
  possession?: number;
  penalties?: number;
  offsides?: number;
  assists?: number;

  tackles?: number;
  fouls?: number;

  yellow_cards?: number;
  red_cards?: number;
  yellow_red_cards?: number;
  fouls_per_card?: number;

  rating?: number;
  highest_rated_player?: number | null;

  average_player_height?: number | null;
  average_player_age?: number;
  foreign_players?: number;
  appearing_players?: number;
  national_team_players?: number;

  penalty_conversion_rate?: number;
  shot_conversion_rate?: number;
  shot_on_target_percentage?: number;
  scoring_frequency?: number;

  scoring_minutes?: unknown;
  conceded_scoring_minutes?: unknown;
  most_scored_half?: unknown;
  most_frequent_scoring_minute?: unknown;
  half_results?: unknown;
  goal_results?: unknown;
  interception_stats?: unknown;
  pass_stats?: unknown;
  assist_stats?: unknown;
  players_footing?: unknown;
  most_substituted_players?: unknown;
  most_injured_players?: unknown;
  team_of_the_week?: unknown;
  injury_time_goals?: unknown;
}
