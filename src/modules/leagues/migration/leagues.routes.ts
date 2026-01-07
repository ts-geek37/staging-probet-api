import { handler } from "@/utils";
import { Router } from "express";
import { LeaguesController } from "./leagues.controller";
import { LeaguesService } from "./leagues.service";
import {
  getLeagueProfileFromDb,
  getLeaguesFromDb,
} from "./leagues.db.repository";
import { mockLeaguesRepository } from "./leagues.mock.repository";

const router = Router();

const dbRepo = {
  getLeagues: getLeaguesFromDb,
  getLeagueProfile: getLeagueProfileFromDb,
};

const leaguesRepo = mockLeaguesRepository;
// const leaguesRepo = LeaguesSportMonksRepository(dbRepo);

const leaguesService = new LeaguesService(leaguesRepo);
const controller = new LeaguesController(leaguesService);

router.get("/", handler(controller.getLeagues));
router.get("/:id/profile", handler(controller.getLeagueProfile));
router.get("/:id/standings", handler(controller.getLeagueStandings));
router.get("/:id/stats", handler(controller.getLeagueStatistics));
router.get("/:id/matches", handler(controller.getLeagueMatches));

export default router;
