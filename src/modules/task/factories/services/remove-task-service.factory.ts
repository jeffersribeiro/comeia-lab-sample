import { RemoveService } from "../../services";

export const makeRemoveTask = (): RemoveService => {
  return new RemoveService();
};
