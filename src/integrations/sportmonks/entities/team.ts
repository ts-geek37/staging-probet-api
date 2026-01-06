import { SportMonksCountry } from "./country";
import { SportMonksFixture, SportMonksSeason } from "./season";
import { SportMonksTeamStatistics } from "./team-statistic";

export interface SportMonksVenue {
  id: number;
  country_id: number;
  city_id: number | null;
  name: string;
  address: string | null;
  zipcode: string | null;
  latitude: string | null;
  longitude: string | null;
  capacity: number | null;
  image_path: string | null;
  city_name: string | null;
  surface: string | null;
  national_team: boolean;
}

export interface SportMonksCoach {
  id: number;
  name: string;
  image_path: string | null;
}

export interface SportMonksTeamBase {
  id: number;
  sport_id: number;
  country_id: number;
  venue_id: number | null;

  gender: string;
  name: string;
  short_code: string | null;
  image_path: string | null;
  founded: number | null;

  type: string;
  placeholder: boolean;
  last_played_at: string | null;
}

export interface SportMonksTeam extends SportMonksTeamBase {
  country?: SportMonksCountry;
  venue?: SportMonksVenue;
  coaches?: SportMonksCoach[];
  statistics?: SportMonksTeamStatistics[];
  latest?: SportMonksFixture[];
  upcoming?: SportMonksFixture[];
  activeseasons?: SportMonksSeason[];
}

export interface SportMonksTeamFixture {
  id: number
  league_id: number
  season_id: number
  starting_at: string
  starting_at_timestamp: number
  state_id: number
  name: string
  result_info: string | null
  meta?: {
    location?: "home" | "away"
  }
}
