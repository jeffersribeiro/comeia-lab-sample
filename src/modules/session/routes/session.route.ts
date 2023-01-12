import { Router } from "express";

import { adaptExpressRoute } from "@data/adapters/express-route";

import { loginSchema, refreshTokenSchema } from "../validators/login.validator";

import {
  makeLoginController,
  makeLogoutController,
  makeRefreshTokenController,
} from "../factories/controllers";
import { auth, validate, verifyToken } from "@data/factories/middlewares";
import { refreshToken } from "../factories/middlewares/refresh-token-middleware.factory";

const sessionRouter = Router();

sessionRouter.post(
  "/",
  validate(loginSchema),
  adaptExpressRoute(makeLoginController())
);

sessionRouter.post(
  "/refresh-token",
  validate(refreshTokenSchema),
  refreshToken,
  adaptExpressRoute(makeRefreshTokenController())
);

sessionRouter.get(
  "/",
  auth,
  verifyToken,
  adaptExpressRoute(makeLogoutController())
);

export default sessionRouter;
