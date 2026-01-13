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
  statistics?: SportMonksTeamStatistics[];
  meta?: {
    location?: "home" | "away";
  };
}

export interface SportMonksLeague {
  id: number;
  sport_id: number;
  country_id: number | null;
  country: SportMonksCountry | null;
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
  currentseason?: SportMonksSeason;
}

export interface SportMonksStage {
  id: number;
  sport_id: number;
  league_id: number;
  season_id: number;
  type_id: number;

  name: string;
  sort_order: number;

  finished: boolean;
  pending: boolean;
  is_current: boolean;

  starting_at: string;
  ending_at: string;
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
  stages?: SportMonksStage[];
  currentstage?: SportMonksStage;
  league?: SportMonksLeague;
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
  weatherreport?: SportMonksWeatherReport;
  league?: SportMonksLeague;
  season?: SportMonksSeason;
  venue?: SportMonksVenue;

  participants: SportMonksParticipant[];
  scores?: SportMonksFixtureScore[];
  statistics?: SportMonksFixtureStatistic[];
  events?: SportMonksEvent[];
  lineups?: SportMonksLineup[];
  comments?: SportMonksFixtureComment[];
}

export interface SportMonksStandingDetail {
  id: number;
  standing_id: number;
  type_id: number;
  value: number;
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
  details?: SportMonksStandingDetail[];
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
  season_id: number;
  value: Record<string, any>;
  type: string;
  teams: SportMonksParticipant[]
  details?: SportMonksStandingDetail[]
}

export interface SportMonksCoach {
  id: number;
  team_id: number;
  coach_id: number;
  position_id: number;
  active: boolean;
  start: string;
  end: string | null;
  temporary: boolean;
  coach: CoachProfile;
}

export interface CoachProfile {
  id: number;
  player_id: number;
  sport_id: number;
  country_id: number;
  nationality_id: number;
  city_id: number | null;
  common_name: string;
  firstname: string;
  lastname: string;
  name: string;
  display_name: string;
  image_path: string;
  height: number | null;
  weight: number | null;
  date_of_birth: string;
  gender: "male" | "female";
}

export interface SocialChannel {
  id: number;
  name: string;
  base_url: string;
  hex_color: string;
}

export interface SportMonksSocial {
  id: number;
  social_id: number;
  social_channel_id: number;
  value: string;
  channel?: SocialChannel;
}

export interface SportMonksRanking {
  id: number;
  position: number;
  participant_id: number;
  points: number;
  sport_id: number;
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
  rivals?: SportMonksTeam[];
  socials?: SportMonksSocial[];
  rankings?: SportMonksRanking[];
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

  country?: {
    id: number;
    name: string;
  };
  trophies?: SportMonksPlayerTrophy[];
  city?: {
    id: number;
    name: string;
  };

  position?: {
    id: number;
    name: string;
  };

  detailedPosition?: {
    id: number;
    name: string;
  };

  metadata?: {
    shirt_number?: number | null;
    market_value?: number | null;
    contract_until?: string | null;
    is_active?: boolean;
    is_captain?: boolean;
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

  season?: SportMonksSeason;

  team?: SportMonksTeam;

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

export interface SportMonksTopScorer {
  id: number;
  season_id: number;
  player_id: number;
  participant_id: number;
  type_id: number;
  position: number;
  total: number;

  player?: {
    id: number;
    display_name: string;
    name: string;
    image_path: string | null;
    position_id: number | null;
  };

  participant?: {
    id: number;
    name: string;
    image_path: string | null;
  };

  type?: {
    id: number;
    name: string;
    code: string;
    developer_name: string;
    stat_group: string | null;
  };
}

export interface SportMonksTeamTransfer {
  id: number;
  sport_id: number;
  player_id: number;
  type_id: number;
  from_team_id: number;
  to_team_id: number;
  position_id: number;
  detailed_position_id: number | null;
  date: string;
  career_ended: boolean;
  completed: boolean;
  amount: number | null;
  type: SportMonksTransferType;
  toteam: SportMonksTeam;
  fromteam: SportMonksTeam;
  player: SportMonksPlayer;
}

export interface SportMonksTransferType {
  id: number;
  name: string;
  code: string;
  developer_name: string;
  model_type: string;
  stat_group: string | null;
}

export interface SportMonksTeamSeasonStatistic {
  id: number;
  team_id: number;
  season_id: number;
  has_values: boolean;

  season?: SportMonksSeason;

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

export interface SportMonksPlayerTrophy {
  id: number;
  participant_id: number;
  team_id: number;
  league_id: number;
  season_id: number;
  trophy_id: number;

  trophy: SportMonksTrophy;
  team: SportMonksTeam;
}

export interface SportMonksTrophy {
  id: number;
  sport_id: number;
  position: number;
  name: string;
}

export interface SportMonksFixtureComment {
  id: number;
  fixture_id: number;
  comment: string;
  minute: number;
  extra_minute: number | null;
  is_goal: boolean;
  is_important: boolean;
  order: number;
}

export interface SportMonksWeatherReport {
  id: number;
  fixture_id: number;
  venue_id: number;

  temperature: SportMonksTemperature;
  feels_like: SportMonksTemperature;

  wind: SportMonksWind;

  humidity: string;
  pressure: number;
  clouds: string;

  description: string;
  icon: string;

  type: "actual" | "forecast";
  metric: "celcius" | "fahrenheit";

  current: SportMonksCurrentWeather;
}

export interface SportMonksTemperature {
  day: number;
  morning: number;
  evening: number;
  night: number;
}

export interface SportMonksWind {
  speed: number;
  direction: number;
}

export interface SportMonksCurrentWeather {
  temp: number;
  wind: number;
  clouds: number | null;
  humidity: string;
  pressure: number;
  direction: number;
  feels_like: number;
  description: string;
}
