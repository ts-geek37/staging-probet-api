import { Router } from "express";
import { handler } from "@/utils";
import { PlayersController } from "./players.controller";
import { PlayersService } from "./players.service";
import { PlayersSportMonksRepository } from "./players.sportmonks.repository";
import { mockPlayersRepository } from "./players.mock.repository";

const router = Router();

// const repo = PlayersSportMonksRepository();
const repo = mockPlayersRepository;
const service = new PlayersService(repo);
const controller = new PlayersController(service);

router.get("/:id/profile", handler(controller.getPlayerProfile));
router.get("/:id/stats", handler(controller.getPlayerStats));
router.get("/:id/matches", handler(controller.getPlayerMatches));

export default router;
