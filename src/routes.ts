import { Router } from "express";

import { publicAuth } from "./middlewares";
import { homeRoutes } from "./modules/home";
import { leaguesRoutes } from "./modules/leagues";

const router = Router();

router.use("/home", publicAuth, homeRoutes);
router.use("/leagues", publicAuth, leaguesRoutes);

export default router;
