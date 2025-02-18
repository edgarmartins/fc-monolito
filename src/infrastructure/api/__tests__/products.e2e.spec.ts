import { Sequelize } from "sequelize-typescript";
import { app } from "../express";
import request from "supertest";
import { ProductModel } from "../../../modules/product-adm/repository/product.model";

describe("E2E test for products", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/products").send({
      name: "Product",
      description: "Item 1",
      purchasePrice: 10.22,
      stock: 5,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product");
    expect(response.body.description).toBe("Item 1");
    expect(response.body.purchasePrice).toBe(10.22);
    expect(response.body.stock).toBe(5);
  });
});
