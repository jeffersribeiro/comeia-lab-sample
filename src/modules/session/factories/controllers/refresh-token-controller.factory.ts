import { RefreshTokenController } from "../../controllers/refresh-token.controller";
import { makeRefreshTokenService } from "../services";

export const makeRefreshTokenController = (): RefreshTokenController => {
  return new RefreshTokenController(makeRefreshTokenService());
};
