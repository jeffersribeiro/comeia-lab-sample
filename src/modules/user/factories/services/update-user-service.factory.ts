import { UpdateService } from "../../services";

export const makeUpdateUser = (): UpdateService => {
  return new UpdateService();
};
