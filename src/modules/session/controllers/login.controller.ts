import { Controller } from "@data/common/controller";
import { badRequest, forbidden, HttpResponse, ok } from "@data/common/helpers";

export class LoginController implements Controller {
  constructor(private readonly loginService: any) {}
  async handle(req: any): Promise<HttpResponse> {
    try {
      const { email, password } = req.body;
      let ip = req.headers["x-forwarded-for"];

      if (Array.isArray(ip)) ip = ip[0];

      const session = await this.loginService.execute({
        email: email.toLowerCase(),
        ip,
        password,
      });

      return ok(session);
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error);
      }
      return forbidden();
    }
  }
}
