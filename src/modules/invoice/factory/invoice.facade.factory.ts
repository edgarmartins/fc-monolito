import InvoiceFacade from "../facade/invoice.facade";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";

export default class InvoiceFacadeFactory {
  static create(): InvoiceFacade {
    return new InvoiceFacade({
      findUsecase: new FindInvoiceUseCase(new InvoiceRepository()),
      generateUsecase: new GenerateInvoiceUseCase(new InvoiceRepository()),
    });
  }
}
