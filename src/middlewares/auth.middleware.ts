import { verify } from "jsonwebtoken";

import auth from "@data/config/auth";
import { Middleware } from "@data/common";
import {
  ok,
  forbidden,
  HttpResponse,
  unauthorized,
} from "@data/common/helpers";

export class AuthenticateMiddleware implements Middleware {
  async handle(req: any): Promise<HttpResponse<Error>> {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return unauthorized();
      }

      const [, token] = authHeader.split(" ");

      const { sub } = verify(token, auth.jwt.secret);

      req.user = {
        uid: sub?.toString(),
      };

      return ok(req);
    } catch (error) {
      return forbidden();
    }
  }
}
