import { CreateService } from "../../services";

export const makeCreateUser = (): CreateService => {
  return new CreateService();
};
