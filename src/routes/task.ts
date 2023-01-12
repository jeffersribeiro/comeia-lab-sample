import { Router } from "express";

import taskRouter from "@data/modules/task/routes/task.route";
import { auth, verifyToken } from "@data/factories/middlewares";

export default (router: Router): void => {
  router.use("/task", auth, verifyToken, taskRouter);
};
