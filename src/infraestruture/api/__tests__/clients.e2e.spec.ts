import { Sequelize } from "sequelize-typescript";
import request from "supertest";
import { ClientModel } from "../../../modules/client-adm/repository/client.model";
import { app } from "../express";

describe("E2E test for clients", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const response = await request(app)
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

    expect(response.status).toBe(200);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Antonio Oliveira");
    expect(response.body.email).toBe("antonio@antonio.com.br");
    expect(response.body.document).toBe("123123123");
    expect(response.body.address._street).toBe("Avenida");
    expect(response.body.address._number).toBe("55");
    expect(response.body.address._complement).toBe("Rua sem saida");
    expect(response.body.address._city).toBe("Algum lugar");
    expect(response.body.address._state).toBe("AAA");
    expect(response.body.address._zipCode).toBe("00000-000");
  });
});
