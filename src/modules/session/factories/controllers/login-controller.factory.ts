import { LoginController } from "../../controllers";
import { makeLoginService } from "../services";

export const makeLoginController = (): LoginController => {
  return new LoginController(makeLoginService());
};
