import { adaptExpressMiddleware } from "@data/adapters/express-middleware";
import { AuthenticateMiddleware } from "@data/middlewares/auth.middleware";

export const auth = adaptExpressMiddleware(new AuthenticateMiddleware());
