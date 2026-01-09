import { MatchListItem } from "@/modules/matches/migration/matches.types";
import { PaginationMeta } from "@/types";

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

  teams:
    | {
        id: number;
        name: string;
        logo: string | null;
      }[]
    | null;
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

export interface PlayerMatches {
  matches: MatchListItem[];
}
export interface PlayerMatchesResponse {
  matches: MatchListItem[];
  pagination: PaginationMeta;
}
