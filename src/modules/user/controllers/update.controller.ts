import { Controller } from "@data/common/controller";
import { forbidden, HttpResponse, ok } from "@data/common/helpers";

export class UpdateController implements Controller {
  constructor(private readonly updateService: any) {}

  async handle(req: any): Promise<HttpResponse> {
    try {
      const { uid } = req.user;
      const data = req.body;

      const user = await this.updateService.execute(uid, data);

      return ok(user);
    } catch (error) {
      return forbidden();
    }
  }
}
