import { Sequelize } from "sequelize-typescript";
import request from "supertest";
import InvoiceModel from "../../../modules/invoice/repository/invoice.model";
import { app } from "../express";
import InvoiceItemsModel from "../../../modules/invoice/repository/invoice-items.model";

describe("E2E test for invoices", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel, InvoiceItemsModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should return a invoice", async () => {
    const response = await request(app)
      .post("/invoices")
      .send({
        name: "Antonio Oliveira",
        document: "123123",
        street: "Avenida",
        number: "44",
        complement: "Rua sem saida",
        city: "Algum lugar",
        state: "AAA",
        zipCode: "00000-000",
        items: [
          {
            id: "1",
            name: "Item 1",
            price: 11,
          },
        ],
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Antonio Oliveira");
    expect(response.body.document).toBe("123123");

    expect(response.body.street).toBe("Avenida");
    expect(response.body.number).toBe("44");
    expect(response.body.complement).toBe("Rua sem saida");
    expect(response.body.city).toBe("Algum lugar");
    expect(response.body.state).toBe("AAA");
    expect(response.body.zipCode).toBe("00000-000");
    expect(response.body.items.length).toBe(1);

    expect(response.body.items[0].id).toBe("1");
    expect(response.body.items[0].name).toBe("Item 1");
    expect(response.body.items[0].price).toBe(11);

    const responseGet = await request(app).get(`/invoices/${response.body.id}`);
    expect(responseGet.status).toBe(200);
    expect(responseGet.body.id).toBeDefined();
    expect(responseGet.body.createdAt).toBeDefined();
    expect(responseGet.body.name).toBe("Antonio Oliveira");
    expect(responseGet.body.document).toBe("123123");
    expect(responseGet.body.total).toBe(11);

    expect(responseGet.body.items.length).toBe(1);
    expect(responseGet.body.items[0].id).toBe("1");
    expect(responseGet.body.items[0].name).toBe("Item 1");
    expect(responseGet.body.items[0].price).toBe(11);
  });
});
