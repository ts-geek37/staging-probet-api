import { Router } from "express";
import { publicAuth } from "../../middlewares";
import { handler } from "../../utils";
import { HomeController } from "./home.controller";
import { HomeService } from "./home.service";
import { HomeMockRepository } from "./repositories/home.mock.repository";

const router = Router();

const repo = new HomeMockRepository();
const service = new HomeService(repo);
const controller = new HomeController(service);

router.get("/", publicAuth, handler(controller.getHome));

export default router;
