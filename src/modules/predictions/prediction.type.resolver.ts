import { PredictionMarketType, PredictionType } from "./predictions.types";

export const PREDICTION_TYPES: PredictionType[] = [
  { id: 33, name: PredictionMarketType.VALUE_BET, developer_name: "VALUEBET" },

  {
    id: 231,
    name: PredictionMarketType.BOTH_TEAMS_TO_SCORE,
    developer_name: "BTTS_PROBABILITY",
  },
  {
    id: 232,
    name: PredictionMarketType.HALF_TIME_FULL_TIME,
    developer_name: "HTFT_PROBABILITY",
  },
  {
    id: 233,
    name: PredictionMarketType.FIRST_HALF_WINNER,
    developer_name: "FIRST_HALF_WINNER_PROBABILITY",
  },
  {
    id: 234,
    name: PredictionMarketType.OVER_UNDER_1_5,
    developer_name: "OVER_UNDER_1_5_PROBABILITY",
  },
  {
    id: 235,
    name: PredictionMarketType.OVER_UNDER_2_5,
    developer_name: "OVER_UNDER_2_5_PROBABILITY",
  },
  {
    id: 236,
    name: PredictionMarketType.OVER_UNDER_3_5,
    developer_name: "OVER_UNDER_3_5_PROBABILITY",
  },
  {
    id: 237,
    name: PredictionMarketType.FULLTIME_RESULT,
    developer_name: "FULLTIME_RESULT_PROBABILITY",
  },
  {
    id: 238,
    name: PredictionMarketType.TEAM_TO_SCORE_FIRST,
    developer_name: "TEAM_TO_SCORE_FIRST_PROBABILITY",
  },
  {
    id: 239,
    name: PredictionMarketType.DOUBLE_CHANCE,
    developer_name: "DOUBLE_CHANCE_PROBABILITY",
  },
  {
    id: 240,
    name: PredictionMarketType.CORRECT_SCORE,
    developer_name: "CORRECT_SCORE_PROBABILITY",
  },

  {
    id: 326,
    name: PredictionMarketType.HOME_OVER_UNDER_3_5,
    developer_name: "HOME_OVER_UNDER_3_5_PROBABILITY",
  },
  {
    id: 327,
    name: PredictionMarketType.AWAY_OVER_UNDER_3_5,
    developer_name: "AWAY_OVER_UNDER_3_5_PROBABILITY",
  },
  {
    id: 328,
    name: PredictionMarketType.AWAY_OVER_UNDER_2_5,
    developer_name: "AWAY_OVER_UNDER_2_5_PROBABILITY",
  },
  {
    id: 330,
    name: PredictionMarketType.HOME_OVER_UNDER_2_5,
    developer_name: "HOME_OVER_UNDER_2_5_PROBABILITY",
  },
  {
    id: 331,
    name: PredictionMarketType.HOME_OVER_UNDER_1_5,
    developer_name: "HOME_OVER_UNDER_1_5_PROBABILITY",
  },
  {
    id: 332,
    name: PredictionMarketType.AWAY_OVER_UNDER_1_5,
    developer_name: "AWAY_OVER_UNDER_1_5_PROBABILITY",
  },
  {
    id: 333,
    name: PredictionMarketType.AWAY_OVER_UNDER_0_5,
    developer_name: "AWAY_OVER_UNDER_0_5_PROBABILITY",
  },
  {
    id: 334,
    name: PredictionMarketType.HOME_OVER_UNDER_0_5,
    developer_name: "HOME_OVER_UNDER_0_5_PROBABILITY",
  },

  {
    id: 1585,
    name: PredictionMarketType.CORNERS_OVER_UNDER_10_5,
    developer_name: "CORNERS_OVER_UNDER_10_5_PROBABILITY",
  },
  {
    id: 1683,
    name: PredictionMarketType.CORNERS_OVER_UNDER_5,
    developer_name: "CORNERS_OVER_UNDER_5_PROBABILITY",
  },
  {
    id: 1684,
    name: PredictionMarketType.CORNERS_OVER_UNDER_11,
    developer_name: "CORNERS_OVER_UNDER_11_PROBABILITY",
  },
  {
    id: 1685,
    name: PredictionMarketType.CORNERS_OVER_UNDER_6,
    developer_name: "CORNERS_OVER_UNDER_6_PROBABILITY",
  },
  {
    id: 1686,
    name: PredictionMarketType.CORNERS_OVER_UNDER_7,
    developer_name: "CORNERS_OVER_UNDER_7_PROBABILITY",
  },
  {
    id: 1687,
    name: PredictionMarketType.CORNERS_OVER_UNDER_9,
    developer_name: "CORNERS_OVER_UNDER_9_PROBABILITY",
  },
  {
    id: 1688,
    name: PredictionMarketType.CORNERS_OVER_UNDER_10,
    developer_name: "CORNERS_OVER_UNDER_10_PROBABILITY",
  },
  {
    id: 1689,
    name: PredictionMarketType.CORNERS_OVER_UNDER_8,
    developer_name: "CORNERS_OVER_UNDER_8_PROBABILITY",
  },
  {
    id: 1690,
    name: PredictionMarketType.CORNERS_OVER_UNDER_4,
    developer_name: "CORNERS_OVER_UNDER_4_PROBABILITY",
  },
];

export const PredictionTypesResolver = () => {
  const map = new Map<number, PredictionMarketType>(
    PREDICTION_TYPES.map((t) => [t.id, t.name])
  );

  const resolve = (typeId: number): PredictionMarketType | null =>
    map.get(typeId) ?? null;

  return { resolve };
};
