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

export type MatchStatus = "UPCOMING" | "LIVE" | "FT";

export interface MatchTeam {
  id: number;
  name: string;
  logo: string | null;
}

export interface MatchTeams {
  home: MatchTeam;
  away: MatchTeam;
}

export interface MatchScore {
  home: number | null;
  away: number | null;
}

export interface MatchListItem {
  id: number;
  kickoff_time: string;
  status: MatchStatus;

  league: {
    id: number;
    name: string;
    logo: string | null;
  };

  teams: MatchTeams;
  score?: MatchScore;
}

export interface TeamMatchesResponse {
  latest: MatchListItem[];
  upcoming: MatchListItem[];
}

export interface TeamSeasonStatsResponse {
  season: {
    id: number;
    name: string;
  };
  team: {
    id: number;
    name: string;
    logo: string | null;
  };
  stats: {
    goals_for?: number | null;
    goals_against?: number | null;
    shots?: number | null;
    yellow_cards?: number | null;
    red_cards?: number | null;
    minutes_played?: number | null;
  };
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
