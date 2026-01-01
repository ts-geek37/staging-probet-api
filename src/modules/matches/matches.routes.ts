import { Router } from "express";

import { publicAuth } from "../../middlewares";
import { handler } from "../../utils";
import { MatchesController } from "./matches.controller";
import { MatchesService } from "./matches.service";
import { MatchesMockRepository } from "./repositories/matches.mock.repository";

const router = Router();

const repo = new MatchesMockRepository();
const service = new MatchesService(repo);
const controller = new MatchesController(service);

router.get("/", publicAuth, handler(controller.getMatches));
router.get("/:id", publicAuth, handler(controller.getMatch));

export default router;
