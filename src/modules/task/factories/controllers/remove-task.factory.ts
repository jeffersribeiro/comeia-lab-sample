import { RemoveController } from "../../controllers";
import { makeRemoveTask } from "../services/remove-task-service.factory";

export const makeRemoveTaskController = (): RemoveController => {
  return new RemoveController(makeRemoveTask());
};
