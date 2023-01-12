import { LogoutService } from "../../services";

export const makeLogoutService = (): LogoutService => {
  return new LogoutService();
};
