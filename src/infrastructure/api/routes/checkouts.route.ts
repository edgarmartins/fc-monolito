import express, { Request, Response } from "express";
import PlaceOrderFacadeFactory from "../../../modules/checkout/factory/place-order.facade.factory";

export const checkoutsRoute = express.Router();

checkoutsRoute.post("/", async (req: Request, res: Response) => {
  try {
    const usecase = PlaceOrderFacadeFactory.create();
    const checkoutDto = {
      clientId: req.body.clientId,
      products: req.body.products.map((p: any) => {
        return {
          productId: p,
        };
      }),
    };
    const output = await usecase.create(checkoutDto);

    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
