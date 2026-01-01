import { Router } from "express";
import { handler } from "../../utils";
import { TeamsController } from "./teams.controller";
import { TeamsService } from "./teams.service";
import { TeamsMockRepository } from "./repositories/teams.mock.repository";

const router = Router();

const repo = new TeamsMockRepository();
const service = new TeamsService(repo);
const controller = new TeamsController(service);

router.get("/", handler(controller.getTeams));
router.get("/:id", handler(controller.getTeam));

export default router;
