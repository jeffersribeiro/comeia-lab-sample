import cors from "cors";
import morgan from "morgan";
import { Express, json } from "express";
import rateLimit from "express-rate-limit";
import { rateLimitHandler } from "@common/services/RateLimit";

export const setupMiddlewares = (app: Express): void => {
  app.use(cors());
  app.use(json());
  app.use(morgan("dev"));
  app.use(
    "/",
    rateLimit({
      windowMs: 60 * 1000,
      max: 500,
      handler: rateLimitHandler,
    })
  );

  app.use((_req, res, next) => {
    res.type("json");
    next();
  });
};
