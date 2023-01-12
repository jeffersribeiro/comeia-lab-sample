import { join } from "path";
import { readdirSync } from "fs";
import { Router, Express } from "express";

export const setupRoutes = (app: Express): void => {
  const router = Router();

  readdirSync(join(__dirname, "../routes"))
    .filter((file) => !file.endsWith(".map"))
    .map(async (file) => {
      (await import(`../routes/${file}`)).default(router);
    });

  app.use("/api/v1", router);
};
