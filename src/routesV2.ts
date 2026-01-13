import { Router } from "express";

import { publicAuth } from "./middlewares";
import { authGuard } from "./middlewares/authGaurd";
import { billingPricesRoutes, billingRoutes } from "./modules/billing";
import { homeRoutes } from "./modules/home";
import { leaguesRoutes } from "./modules/leagues";
import { matchesRoutes } from "./modules/matches/migration";
import { playersRoutes } from "./modules/players";
import { predictionsRoutes } from "./modules/predictions";
import { teamsRoutes } from "./modules/teams";

const routesV2 = Router();

routesV2.use("/home", publicAuth, homeRoutes);
routesV2.use("/leagues", publicAuth, leaguesRoutes);
routesV2.use("/matches", publicAuth, matchesRoutes);
routesV2.use("/players", publicAuth, playersRoutes);
routesV2.use("/teams", publicAuth, teamsRoutes);
routesV2.use("/prices", publicAuth, billingPricesRoutes);
routesV2.use("/predictions", publicAuth, predictionsRoutes);
routesV2.use("/billing", authGuard({ attachUser: true }), billingRoutes);

export default routesV2;
