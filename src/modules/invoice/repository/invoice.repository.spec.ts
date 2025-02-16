import { Sequelize } from "sequelize-typescript";
import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice";
import InvoiceItems from "../domain/invoice-items";
import InvoiceItemsModel from "./invoice-items.model";
import InvoiceModel from "./invoice.model";
import InvoiceRepository from "./invoice.repository";

describe("InvoiceRepository test", () => {
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

  it("should generate a invoice", async () => {
    const invoice = new Invoice({
      id: new Id("1"),
      name: "Product 1",
      document: "123456789",
      address: new Address(
        "Street",
        "123",
        "Complement",
        "City",
        "State",
        "12345678"
      ),
      items: [
        new InvoiceItems({
          id: new Id("1"),
          name: "Item 1",
          price: 100,
        }),
      ],
    });

    const repository = new InvoiceRepository();
    const result = await repository.generate(invoice);

    expect(result.id.id).toBe(invoice.id.id);
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.address.street).toBe(invoice.address.street);
    expect(result.address.number).toBe(invoice.address.number);
    expect(result.address.complement).toBe(invoice.address.complement);
    expect(result.address.city).toBe(invoice.address.city);
    expect(result.address.state).toBe(invoice.address.state);
    expect(result.address.zipCode).toBe(invoice.address.zipCode);
    expect(result.items.length).toBe(invoice.items.length);
    expect(result.items[0].id.id).toBe(invoice.items[0].id.id);
    expect(result.items[0].name).toBe(invoice.items[0].name);
    expect(result.items[0].price).toBe(invoice.items[0].price);
  }, 10000);

  it("should find a invoice", async () => {
    const invoice = new Invoice({
      id: new Id("1"),
      name: "Product 1",
      document: "123456789",
      address: new Address(
        "Street",
        "123",
        "Complement",
        "City",
        "State",
        "12345678"
      ),
      items: [
        new InvoiceItems({
          id: new Id("1"),
          name: "Item 1",
          price: 100,
        }),
      ],
    });

    const repository = new InvoiceRepository();
    await repository.generate(invoice);
    const result = await repository.find(invoice.id.id);

    expect(result.id.id).toBe(invoice.id.id);
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.address.street).toBe(invoice.address.street);
    expect(result.address.number).toBe(invoice.address.number);
    expect(result.address.complement).toBe(invoice.address.complement);
    expect(result.address.city).toBe(invoice.address.city);
    expect(result.address.state).toBe(invoice.address.state);
    expect(result.address.zipCode).toBe(invoice.address.zipCode);
    expect(result.items.length).toBe(invoice.items.length);
    expect(result.items[0].id.id).toBe(invoice.items[0].id.id);
    expect(result.items[0].name).toBe(invoice.items[0].name);
    expect(result.items[0].price).toBe(invoice.items[0].price);
  }, 10000);
});
