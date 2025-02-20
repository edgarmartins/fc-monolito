import express, { Request, Response } from "express";
import ProductRepository from "../../../modules/product-adm/repository/product.repository";
import AddProductUseCase from "../../../modules/product-adm/usecase/add-product/add-product.usecase";
import CheckStockUseCase from "../../../modules/product-adm/usecase/check-stock/check-stock.usecase";
import ProductAdmFacade from "../../../modules/product-adm/facade/product-adm.facade";

export const productsRoute = express.Router();

productsRoute.post("/", async (req: Request, res: Response) => {
  const facade = new ProductAdmFacade({
    addUseCase: new AddProductUseCase(new ProductRepository()),
    stockUseCase: new CheckStockUseCase(new ProductRepository()),
  });

  try {
    const productInputDto = {
      name: req.body.name,
      description: req.body.description,
      purchasePrice: req.body.purchasePrice,
      stock: req.body.stock,
    };

    const output = await facade.addProduct(productInputDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

productsRoute.get("/:productID", async (req: Request, res: Response) => {
  const facade = new ProductAdmFacade({
    addUseCase: new AddProductUseCase(new ProductRepository()),
    stockUseCase: new CheckStockUseCase(new ProductRepository()),
  });
  const input = { productId: req.params.productID };
  const output = await facade.checkStock(input);

  res.format({
    json: async () => res.send(output),
  });
});
