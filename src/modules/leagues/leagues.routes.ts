import { Router } from "express";

import { publicAuth } from "../../middlewares";
import { handler } from "../../utils";
import { LeaguesController } from "./leagues.controller";
import { LeaguesService } from "./leagues.service";
import { LeaguesMockRepository } from "./repositories/leagues.mock.repository";

const router = Router();

const repo = new LeaguesMockRepository();
const service = new LeaguesService(repo);
const controller = new LeaguesController(service);

router.get("/", publicAuth, handler(controller.getLeagues));
router.get("/:id", publicAuth, handler(controller.getLeague));

export default router;
