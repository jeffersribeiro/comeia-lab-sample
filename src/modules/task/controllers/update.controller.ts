import { Controller } from "@data/common/controller";
import { forbidden, HttpResponse, ok } from "@data/common/helpers";

export class UpdateController implements Controller {
  constructor(private readonly updateService: any) {}
  async handle(req: any): Promise<HttpResponse> {
    try {
      const { uid } = req.user;
      const { id } = req.params;
      const { description, done } = req.body;

      const data = { id, description, done };

      const posts = await this.updateService.execute(uid, data);

      return ok(posts);
    } catch (error) {
      return forbidden();
    }
  }
}
