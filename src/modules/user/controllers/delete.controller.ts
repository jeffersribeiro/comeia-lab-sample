import { Controller } from "@data/common/controller";
import { badRequest, forbidden, HttpResponse, ok } from "@data/common/helpers";

export class DeleteController implements Controller {
  constructor(private readonly deleteService: any) {}

  async handle(req: any): Promise<HttpResponse> {
    try {
      const { uid } = req.user;
      const data = req.body;
      await this.deleteService.execute(uid, data);

      return ok("ok");
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error);
      }
      return forbidden();
    }
  }
}
