import AppError from "@common/errors/AppError";

export const rateLimitHandler = (): AppError => {
  return new AppError("Muitos pedidos. Por favor tente mais tarde.", 429);
};
