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
  stats?: TeamStatistics;
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

  scoring_minutes?: MinuteDistribution;
  conceded_scoring_minutes?: MinuteDistribution;
  most_scored_half?: MostScoredHalfStats;
  most_frequent_scoring_minute?: {
    minute: number;
    goals: number;
  };
  half_results?: {
    won_both_halves: number;
    scored_both_halves: number;
    comebacks: number;
  };
  goal_results?: {
    scored_first: number;
    conceded_first: number;
    wins_when_scoring_first: number;
  };
  interception_stats?: {
    total: number;
    per_match: number;
  };
  pass_stats?: {
    total: number;
    accurate: number;
    accuracy_percentage: number;
  };
  assist_stats?: {
    total: number;
    per_match: number;
  };
  players_footing?: {
    left: number;
    right: number;
    both: number;
  };
  most_substituted_players?: {
    player_id: number;
    name: string;
    substitutions: number;
  }[];
  most_injured_players?: {
    player_id: number;
    name: string;
    injuries: number;
  }[];
  team_of_the_week?: {
    appearances: number;
    players: {
      id: number;
      name: string;
      position: string | null;
    }[];
  };
  injury_time_goals?: {
    total: number;
    average: number;
  };
}

export interface MostScoredHalfStats {
  most_scored_half: "1st-half" | "2nd-half";
  most_scored_half_goals: number;
  details: {
    "1st-half": {
      period: "1st-half";
      total: number;
    };
    "2nd-half": {
      period: "2nd-half";
      total: number;
    };
  };
}
export interface MinuteBucket {
  count: number;
  percentage: number;
}

export type MinuteDistribution = Record<
  "0-15" | "15-30" | "30-45" | "45-60" | "60-75" | "75-90",
  MinuteBucket
>;
