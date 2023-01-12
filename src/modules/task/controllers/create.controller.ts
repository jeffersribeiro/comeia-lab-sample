import { Controller } from "@data/common/controller";
import { forbidden, HttpResponse, ok } from "@data/common/helpers";

export class CreateController implements Controller {
  constructor(private readonly createService: any) {}

  async handle(req: any): Promise<HttpResponse> {
    try {
      const { uid } = req.user;
      const data = req.body;
      const post = await this.createService.execute(uid, data);

      return ok(post);
    } catch (error) {
      return forbidden();
    }
  }
}
