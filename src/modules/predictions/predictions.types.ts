export interface PredictionType {
  id: number;
  name: PredictionMarketType;
  developer_name: string;
}
export enum PredictionMarketType {
  VALUE_BET = "Valuebet",

  BOTH_TEAMS_TO_SCORE = "Both Teams To Score Probability",
  HALF_TIME_FULL_TIME = "Half Time/Full Time Probability",
  FIRST_HALF_WINNER = "First Half Winner Probability",

  FULLTIME_RESULT = "Fulltime Result Probability",
  DOUBLE_CHANCE = "Double Chance Probability",
  TEAM_TO_SCORE_FIRST = "Team To Score First Probability",

  OVER_UNDER_1_5 = "Over/Under 1.5 Probability",
  OVER_UNDER_2_5 = "Over/Under 2.5 Probability",
  OVER_UNDER_3_5 = "Over/Under 3.5 Probability",
  OVER_UNDER_4_5 = "Over/Under 4.5 Probability",

  HOME_OVER_UNDER_0_5 = "Home Over/Under 0.5 Probability",
  HOME_OVER_UNDER_1_5 = "Home Over/Under 1.5 Probability",
  HOME_OVER_UNDER_2_5 = "Home Over/Under 2.5 Probability",
  HOME_OVER_UNDER_3_5 = "Home Over/Under 3.5 Probability",

  AWAY_OVER_UNDER_0_5 = "Away Over/Under 0.5 Probability",
  AWAY_OVER_UNDER_1_5 = "Away Over/Under 1.5 Probability",
  AWAY_OVER_UNDER_2_5 = "Away Over/Under 2.5 Probability",
  AWAY_OVER_UNDER_3_5 = "Away Over/Under 3.5 Probability",

  CORRECT_SCORE = "Correct Score Probability",

  CORNERS_OVER_UNDER_4 = "Corners Over/Under 4 Probability",
  CORNERS_OVER_UNDER_5 = "Corners Over/Under 5 Probability",
  CORNERS_OVER_UNDER_6 = "Corners Over/Under 6 Probability",
  CORNERS_OVER_UNDER_7 = "Corners Over/Under 7 Probability",
  CORNERS_OVER_UNDER_8 = "Corners Over/Under 8 Probability",
  CORNERS_OVER_UNDER_9 = "Corners Over/Under 9 Probability",
  CORNERS_OVER_UNDER_10 = "Corners Over/Under 10 Probability",
  CORNERS_OVER_UNDER_10_5 = "Corners Over/Under 10.5 Probability",
  CORNERS_OVER_UNDER_11 = "Corners Over/Under 11 Probability",
}

export type YesNoPrediction = {
  yes: number;
  no: number;
};

export type OverUnderPrediction = {
  over: number;
  under: number;
};

export type FullTimeResultPrediction = {
  home: number;
  draw: number;
  away: number;
};

export type CorrectScorePrediction = {
  scores: {
    score: string;
    probability: number;
  }[];
};

export type PredictionMarket =
  | { type: PredictionMarketType.BOTH_TEAMS_TO_SCORE; data: YesNoPrediction }
  | {
      type: PredictionMarketType.FIRST_HALF_WINNER;
      data: FullTimeResultPrediction;
    }
  | {
      type: PredictionMarketType.FULLTIME_RESULT;
      data: FullTimeResultPrediction;
    }
  | { type: PredictionMarketType.DOUBLE_CHANCE; data: FullTimeResultPrediction }
  | {
      type: PredictionMarketType.TEAM_TO_SCORE_FIRST;
      data: FullTimeResultPrediction;
    }
  | { type: PredictionMarketType.OVER_UNDER_1_5; data: OverUnderPrediction }
  | { type: PredictionMarketType.OVER_UNDER_2_5; data: OverUnderPrediction }
  | { type: PredictionMarketType.OVER_UNDER_3_5; data: OverUnderPrediction }
  | { type: PredictionMarketType.OVER_UNDER_4_5; data: OverUnderPrediction }
  | {
      type: PredictionMarketType.HOME_OVER_UNDER_0_5;
      data: OverUnderPrediction;
    }
  | {
      type: PredictionMarketType.HOME_OVER_UNDER_1_5;
      data: OverUnderPrediction;
    }
  | {
      type: PredictionMarketType.HOME_OVER_UNDER_2_5;
      data: OverUnderPrediction;
    }
  | {
      type: PredictionMarketType.HOME_OVER_UNDER_3_5;
      data: OverUnderPrediction;
    }
  | {
      type: PredictionMarketType.AWAY_OVER_UNDER_0_5;
      data: OverUnderPrediction;
    }
  | {
      type: PredictionMarketType.AWAY_OVER_UNDER_1_5;
      data: OverUnderPrediction;
    }
  | {
      type: PredictionMarketType.AWAY_OVER_UNDER_2_5;
      data: OverUnderPrediction;
    }
  | {
      type: PredictionMarketType.AWAY_OVER_UNDER_3_5;
      data: OverUnderPrediction;
    }
  | { type: PredictionMarketType.CORRECT_SCORE; data: CorrectScorePrediction };

export type FixturePredictionsResponse = {
  fixture_id: number;
  predictable: boolean;
  markets: PredictionMarket[];
};

export type ValueBet = {
  market: string;
  bet: string;
  bookmaker: string;
  odd: number;
  fair_odd: number;
  stake: number;
  is_value: boolean;
};

export type FixtureValueBetsResponse = {
  fixture_id: number;
  bets: ValueBet[];
};

export type RawPrediction = {
  id: number;
  fixture_id: number;
  type_id: number;
  predictions: Record<string, any>;
};
