// sportmonks.players.types.ts

export interface SportMonksPlayer {
  id: number
  name: string
  image_path: string | null
  date_of_birth: string | null
  height: number | null
  weight: number | null
  preferred_foot: string | null

  nationality?: {
    id: number
    name: string
    image_path: string | null
  }

  position?: {
    id: number
    name: string
  }

  teams?: {
    id: number
    name: string
    image_path: string | null
    activeSeasons?: {
      id: number
      name: string
      is_current: boolean
    }[]
  }[]
}

export interface SportMonksPlayerSeasonStatistic {
  id: number;
  player_id: number;
  team_id: number;
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
  value: Record<string, any>;
}

export interface SportMonksFixture {
  id: number
  starting_at: string
  state_id: number

  league: {
    id: number
    name: string
    image_path: string | null
  }

  participants: {
    id: number
    name: string
    image_path: string | null
    meta?: {
      location?: "home" | "away"
    }
  }[]

  scores?: {
    participant_id: number
    description: string
    score: {
      goals: number | null
    }
  }[]

  statistics?: {
    participant_id: number
    type: {
      code: string
    }
    value: number | null
  }[]
}
