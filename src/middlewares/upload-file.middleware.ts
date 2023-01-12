import { Request, Response, NextFunction } from "express";

export const uploadFile = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  // const files = req.files;
  const image = "url_image";
  req.body.image = image;

  next();
};
