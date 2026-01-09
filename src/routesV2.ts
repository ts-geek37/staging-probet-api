import { Router } from "express";

import { clerkMiddleware, privateAuth, publicAuth } from "./middlewares";
import { billingPricesRoutes, billingRoutes } from "./modules/billing";
import { homeRoutes } from "./modules/home";
import { leaguesRoutes } from "./modules/leagues/migration";
import { matchesRoutes } from "./modules/matches/migration";
import { playersRoutes } from "./modules/players/migration";
import { teamsRoutes } from "./modules/teams/migration";

const routesV2 = Router();

routesV2.use("/home", publicAuth, homeRoutes);
routesV2.use("/leagues", publicAuth, leaguesRoutes);
routesV2.use("/matches", publicAuth, matchesRoutes);
routesV2.use("/players", publicAuth, playersRoutes);
routesV2.use("/teams", publicAuth, teamsRoutes);
routesV2.use("/prices", publicAuth, billingPricesRoutes);
routesV2.use("/billing", clerkMiddleware, privateAuth(), billingRoutes);

export default routesV2;
