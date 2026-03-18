import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import travelRoutes from "./routes/travelRoutes.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";

export function createApp() {
  dotenv.config();

  const app = express();

  app.use(express.json({ limit: "1mb" }));
  app.use(morgan("dev"));

  const corsOrigin = process.env.CORS_ORIGIN;
  app.use(
    cors({
      origin: corsOrigin ? corsOrigin.split(",").map((s) => s.trim()) : true,
    })
  );

  // Serve frontend (kept in a separate folder) so you can run one server.
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const frontendDir = path.join(__dirname, "..", "..", "frontend");
  app.use(express.static(frontendDir));

  app.get("/api/health", (_req, res) => res.json({ ok: true }));
  app.use("/api/travel", travelRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
