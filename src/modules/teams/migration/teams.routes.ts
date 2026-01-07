import { Router } from "express";
import { handler } from "@/utils";
import { getTeamProfileFromDb, getTeamsFromDb } from "./teams.db.repository";
import { mockTeamsRepository } from "./teams.mock.repository";
import { TeamsController } from "./teams.controller";
import { TeamsService } from "./teams.service";

const router = Router();

const dbRepo = {
  getTeams: getTeamsFromDb,
  getTeamProfile: getTeamProfileFromDb,
};

const teamsRepo = mockTeamsRepository;
// const teamsRepo = TeamsSportMonksRepository(dbRepo);

const teamsService = new TeamsService(teamsRepo);
const controller = new TeamsController(teamsService);

router.get("/", handler(controller.getTeams));
router.get("/:id", handler(controller.getTeamProfile));
router.get("/:id/players", handler(controller.getTeamPlayers));
router.get("/:id/matches", handler(controller.getTeamMatches));
router.get("/:id/stats", handler(controller.getTeamStats));

export default router;
