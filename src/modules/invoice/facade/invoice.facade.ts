import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import InvoiceFacadeInterface, {
  FindInvoiceFacadeInputDTO,
  FindInvoiceFacadeOutputDTO,
  GenerateInvoiceFacadeInputDTO,
  GenerateInvoiceFacadeOutputDTO,
} from "./invoice.facade.interface";

export interface InvoiceProps {
  findUsecase: FindInvoiceUseCase;
  generateUsecase: GenerateInvoiceUseCase;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
  constructor(private _props: InvoiceProps) {}

  async generate(
    input: GenerateInvoiceFacadeInputDTO
  ): Promise<GenerateInvoiceFacadeOutputDTO> {
    const result = await this._props.generateUsecase.execute(input);

    return {
      id: result.id,
      name: result.name,
      document: result.document,
      street: result.street,
      number: result.number,
      complement: result.complement,
      city: result.city,
      state: result.state,
      zipCode: result.zipCode,
      items: result.items,
      total: result.total,
    };
  }

  async find(
    input: FindInvoiceFacadeInputDTO
  ): Promise<FindInvoiceFacadeOutputDTO> {
    return await this._props.findUsecase.execute(input);
  }
}
