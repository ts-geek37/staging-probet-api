import { SportMonksLeague } from "./league";

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
  league?: SportMonksLeague;
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

  participants: SportMonksFixtureParticipant[];
  scores?: SportMonksFixtureScore[];

  meta?: Record<string, unknown>;
}

export interface SportMonksFixtureScore {
  id: number;
  fixture_id: number;
  type_id: number;
  participant_id: number;
  description: string;
  score: {
    goals: number;
  };
}

export interface SportMonksFixtureParticipant {
  id: number;
  sport_id: number;
  country_id: number;
  venue_id: number | null;
  gender: "male" | "female";
  name: string;
  short_code: string | null;
  image_path: string | null;
  founded: number | null;
  type: string;
  placeholder: boolean;
  last_played_at: string | null;
  meta?: Record<string, unknown>;
}
