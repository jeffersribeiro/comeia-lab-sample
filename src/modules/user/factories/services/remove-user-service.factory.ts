import { DeleteService } from "../../services";

export const makeRemoveUser = (): DeleteService => {
  return new DeleteService();
};
