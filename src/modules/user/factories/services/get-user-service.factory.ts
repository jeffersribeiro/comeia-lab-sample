import { GetService } from "../../services";

export const makeGetUser = (): GetService => {
  return new GetService();
};
