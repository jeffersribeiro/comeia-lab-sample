import { Router } from "express";

import userRouter from "@modules/user/routes/user.route";

export default (router: Router): void => {
  router.use("/user", userRouter);
};
