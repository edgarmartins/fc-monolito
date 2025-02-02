import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import Address from "../../@shared/domain/value-object/address";
import InvoiceRepository from "./invoice.repository";
import InvoiceItemModel from "./invoice-item.model";

describe("InvoiceRepository", () => {
  let sequelize: Sequelize;
  let invoice: Invoice;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel, InvoiceItemModel]);
    await sequelize.sync();

    invoice = new Invoice({
      id: new Id("123"),
      name: "Antonio Oliveira",
      document: "00000000011",
      address: new Address(
        "Rua ABC",
        "22",
        "Residencial ABC",
        "Fora do Mapa",
        "AA",
        "00000-000"
      ),
      items: [
        {
          id: new Id("1"),
          name: "Produto 1",
          price: 34,
        },
        {
          id: new Id("2"),
          name: "Produto 2",
          price: 22,
        },
        {
          id: new Id("3"),
          name: "Produto 3",
          price: 76,
        },
      ],
    });

    await new InvoiceRepository().generate(invoice);
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a invoice", async () => {
    const result = await InvoiceModel.findOne({
      where: { id: "123" },
      include: [InvoiceItemModel],
    });

    expect(result).toBeDefined();
    expect(result.id).toBe(invoice.id.id);
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.street).toBe(invoice.address.street);
    expect(result.number).toBe(invoice.address.number);
    expect(result.complement).toBe(invoice.address.complement);
    expect(result.city).toBe(invoice.address.city);
    expect(result.state).toBe(invoice.address.state);
    expect(result.zipcode).toBe(invoice.address.zipCode);

    expect(result.items.length).toBe(3);
    expect(result.items[0].id).toBe(invoice.items[0].id.id);
    expect(result.items[0].price).toBe(invoice.items[0].price);
    expect(result.items[0].name).toBe(invoice.items[0].name);

    expect(result.items[1].id).toBe(invoice.items[1].id.id);
    expect(result.items[1].price).toBe(invoice.items[1].price);
    expect(result.items[1].name).toBe(invoice.items[1].name);

    expect(result.items[2].id).toBe(invoice.items[2].id.id);
    expect(result.items[2].price).toBe(invoice.items[2].price);
    expect(result.items[2].name).toBe(invoice.items[2].name);

    expect(result.items.reduce((acc, item) => acc + item.price, 0)).toBe(132);
  });

  it("should return a invoice", async () => {
    const result = await new InvoiceRepository().find(invoice.id.id);

    expect(result).toBeDefined();
    expect(result.id.id).toBe(invoice.id.id);
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.address.street).toBe(invoice.address.street);
    expect(result.address.number).toBe(invoice.address.number);
    expect(result.address.complement).toBe(invoice.address.complement);
    expect(result.address.city).toBe(invoice.address.city);
    expect(result.address.state).toBe(invoice.address.state);
    expect(result.address.zipCode).toBe(invoice.address.zipCode);

    expect(result.items.length).toBe(3);
    expect(result.items[0].id.id).toBe(invoice.items[0].id.id);
    expect(result.items[0].price).toBe(invoice.items[0].price);
    expect(result.items[0].name).toBe(invoice.items[0].name);

    expect(result.items[1].id.id).toBe(invoice.items[1].id.id);
    expect(result.items[1].price).toBe(invoice.items[1].price);
    expect(result.items[1].name).toBe(invoice.items[1].name);

    expect(result.items[2].id.id).toBe(invoice.items[2].id.id);
    expect(result.items[2].price).toBe(invoice.items[2].price);
    expect(result.items[2].name).toBe(invoice.items[2].name);

    expect(result.items.reduce((acc, item) => acc + item.price, 0)).toBe(132);
  });
});
