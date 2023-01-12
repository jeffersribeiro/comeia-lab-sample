import { CreateController } from "../../controllers";
import { makeCreateUser } from "../services";

export const makeCreateUserController = (): CreateController => {
  return new CreateController(makeCreateUser());
};
