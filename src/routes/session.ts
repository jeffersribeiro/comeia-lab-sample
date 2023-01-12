import { Router } from "express";

import sessionRouter from "@modules/session/routes/session.route";

export default (router: Router): void => {
  router.use("/session", sessionRouter);
};
