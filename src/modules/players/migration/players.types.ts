export interface PlayerProfileResponse {
  id: number;
  name: string;
  photo: string | null;

  date_of_birth: string | null;
  age: number | null;

  height: number | null;
  weight: number | null;
  preferred_foot: string | null;

  nationality: {
    id: number;
    name: string;
    flag: string | null;
  } | null;

  position: {
    id: number | null;
    name: string | null;
  };

  current_team: {
    id: number;
    name: string;
    logo: string | null;
  } | null;
}

export interface PlayerSeasonStatsResponse {
  season: {
    id: number;
    name: string;
  };

  team: {
    id: number;
    name: string;
    logo: string | null;
  } | null;

  jersey_number: number | null;

  position: {
    id: number | null;
    name: string | null;
  };

  stats: {
    appearances?: number | null;
    goals?: number | null;
    assists?: number | null;
    minutes_played?: number | null;

    shots_total?: number | null;
    shots_on_target?: number | null;
    shots_off_target?: number | null;
    shots_blocked?: number | null;

    passes?: number | null;
    accurate_passes?: number | null;
    pass_accuracy?: number | null;
    key_passes?: number | null;

    tackles?: number | null;
    interceptions?: number | null;
    clearances?: number | null;

    dribbles_attempted?: number | null;
    dribbles_successful?: number | null;

    fouls?: number | null;
    fouls_drawn?: number | null;

    yellow_cards?: number | null;
    red_cards?: number | null;

    duels_total?: number | null;
    duels_won?: number | null;
    aerials_won?: number | null;

    rating?: number | null;
    expected_goals?: number | null;

    clean_sheets?: number | null;
    wins?: number | null;
    draws?: number | null;
    losses?: number | null;
  };
}
export type MatchStatus = "UPCOMING" | "LIVE" | "FT";

 
export interface MatchLeagueRef {
  id: number;
  name: string;
  logo: string | null;
}
 
export interface MatchTeamRef {
  id: number;
  name: string;
  logo: string | null;
}

 
export interface MatchTeams {
  home: MatchTeamRef;
  away: MatchTeamRef;
}
 
export interface MatchScore {
  home: number | null;
  away: number | null;
}
 
export interface PlayerMatchItem {
  id: number;
  kickoff_time: string;
  status: MatchStatus;

  league: MatchLeagueRef;
  teams: MatchTeams;

  score?: MatchScore;
}

export interface PlayerMatchesResponse {
  matches: PlayerMatchItem[];
}