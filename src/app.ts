import express from "express";

import { installCORS, requestLogger } from "./middlewares";
import router from "./routes";
import routesV2 from "./routesV2";
import webhookRoutes from "./webhookRoutes";

const app = express();

app.use(installCORS);
app.use(requestLogger);

app.use("/webhooks", webhookRoutes);
app.use(express.json());

app.use("/api", router);
app.use("/api/v2", routesV2);

app.get("/", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

export default app;
