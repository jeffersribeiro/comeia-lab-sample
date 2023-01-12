import { Controller } from "@data/common/controller";
import { forbidden, ok } from "@data/common/helpers";

export class RemoveController implements Controller {
  constructor(private readonly removeService: any) {}

  async handle(httpRequest: any): Promise<any> {
    try {
      const { uid } = httpRequest.user;
      const data = httpRequest.params;

      await this.removeService.execute(uid, data);

      return ok("ok");
    } catch (error) {
      return forbidden();
    }
  }
}
