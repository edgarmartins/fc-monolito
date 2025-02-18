import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice";
import InvoiceItems from "../domain/invoice-items";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceItemsModel from "./invoice-items.model";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findByPk(id, {
      include: [{ model: InvoiceItemsModel, as: "items" }],
    });

    return new Invoice({
      id: new Id(invoice.id),
      name: invoice.name,
      document: invoice.document,
      address: new Address(
        invoice.street,
        invoice.number,
        invoice.complement,
        invoice.city,
        invoice.state,
        invoice.zipCode
      ),
      items: invoice.items.map((item) => {
        return new InvoiceItems({
          id: new Id(item.id),
          name: item.name,
          price: item.price,
        });
      }),
    });
  }
  async generate(input: Invoice): Promise<Invoice> {
    await InvoiceModel.create({
      id: input.id.id,
      name: input.name,
      document: input.document,
      street: input.address.street,
      number: input.address.number,
      complement: input.address.complement,
      city: input.address.city,
      state: input.address.state,
      zipCode: input.address.zipCode,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    });

    input.items.map(async (item) => {
      await InvoiceItemsModel.create({
        id: item.id.id,
        name: item.name,
        price: item.price,
        invoice_id: input.id.id,
      });
    });

    const result = await InvoiceModel.findByPk(input.id.id, {
      include: [{ model: InvoiceItemsModel, as: "items" }],
    });

    return new Invoice({
      id: new Id(result.id),
      name: result.name,
      document: result.document,
      address: new Address(
        result.street,
        result.number,
        result.complement,
        result.city,
        result.state,
        result.zipCode
      ),
      items: result.items.map((item) => {
        return new InvoiceItems({
          id: new Id(item.id),
          name: item.name,
          price: item.price,
        });
      }),
    });
  }
}
