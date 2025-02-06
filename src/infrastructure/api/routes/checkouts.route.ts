import express, { Request, Response } from "express";
import CheckoutFacadeFactory from "../../../modules/checkout/factory/checkout.facade.factory";

export const checkoutsRoute = express.Router();

checkoutsRoute.post("/", async (req: Request, res: Response) => {
  try {
    const usecase = CheckoutFacadeFactory.create();
    const checkoutDto = {
      clientId: req.body.clientId,
      products: req.body.products.map((p: any) => {
        return {
          productId: p,
        };
      }),
    };
    const output = await usecase.execute(checkoutDto);

    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

// checkoutsRoute.get("/:clientID", async (req: Request, res: Response) => {
//   const usecase = new FindClientUseCase(new ClientRepository());
//   const input = { id: req.params.clientID };
//   const output = await usecase.execute(input);

//   res.format({
//     json: async () => res.send(output),
//   });
// });
