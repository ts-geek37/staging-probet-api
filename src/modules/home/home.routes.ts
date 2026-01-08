import { Router } from "express";
import { handler } from "../../utils";
import { HomeController } from "./home.controller";
import { HomeService } from "./home.service";
import { HomeSportMonksRepository } from "./home.sportmonks.repository";
import { mockHomeRepository } from "./home.mock.repository";

const router = Router();

// const repo = HomeSportMonksRepository()
const repo = mockHomeRepository
const homeService = new HomeService(repo);
const controller = new HomeController(homeService);

router.get("/", handler(controller.getHome));

export default router;
