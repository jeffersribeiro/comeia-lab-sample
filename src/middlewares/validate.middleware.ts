import { AnyZodObject } from "zod";
import { Middleware } from "@common/middleware";
import { badRequest, forbidden, ok } from "@data/common/helpers";

export class ValidateMiddleware implements Middleware {
  constructor(private readonly schema: AnyZodObject) {}
  async handle(req: any): Promise<any> {
    try {
      this.schema.parse(req.body);
      return ok(req);
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error);
      }
      return forbidden();
    }
  }
}
