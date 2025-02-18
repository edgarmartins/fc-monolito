import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import InvoiceFacadeInterface, {
  FindInvoiceFacadeInputDTO,
  FindInvoiceFacadeOutputDTO,
  GenerateInvoiceFacadeInputDto,
  GenerateInvoiceFacadeOutputDto,
} from "./invoice.facade.interface";

export interface FacadeProps {
  find: UseCaseInterface;
  generate: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
  private _find: UseCaseInterface;
  private _generate: UseCaseInterface;

  constructor(facadeProps: FacadeProps) {
    this._find = facadeProps.find;
    this._generate = facadeProps.generate;
  }
  async generate(
    input: GenerateInvoiceFacadeInputDto
  ): Promise<GenerateInvoiceFacadeOutputDto> {
    return await this._generate.execute(input);
  }
  async find(
    input: FindInvoiceFacadeInputDTO
  ): Promise<FindInvoiceFacadeOutputDTO> {
    return await this._find.execute(input);
  }
}
