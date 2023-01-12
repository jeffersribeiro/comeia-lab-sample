import express from "express";

import { setupRoutes } from "./router";
import { setupMiddlewares } from "./middlewares";

const app = express();

setupMiddlewares(app);
setupRoutes(app);

export { app };
