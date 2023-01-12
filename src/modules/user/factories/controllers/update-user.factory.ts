import { UpdateController } from "../../controllers";
import { makeUpdateUser } from "../services";

export const makeUpdateUserController = (): UpdateController => {
  return new UpdateController(makeUpdateUser());
};
