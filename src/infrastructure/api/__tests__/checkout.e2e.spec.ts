import request from "supertest";
import { ClientModel } from "../../../modules/client-adm/repository/client.model";
import { ProductModel as AdmProductModel } from "../../../modules/product-adm/repository/product.model";
import ProductModel from "../../../modules/store-catalog/repository/product.model";
import { app } from "../express";
import { Migrator } from "../migrator";
import InvoiceModel from "../../../modules/invoice/repository/invoice.model";
import InvoiceItemsModel from "../../../modules/invoice/repository/invoice-items.model";
import TransactionModel from "../../../modules/payment/repository/transaction.model";

describe("E2E test for checkouts", () => {
  let migrator: Migrator;

  beforeEach(async () => {
    migrator = new Migrator({
      models: [
        ClientModel,
        AdmProductModel,
        ProductModel,
        InvoiceModel,
        InvoiceItemsModel,
        TransactionModel,
      ],
    });

    await migrator.up();
  });

  afterEach(async () => {
    await migrator.down();
  });

  it("should create a checkout", async () => {
    const client = await request(app)
      .post("/clients")
      .send({
        name: "Antonio Oliveira",
        email: "antonio@antonio.com.br",
        document: "123123123",
        address: {
          street: "Avenida",
          number: "55",
          complement: "Rua sem saida",
          city: "Algum lugar",
          state: "AAA",
          zipCode: "00000-000",
        },
      });

    expect(client).toBeDefined();
    expect(client.body.id).toBeDefined();

    const product = await request(app).post("/products").send({
      name: "Product",
      description: "Item 1",
      purchasePrice: 10.22,
      stock: 5,
    });

    const response = await request(app)
      .post("/checkout")
      .send({
        clientId: client.body.id,
        products: [product.body.id],
      });
  });
});
