import { MatchListItem } from "@/modules/matches/migration/matches.types";

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
  pagination: {
    page: number;
    limit: number;
    total: number;
    has_next: boolean;
  };
}

/* Team Overview */
/* ---------------------------------- */

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
  };

  current_season: {
    id: number;
    name: string;
  } | null;
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
  season: {
    id: number;
    name: string;
  };
  stats?: {
    games_played?: number | null;

    goals_for?: number | null;
    goals_against?: number | null;

    wins?: number | null;
    draws?: number | null;
    losses?: number | null;

    shots?: number | null;
    corners?: number | null;
    attacks?: number | null;
    dangerous_attacks?: number | null;

    possession?: number | null;
    rating?: number | null;

    yellow_cards?: number | null;
    red_cards?: number | null;

    minutes_played?: number | null;
    expected_goals?: number | null;

    clean_sheets?: number | null;
    failed_to_score?: number | null;

    average_player_age?: number | null;
    average_player_height?: number | null;
    foreign_players?: number | null;

    points_per_game?: number | null;
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

export interface SportMonksTeamSeasonStatistic {
  id: number;
  team_id: number;
  season_id: number;
  has_values: boolean;

  season?: {
    id: number;
    name: string;
    is_current?: boolean;
  };

  team?: {
    id: number;
    name: string;
    image_path: string | null;
  };

  details: SportMonksTeamSeasonStatisticDetail[];
}

export interface SportMonksTeamSeasonStatisticDetail {
  id: number;
  team_statistic_id: number;
  type_id: number;
  value: Record<string, any>;
}
