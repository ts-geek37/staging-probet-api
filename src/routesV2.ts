import { Router } from "express";

import { publicAuth } from "./middlewares";
import { leaguesRoutes } from "./modules/leagues/migration";
import { teamsRoutes } from "./modules/teams/migration";

const routesV2 = Router();

// routesV2.use("/home", homeRoutes);
routesV2.use("/leagues", publicAuth, leaguesRoutes);
// routesV2.use("/matches", matchesRoutes);
// routesV2.use("/players", playersRoutes);
routesV2.use("/teams", publicAuth, teamsRoutes);

export default routesV2;
