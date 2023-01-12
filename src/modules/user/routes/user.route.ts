import { Router } from "express";

import { auth, validate, verifyToken } from "@data/factories/middlewares";

import { adaptExpressRoute } from "@data/adapters/express-route";
import { createSchema, updateSchema } from "../validators/user.validator";
import {
  makeCreateUserController,
  makeGetUserController,
  makeRemoveUserController,
  makeUpdateUserController,
} from "../factories/controllers";

const userRouter = Router();

userRouter.post(
  "/",
  validate(createSchema),
  adaptExpressRoute(makeCreateUserController())
);

userRouter.get(
  "/",
  auth,
  verifyToken,
  adaptExpressRoute(makeGetUserController())
);

userRouter.patch(
  "/",
  auth,
  verifyToken,
  validate(updateSchema),
  adaptExpressRoute(makeUpdateUserController())
);

userRouter.patch(
  "/",
  auth,
  verifyToken,
  adaptExpressRoute(makeRemoveUserController())
);

export default userRouter;
