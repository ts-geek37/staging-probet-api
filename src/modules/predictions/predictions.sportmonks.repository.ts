import {
    SportMonksClient,
    SportMonksResponse,
} from "@/integrations/sportmonks";
import { PredictionsRepository } from "./predictions.repository";
import { FixtureValueBetsResponse, RawPrediction } from "./predictions.types";

export const PredictionsSportMonksRepository = (): PredictionsRepository => {
  const client = new SportMonksClient();

  const getPredictionsByMatches = async (
    fixtureId: number
  ): Promise<RawPrediction[]> => {
    const res = await client.get<SportMonksResponse<RawPrediction[]>>(
      `/football/predictions/probabilities/fixtures/${fixtureId}`
    );

    return res.data ?? [];
  };

  const getValueBetsByMatches = async (
    fixtureId: number
  ): Promise<FixtureValueBetsResponse> => {
    const res = await client.get<
      SportMonksResponse<
        {
          id: number;
          fixture_id: number;
          predictions: any;
          type_id: number;
        }[]
      >
    >(`/football/predictions/value-bets/fixtures/${fixtureId}`);

    const bets =
      res.data?.map((r) => ({
        market: "Valuebet",
        bet: r.predictions.bet,
        bookmaker: r.predictions.bookmaker,
        odd: r.predictions.odd,
        fair_odd: r.predictions.fair_odd,
        stake: r.predictions.stake,
        is_value: r.predictions.is_value,
      })) ?? [];

    return { fixture_id: fixtureId, bets };
  };

  return { getPredictionsByMatches, getValueBetsByMatches };
};
