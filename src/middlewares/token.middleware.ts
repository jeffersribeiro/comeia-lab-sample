import { isBefore } from "date-fns";
import { Session } from "@data/modules/session/entities/session.entity";
import { PgConnection } from "@data/config";
import { Middleware } from "@data/common";
import {
  forbidden,
  HttpResponse,
  ok,
  unauthorized,
} from "@data/common/helpers";

export class TokenMiddleware implements Middleware {
  async handle(req: any): Promise<HttpResponse<Error>> {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return unauthorized();
      }

      const [, token] = authHeader.split(" ");

      const sessionRepo = PgConnection.getInstance().getRepository(Session);

      const session = await sessionRepo.findOneBy({ token });

      if (session == null) {
        return unauthorized();
      }
      if (!session.active || isBefore(session.expiresAt, new Date())) {
        return unauthorized();
      }

      return ok(req);
    } catch (error) {
      return forbidden();
    }
  }
}
