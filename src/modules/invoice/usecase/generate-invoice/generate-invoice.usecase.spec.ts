import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice";
import InvoiceItems from "../../domain/invoice-items";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const invoice = new Invoice({
  id: new Id("1"),
  name: "John Doe",
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

const MockRepository = () => {
  return {
    find: jest.fn(),
    generate: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  };
};

describe("Invoice usecase unit test", () => {
  it("should generate a invoice", async () => {
    const invoiceRepository = MockRepository();
    const usecase = new GenerateInvoiceUseCase(invoiceRepository);
    const input = {
      name: "John Doe",
      document: "123456789",
      street: "Street",
      number: "123",
      complement: "Complement",
      city: "City",
      state: "State",
      zipCode: "12345678",
      items: [
        {
          id: "1",
          name: "Item 1",
          price: 100,
        },
      ],
    };

    const result = await usecase.execute(input);

    expect(result.id).toBe("1");
    expect(result.name).toBe("John Doe");
    expect(result.document).toBe("123456789");
    expect(result.street).toBe("Street");
    expect(result.number).toBe("123");
    expect(result.complement).toBe("Complement");
    expect(result.city).toBe("City");
    expect(result.state).toBe("State");
    expect(result.zipCode).toBe("12345678");
    expect(result.items[0].id).toBe("1");
    expect(result.items[0].name).toBe("Item 1");
    expect(result.items[0].price).toBe(100);
    expect(result.total).toBe(100);
  });
});
