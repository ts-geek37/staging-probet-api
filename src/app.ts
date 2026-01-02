import express from "express";

import { installCORS } from "./middlewares";
import router from "./routes";
import webhookRoutes from "./webhookRoutes";

const app = express();

app.use(installCORS);

app.use("/webhooks", webhookRoutes);
app.use(express.json());

app.use("/api", router);

app.get("/", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

export default app;
