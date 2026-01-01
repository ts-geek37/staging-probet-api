import { Router } from "express";
import { handler } from "../../utils";
import { PlayersController } from "./players.controller";
import { PlayersService } from "./players.service";
import { PlayersMockRepository } from "./repositories/players.mock.repository";

const router = Router();

const repo = new PlayersMockRepository();
const service = new PlayersService(repo);
const controller = new PlayersController(service);

router.get("/", handler(controller.getPlayers));
router.get("/:id", handler(controller.getPlayer));

export default router;
