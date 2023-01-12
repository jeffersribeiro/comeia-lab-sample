import { DeleteController } from "../../controllers";
import { makeRemoveUser } from "../services";

export const makeRemoveUserController = (): DeleteController => {
  return new DeleteController(makeRemoveUser());
};
