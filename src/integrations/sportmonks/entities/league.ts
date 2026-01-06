import { SportMonksSeason } from "./season";

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
  seasons?: SportMonksSeason[];
}
