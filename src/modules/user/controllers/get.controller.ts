import { Controller } from "@data/common/controller";
import { forbidden, ok } from "@data/common/helpers";

export class GetController implements Controller {
  constructor(private readonly getService: any) {}

  async handle(req: any): Promise<any> {
    try {
      const { uid } = req.user;

      const user = await this.getService.execute(uid);

      return ok(user);
    } catch (error) {
      return forbidden();
    }
  }
}
