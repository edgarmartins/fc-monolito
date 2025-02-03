import Id from "../../../@shared/domain/value-object/id.value-object";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const input = {
  name: "Antonio",
  document: "123123",
  street: "Avenida",
  number: "123",
  complement: "Rua sem saida",
  city: "Algum lugar",
  state: "AA",
  zipCode: "00000-000",
  items: [
    {
      id: "1",
      name: "Item 1",
      price: 10,
    },
    {
      id: "2",
      name: "Item 2",
      price: 20,
    },
  ],
};

const output = {
  id: new Id("123"),
  name: "Antonio",
  document: "123123",
  street: "Avenida",
  number: "123",
  complement: "Rua sem saida",
  city: "Algum lugar",
  state: "AA",
  zipCode: "00000-000",
  items: [
    {
      id: "1",
      name: "Item 1",
      price: 10,
    },
    {
      id: "2",
      name: "Item 2",
      price: 20,
    },
  ],
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(output)),
    generate: jest.fn().mockReturnValue(Promise.resolve(output)),
  };
};

describe("generate invoice usecase", () => {
  it("should generate a invoice", async () => {
    const invoiceRepository = MockRepository();

    const usecase = new GenerateInvoiceUseCase(invoiceRepository);
    const result = await usecase.execute(input);

    expect(invoiceRepository.generate).toHaveBeenCalled();
    expect(result.id).toBe("123");
    expect(result.name).toBe("Antonio");
    expect(result.document).toBe("123123");
    expect(result.city).toBe("Algum lugar");
    expect(result.complement).toBe("Rua sem saida");
    expect(result.number).toBe("123");
    expect(result.state).toBe("AA");
    expect(result.street).toBe("Avenida");
    expect(result.zipCode).toBe("00000-000");
    expect(result.total).toBe(30);
  });
});
