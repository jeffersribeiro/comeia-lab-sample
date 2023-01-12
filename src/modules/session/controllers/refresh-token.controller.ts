import { Controller } from "@data/common/controller";
import { forbidden, HttpResponse, ok } from "@data/common/helpers";

export class RefreshTokenController implements Controller {
  constructor(private readonly refreshTokenService: any) {}
  async handle(req: any): Promise<HttpResponse> {
    try {
      const { email } = req.body;

      let ip = req.headers["x-forwarded-for"];

      if (Array.isArray(ip)) ip = ip[0];

      const session = await this.refreshTokenService.execute({
        ip,
        email: email.toLowerCase(),
      });

      return ok(session);
    } catch (error) {
      return forbidden();
    }
  }
}
