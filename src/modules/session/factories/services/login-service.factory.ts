import { LoginService } from "../../services";

export const makeLoginService = (): LoginService => {
  return new LoginService();
};
