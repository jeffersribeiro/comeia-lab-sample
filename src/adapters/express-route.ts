import { RequestHandler } from "express";
import { Controller } from "@data/common/controller";

type Adapter = (controller: Controller) => RequestHandler;

export const adaptExpressRoute: Adapter = (controller) => async (req, res) => {
  const { data, statusCode } = await controller.handle(req);

  if (statusCode === 200) {
    if (!data) res.send(data);

    res.json(data);
  } else {
    res.status(statusCode).json(data);
  }
};
