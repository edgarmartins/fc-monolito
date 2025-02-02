import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import InvoiceFacadeInterface, {
  FindInvoiceFacadeInputDTO,
  FindInvoiceFacadeOutputDTO,
  GenerateInvoiceFacadeInputDTO,
} from "./invoice.facade.interface";

export interface InvoiceProps {
  findUsecase: FindInvoiceUseCase;
  generateUsecase: GenerateInvoiceUseCase;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
  constructor(private _props: InvoiceProps) {}

  async generate(input: GenerateInvoiceFacadeInputDTO): Promise<void> {
    await this._props.generateUsecase.execute(input);
  }

  async find(
    input: FindInvoiceFacadeInputDTO
  ): Promise<FindInvoiceFacadeOutputDTO> {
    return await this._props.findUsecase.execute(input);
  }
}
