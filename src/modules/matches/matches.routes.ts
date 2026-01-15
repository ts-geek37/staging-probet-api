import { handler } from "../../utils";
import { Router } from "express";
import { MatchesController } from "./matches.controller";
import { MatchesService } from "./matches.service";
import { MatchesSportMonksRepository } from "./matches.sportmonks.repository";
import { mockMatchesRepository } from "./matches.mock.repository";

const router = Router();

const repo = mockMatchesRepository;
// const repo = MatchesSportMonksRepository();
const service = new MatchesService(repo);
const controller = new MatchesController(service);

router.get("/", handler(controller.getMatches));
router.get("/head-to-head", handler(controller.getHeadToHeadMatches));
router.get("/:id", handler(controller.getMatch));
router.get("/:id/stats", handler(controller.getMatchStats));
router.get("/:id/lineups", handler(controller.getMatchLineups));
router.get("/:id/events", handler(controller.getMatchEvents));
router.get("/:id/comments", handler(controller.getMatchComments));
router.get(
  "/:id/team-stats/:seasonId",
  handler(controller.getMatchesTeamStats)
);

export default router;
