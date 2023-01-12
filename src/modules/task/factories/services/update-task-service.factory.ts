import { UpdateService } from "../../services";

export const makeUpdateTask = (): UpdateService => {
  return new UpdateService();
};
