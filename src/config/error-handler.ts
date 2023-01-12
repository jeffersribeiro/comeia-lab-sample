import AppError from "@common/errors/AppError";
import { Express, NextFunction, Request, Response } from "express";

export const setupErrorHandler = (app: Express): void => {
  app.use(
    (
      error: Error,
      _request: Request,
      response: Response,
      _next: NextFunction
    ) => {
      if (error instanceof AppError) {
        return response.status(error.code).json({
          status: "error",
          message: error.message,
          error,
        });
      }

      return response.status(500).json({
        status: "error",
        message: error.message,
        error,
      });
    }
  );
};
