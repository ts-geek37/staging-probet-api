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
  pagination: {
    page: number;
    limit: number;
    total: number;
    has_next: boolean;
  };
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
  current_season: {
    id: number;
    name: string;
    starting_at: string | null;
    ending_at: string | null;
  } | null;
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
  season: {
    id: number;
    name: string;
  };
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

export interface CurrentSeason {
  id: number;
  name: string;
  starting_at: string | null;
  ending_at: string | null;
}

export interface LeagueSeasonStatistics {
  season: {
    id: number;
    name: string;
  };
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
  season: {
    id: number;
    name: string;
  };
  matches: {
    id: number;
    kickoff_time: string;
    status: string;
    home_team: MatchTeam;
    away_team: MatchTeam;
  }[];
}
