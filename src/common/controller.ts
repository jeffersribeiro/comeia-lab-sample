import { HttpResponse } from "./helpers";

export interface Controller {
  handle: (httpRequest: any) => Promise<HttpResponse>;
}
