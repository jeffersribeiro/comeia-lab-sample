import "dotenv/config";
import "reflect-metadata";
import "express-async-errors";

import { env } from "@config/env";
import { PgConnection } from "./config/connection";

PgConnection.getInstance()
  .connect()
  .then(async () => {
    const { app } = await import("@config/app");
    app.listen(env.PORT, () => {
      console.log(`Server running at http://localhost:${env.PORT}`);
    });
  })
  .catch(console.error);
