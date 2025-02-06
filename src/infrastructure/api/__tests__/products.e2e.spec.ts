import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for products", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
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
