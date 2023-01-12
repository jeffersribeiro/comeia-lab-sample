import { ListController } from "../../controllers";
import { makeListTask } from "../services";

export const makeListTaskController = (): ListController => {
  return new ListController(makeListTask());
};
