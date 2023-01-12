import { Middleware } from "@data/common/middleware";
import { RequestHandler } from "express";

export type Adapter = (middleware: Middleware) => RequestHandler;

export const adaptExpressMiddleware: Adapter =
  (middleware) => async (req, res, next) => {
    const { statusCode, data } = await middleware.handle(req);

    if (statusCode === 200) {
      next();
    } else {
      res.status(statusCode).json({ message: data.message, error: data });
    }
  };
