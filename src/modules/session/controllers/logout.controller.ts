import { Controller } from "@data/common/controller";
import { forbidden, HttpResponse, ok } from "@data/common/helpers";

export class LogoutController implements Controller {
  constructor(private readonly logoutService: any) {}

  async handle(req: any): Promise<HttpResponse> {
    try {
      const { uid } = req.user;
      await this.logoutService.execute(uid);

      return ok("ok");
    } catch (error) {
      return forbidden();
    }
  }
}
