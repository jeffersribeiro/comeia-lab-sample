import { adaptExpressMiddleware } from "@data/adapters/express-middleware";
import { RefreshTokenMiddleware } from "../../middlewares/refresh-token.middleware";

export const refreshToken = adaptExpressMiddleware(
  new RefreshTokenMiddleware()
);
