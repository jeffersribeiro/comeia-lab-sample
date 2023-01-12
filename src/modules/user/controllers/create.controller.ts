import { Controller } from "@data/common/controller";
import { badRequest, forbidden, HttpResponse, ok } from "@data/common/helpers";

export class CreateController implements Controller {
  constructor(private readonly createService: any) {}

  async handle(req: any): Promise<HttpResponse> {
    try {
      const data = req.body;

      const user = await this.createService.execute(data);

      return ok(user);
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error);
      }
      return forbidden();
    }
  }
}
