export interface SportMonksStanding {
   id: number
  participant_id: number
  league_id: number
  season_id: number
  stage_id: number | null
  group_id: number | null
  round_id: number | null
  standing_rule_id: number | null
  position: number
  result: string | null
  points: number
  form: SportMonksStandingForm[] | null; 
  participant: SportMonksParticipant;
}

export interface SportMonksStandingForm {
  id: number;
  standing_type: number;
  standing_id: number;
  fixture_id: number;
  form: "W" | "D" | "L";
  sort_order: number;
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
}
