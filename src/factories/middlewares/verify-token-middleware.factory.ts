import { adaptExpressMiddleware } from "@data/adapters/express-middleware";
import { TokenMiddleware } from "@data/middlewares/token.middleware";

export const verifyToken = adaptExpressMiddleware(new TokenMiddleware());
