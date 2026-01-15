import { Router } from "express";
import { getLiveMatchesController } from "./live.controller";

const router = Router();

router.get("/matches/live", async (_req, res) => {
  const response = await getLiveMatchesController();
  res.json(response);
});

export default router;
