import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import FindInvoiceUseCase from "./find-invoice.usecase";

const invoice = new Invoice({
  id: new Id("123"),
  name: "Antonio",
  document: "123123",
  address: new Address(
    "Avenida",
    "123",
    "Rua sem saida",
    "Algum lugar",
    "AA",
    "00000-000"
  ),
  createdAt: new Date(),
  updatedAt: new Date(),
  items: [
    {
      id: new Id("1"),
      name: "Item 1",
      price: 10,
    },
    {
      id: new Id("2"),
      name: "Item 2",
      price: 20,
    },
  ],
});

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    generate: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  };
};

describe("find invoice usecase", () => {
  it("should find a invoice", async () => {
    const invoiceRepository = MockRepository();

    const usecase = new FindInvoiceUseCase(invoiceRepository);
    const input = { id: "123" };
    const result = await usecase.execute(input);

    expect(invoiceRepository.find).toHaveBeenCalled();
    expect(result.id).toBe("123");
    expect(result.name).toBe("Antonio");
    expect(result.document).toBe("123123");
    expect(result.address.city).toBe("Algum lugar");
    expect(result.address.complement).toBe("Rua sem saida");
    expect(result.address.number).toBe("123");
    expect(result.address.state).toBe("AA");
    expect(result.address.street).toBe("Avenida");
    expect(result.address.zipCode).toBe("00000-000");
  });
});
