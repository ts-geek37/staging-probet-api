import { PredictionsRepository } from "./predictions.repository";
import { FixtureValueBetsResponse, RawPrediction } from "./predictions.types";

export const PredictionsMockRepository = (): PredictionsRepository => {
  const rand = (min: number, max: number) =>
    Number((Math.random() * (max - min) + min).toFixed(2));

  const randomYesNo = () => ({
    Yes: rand(40, 60),
    No: rand(40, 60),
  });

  const random1X2 = () => ({
    "1": rand(30, 55),
    X: rand(15, 30),
    "2": rand(20, 45),
  });

  const randomOverUnder = () => ({
    Over: rand(40, 65),
    Under: rand(35, 60),
  });

  const randomCorrectScore = () => ({
    "0-0": rand(2, 6),
    "1-0": rand(5, 12),
    "1-1": rand(6, 14),
    "2-0": rand(4, 10),
    "2-1": rand(6, 12),
    "2-2": rand(4, 8),
    "3-1": rand(3, 7),
    Other_1: rand(5, 10),
    Other_X: rand(3, 6),
    Other_2: rand(4, 9),
  });

  const getPredictionsByMatches = async (
    fixtureId: number
  ): Promise<RawPrediction[]> => {
    return [
      {
        id: fixtureId * 10 + 1,
        fixture_id: fixtureId,
        type_id: 231,
        predictions: randomYesNo(),
      },
      {
        id: fixtureId * 10 + 2,
        fixture_id: fixtureId,
        type_id: 237,
        predictions: random1X2(),
      },
      {
        id: fixtureId * 10 + 3,
        fixture_id: fixtureId,
        type_id: 234,
        predictions: randomOverUnder(),
      },
      {
        id: fixtureId * 10 + 4,
        fixture_id: fixtureId,
        type_id: 235,
        predictions: randomOverUnder(),
      },
      {
        id: fixtureId * 10 + 5,
        fixture_id: fixtureId,
        type_id: 240,
        predictions: randomCorrectScore(),
      },
    ];
  };

  const getValueBetsByMatches = async (
    fixtureId: number
  ): Promise<FixtureValueBetsResponse> => {
    const count = Math.floor(Math.random() * 3) + 1;

    const bets = Array.from({ length: count }).map((_, i) => ({
      market: "Valuebet",
      bet: Math.random() > 0.5 ? "1" : "2",
      bookmaker: ["bet365", "williamhill", "betfair"][i % 3],
      odd: rand(1.5, 4.2),
      fair_odd: rand(1.4, 4.0),
      stake: rand(0.5, 2.5),
      is_value: Math.random() > 0.5,
    }));

    return {
      fixture_id: fixtureId,
      bets,
    };
  };

  return {
    getPredictionsByMatches,
    getValueBetsByMatches,
  };
};
