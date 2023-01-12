import { UpdateController } from "../../controllers";
import { makeUpdateTask } from "../services";

export const makeUpdaTaskController = (): UpdateController => {
  return new UpdateController(makeUpdateTask());
};
