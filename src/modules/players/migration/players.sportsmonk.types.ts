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
      name: string;
      image_path: string | null;
      activeSeasons?: {
        id: number;
        name: string;
        is_current: boolean;
      };
    };
  }[];
}

export interface SportMonksPlayerStatistic {
  id: number;
  player_id: number;
  season_id: number;
  value: number | null;
  type: {
    id: number;
    name: string;
    code: string;
  };
}

export interface SportMonksFixture {
  id: number;
  starting_at: string;
  state_id: number;

  league: {
    id: number;
    name: string;
    image_path: string | null;
  };

  participants: {
    id: number;
    name: string;
    image_path: string | null;
    meta?: {
      location?: "home" | "away";
    };
  }[];

  scores?: {
    participant_id: number;
    description: string;
    score: {
      goals: number | null;
    };
  }[];

  statistics?: {
    participant_id: number;
    type: {
      code: string;
    };
    value: number | null;
    type_id: number;
  }[];
}
export interface SportMonksSeasonStatistic {
  id: number;
  player_id: number;
  team_id: number | null;
  season_id: number;
  has_values: boolean;
  jersey_number: number | null;
  position_id: number | null;

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

  details: SportMonksSeasonStatisticDetail[];
}

export interface SportMonksSeasonStatisticDetail {
  id: number;
  player_statistic_id: number;
  type_id: number;
  value: Record<string, number | null>;
}
