import { Router } from "express";

import { publicAuth } from "./middlewares";
import { homeRoutes } from "./modules/home";
import { leaguesRoutes } from "./modules/leagues";
import { matchesRoutes } from "./modules/matches";
import { playersRoutes } from "./modules/players";
import { teamsRoutes } from "./modules/teams";

const router = Router();

router.use("/home", publicAuth, homeRoutes);
router.use("/leagues", publicAuth, leaguesRoutes);
router.use("/matches", publicAuth, matchesRoutes);
router.use("/players", publicAuth, playersRoutes);
router.use("/teams", publicAuth, teamsRoutes);

export default router;
