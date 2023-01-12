import { Middleware } from "@data/common";
import { PgConnection } from "@data/config";
import {
  forbidden,
  HttpResponse,
  ok,
  unauthorized,
} from "@data/common/helpers";

import { Session } from "../entities/session.entity";
import { verify } from "jsonwebtoken";
import auth from "@data/config/auth";

export class RefreshTokenMiddleware implements Middleware {
  async handle(req: any): Promise<HttpResponse<Error>> {
    try {
      const { email, refreshToken } = req.body;

      const decoded = verify(refreshToken, auth.jwt.refreshSecret) as {
        email: string;
      };

      if (email !== decoded.email) {
        return unauthorized();
      }

      const sessionRepo = PgConnection.getInstance().getRepository(Session);

      const session = await sessionRepo.findOne({
        where: { refreshToken },
        relations: ["user"],
      });

      if (session == null) {
        return unauthorized();
      }

      return ok(req);
    } catch (error) {
      return forbidden();
    }
  }
}
