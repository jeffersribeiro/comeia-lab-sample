import { adaptExpressMiddleware } from "@data/adapters/express-middleware";
import { ValidateMiddleware } from "@data/middlewares/validate.middleware";
import { RequestHandler } from "express";
import { AnyZodObject } from "zod";

export const validate = (schema: AnyZodObject): RequestHandler => {
  return adaptExpressMiddleware(new ValidateMiddleware(schema));
};
