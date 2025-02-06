import Address from "../../../modules/@shared/domain/value-object/address";
import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for clients", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
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
