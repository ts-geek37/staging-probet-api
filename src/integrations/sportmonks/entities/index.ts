export interface SportMonksCountry {
  id: number;
  name: string;
  iso2: string | null;
  continent: string | null;
  image_path: string | null;
}

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
  country?: SportMonksCountry;
}

export interface SportMonksCoach {
  id: number;
  name: string;
  image_path: string | null;
}

export interface SportMonksParticipant {
  id: number;
  sport_id: number;
  country_id: number;
  venue_id: number | null;
  gender: "male" | "female";
  name: string;
  short_code: string | null;
  image_path: string | null;
  founded: number | null;
  type: "domestic" | "national" | string;
  placeholder: boolean;
  last_played_at: string | null;
  meta?: {
    location?: "home" | "away";
  };
}

export interface SportMonksLeague {
  id: number;
  sport_id: number;
  country_id: number | null;
  name: string;
  active: boolean;
  short_code: string | null;
  image_path: string | null;
  type: string;
  sub_type: string | null;
  last_played_at: string | null;
  category: number | null;
  has_jerseys: boolean;
  has_standings?: boolean;
  has_rounds?: boolean;
  seasons?: SportMonksSeason[];
}

export interface SportMonksSeason {
  id: number;
  sport_id: number;
  league_id: number;
  name: string;
  finished: boolean;
  pending: boolean;
  is_current: boolean;
  starting_at: string | null;
  ending_at: string | null;
  fixtures?: SportMonksFixture[];
}

export interface SportMonksFixtureScore {
  id: number;
  fixture_id: number;
  type_id: number;
  participant_id: number;
  description: string;
  score: {
    goals: number | null;
  };
}

export interface SportMonksFixtureStatistic {
  id: number;
  fixture_id: number;
  participant_id: number;
  type_id: number;
  data: {
    value: number | string | null;
  };
  location: "home" | "away";
}

export interface SportMonksEvent {
  id: number;
  fixture_id: number;
  period_id: number;
  detailed_period_id: number;
  participant_id: number | null;
  type_id: number;
  section: string;
  sub_type_id: number | null;
  sort_order: number;

  minute: number | null;
  extra_minute: number | null;

  player_id: number | null;
  related_player_id: number | null;
  player_name: string | null;
  related_player_name: string | null;

  result: string | null;
  info: string | null;
  addition: string | null;

  injured: boolean | null;
  on_bench: boolean;
  coach_id: number | null;
  rescinded: boolean | null;
}

export interface SportMonksLineup {
  id: number;
  sport_id: number;
  fixture_id: number;
  player_id: number;
  team_id: number;
  position_id: number | null;
  formation_field: string | null;
  formation_position: number | null;
  type_id: number;
  player_name: string;
  jersey_number: number | null;
}

export interface SportMonksFixture {
  id: number;
  sport_id: number;
  league_id: number;
  season_id: number;
  stage_id: number;
  group_id: number | null;
  aggregate_id: number | null;
  round_id: number;
  state_id: number;
  venue_id: number | null;

  name: string;
  starting_at: string;
  starting_at_timestamp: number;

  result_info: string | null;
  leg: string | null;
  details: string | null;
  length: number;

  placeholder: boolean;
  has_odds: boolean;
  has_premium_odds: boolean;

  league?: SportMonksLeague;
  season?: SportMonksSeason;
  venue?: SportMonksVenue;

  participants: SportMonksParticipant[];
  scores?: SportMonksFixtureScore[];
  statistics?: SportMonksFixtureStatistic[];
  events?: SportMonksEvent[];
  lineups?: SportMonksLineup[];
}

export interface SportMonksStanding {
  id: number;
  participant_id: number;
  league_id: number;
  season_id: number;
  stage_id: number | null;
  group_id: number | null;
  round_id: number | null;
  standing_rule_id: number | null;
  position: number;
  result: string | null;
  points: number;
  participant: SportMonksParticipant;
  form?: SportMonksStandingForm[] | null;
}

export interface SportMonksStandingForm {
  id: number;
  standing_type: number;
  standing_id: number;
  fixture_id: number;
  form: "W" | "D" | "L";
  sort_order: number;
}

export interface SportMonksTeamStatistics {
  id: number;
  model_id: number;
  type_id: number;
  relation_id: number | null;
  value: Record<string, any>;
  type: string;
}

export interface SportMonksTeam {
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

  country?: SportMonksCountry;
  venue?: SportMonksVenue;
  coaches?: SportMonksCoach[];
  statistics?: SportMonksTeamStatistics[];
  activeseasons?: SportMonksSeason[];
}

export interface SportMonksPlayer {
  id: number;
  name: string;
  image_path: string | null;
  date_of_birth: string | null;
  height: number | null;
  weight: number | null;
  preferred_foot: string | null;

  nationality?: {
    id: number;
    name: string;
    image_path: string | null;
  };

  position?: {
    id: number;
    name: string;
  };

  teams?: {
    id: number;
    team: {
      id: number;
      name: string;
      image_path: string | null;
    };
  }[];
}

export interface SportMonksPlayerSeasonStatistic {
  id: number;
  player_id: number;
  team_id: number | null;
  season_id: number;
  has_values: boolean;
  position_id: number | null;
  jersey_number: number | null;

  season?: {
    id: number;
    name: string;
  };

  team?: {
    id: number;
    name: string;
    image_path: string | null;
  };

  position?: {
    id: number;
    name: string;
  };

  details: SportMonksPlayerSeasonStatisticDetail[];
}

export interface SportMonksPlayerSeasonStatisticDetail {
  id: number;
  player_statistic_id: number;
  type_id: number;
  value: Record<string, number | null>;
}

export interface SportMonksSquadMember {
  player: {
    id: number;
    name: string;
    image_path: string | null;

    country?: {
      id: number;
      name: string;
    };
  };

  team_id: number;
  player_id: number;

  position_id?: number;
  position?: {
    id: number;
    name: string;
  };

  detailedposition?: {
    id: number;
    name: string;
  };

  jersey_number?: number;

  start?: string;
  end?: string;
}
