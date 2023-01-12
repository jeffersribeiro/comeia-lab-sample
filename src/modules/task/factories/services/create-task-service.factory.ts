import { CreateService } from "../../services";

export const makeCreateTask = (): CreateService => {
  return new CreateService();
};
