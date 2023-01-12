import { Controller } from "@data/common/controller";
import { forbidden, HttpResponse, ok } from "@data/common/helpers";

export class ListController implements Controller {
  constructor(private readonly listService: any) {}

  async handle(req: any): Promise<HttpResponse> {
    try {
      const { uid } = req.user;
      const { page, limit } = req.query;
      const posts = await this.listService.execute(uid, { page, limit });

      return ok(posts);
    } catch (error) {
      return forbidden();
    }
  }
}
