import { LogoutController } from "../../controllers";
import { makeLogoutService } from "../services/logout-service.factory";

export const makeLogoutController = (): LogoutController => {
  return new LogoutController(makeLogoutService());
};
