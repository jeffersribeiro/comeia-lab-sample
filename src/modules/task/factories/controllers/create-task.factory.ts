import { CreateController } from "../../controllers";
import { makeCreateTask } from "../services";

export const makeCreateTaskController = (): CreateController => {
  return new CreateController(makeCreateTask());
};
