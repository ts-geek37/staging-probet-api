import { success } from "../../utils";
import { Request } from "express";
import { PredictionsService } from "./predictions.service";

export const PredictionsController = (
  service: ReturnType<typeof PredictionsService>
) => {
  const getFixturePredictions = async (req: Request) => {
    const fixtureId = Number(req.params.fixtureId);

    const data = await service.getProbabilities(fixtureId);
    return success(data);
  };

  const getFixtureValueBets = async (req: Request) => {
    const fixtureId = Number(req.params.fixtureId);

    const data = await service.getValueBets(fixtureId);
    return success(data);
  };

  const getPredictableMatches = async (req: Request) => {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 20);

    const data = await service.getPredictableMatches(page, limit);
    return success(data);
  };

  return { getFixturePredictions, getFixtureValueBets, getPredictableMatches };
};
