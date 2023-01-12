import { Router } from "express";

import { validate } from "@data/factories/middlewares";
import { adaptExpressRoute } from "@data/adapters/express-route";

import { updateSchema, createSchema } from "../validators/post.validator";

import {
  makeRemoveTaskController,
  makeCreateTaskController,
  makeListTaskController,
  makeUpdaTaskController,
} from "../factories/controllers";

const taskRouter = Router();

taskRouter.get("/", adaptExpressRoute(makeListTaskController()));

taskRouter.post(
  "/",
  validate(createSchema),
  adaptExpressRoute(makeCreateTaskController())
);

taskRouter.patch(
  "/:id",
  validate(updateSchema),
  adaptExpressRoute(makeUpdaTaskController())
);

taskRouter.delete("/:id", adaptExpressRoute(makeRemoveTaskController()));

export default taskRouter;
