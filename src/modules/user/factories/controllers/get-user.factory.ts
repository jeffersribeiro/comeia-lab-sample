import { GetController } from "../../controllers";
import { makeGetUser } from "../services";

export const makeGetUserController = (): GetController => {
  return new GetController(makeGetUser());
};
