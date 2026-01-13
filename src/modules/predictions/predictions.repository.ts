import { FixtureValueBetsResponse, RawPrediction } from "./predictions.types";

export interface PredictionsRepository {
  getPredictionsByMatches: (fixtureId: number) => Promise<RawPrediction[]>;
  getValueBetsByMatches: (
    fixtureId: number
  ) => Promise<FixtureValueBetsResponse>;
}
