import { ListService } from "../../services";

export const makeListTask = (): ListService => {
  return new ListService();
};
