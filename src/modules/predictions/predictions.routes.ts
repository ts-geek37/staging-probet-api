import { handler } from "../../utils";
import { Router } from "express";
import { mockMatchesRepository } from "../matches/matches.mock.repository";
import { PredictionTypesResolver } from "./prediction.type.resolver";
import { PredictionsController } from "./predictions.controller";
import { PredictionsMockRepository } from "./predictions.mock.repository";
import { PredictionsService } from "./predictions.service";

const PredictionsRoutes = () => {
  const router = Router();

  //   const repo = PredictionsSportMonksRepository();
  //   const matchesRepo = MatchesSportMonksRepository();
  const repo = PredictionsMockRepository();
  const matchesRepo = mockMatchesRepository;
  const resolver = PredictionTypesResolver();
  const service = PredictionsService(repo, matchesRepo, resolver);
  const controller = PredictionsController(service);

  router.get("/matches", handler(controller.getPredictableMatches));
  router.get("/matches/:fixtureId", handler(controller.getFixturePredictions));

  router.get(
    "/matches/:fixtureId/value-bets",
    handler(controller.getFixtureValueBets)
  );

  return router;
};

const predictionsRoutes = PredictionsRoutes();
export default predictionsRoutes;
