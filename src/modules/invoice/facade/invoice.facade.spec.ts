import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../repository/invoice.model";
import InvoiceItemModel from "../repository/invoice-item.model";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";

describe("InvoiceFacade", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([InvoiceModel, InvoiceItemModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a invoice", async () => {
    const facade = InvoiceFacadeFactory.create();

    const input = {
      name: "Jose Almeida",
      document: "123",
      street: "Avenida sem rua",
      number: "10",
      complement: "sem saida",
      city: "Algum lugar",
      state: "AAA",
      zipCode: "00000-000",
      items: [
        {
          id: "1",
          name: "product 1",
          price: 10,
        },
        {
          id: "2",
          name: "product 2",
          price: 20,
        },
        {
          id: "3",
          name: "product 3",
          price: 30,
        },
      ],
    };

    const output = await facade.generate(input);
    expect(output.id).toBeDefined();
  });
});
