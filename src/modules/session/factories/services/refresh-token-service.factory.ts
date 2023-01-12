import { RefreshTokenService } from "../../services";

export const makeRefreshTokenService = (): RefreshTokenService => {
  return new RefreshTokenService();
};
