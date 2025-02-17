import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { PlaceOrderOutputDto } from "../usecase/place-order/place-order.dto";
import PlaceOrderFacadeInterface, {
  PlaceOrderFacadeInputDto,
} from "./place-order.facade.interface";

export interface FacadeProps {
  create: UseCaseInterface;
}

export default class PlaceOrderFacade implements PlaceOrderFacadeInterface {
  private _create: UseCaseInterface;

  constructor(facadeProps: FacadeProps) {
    this._create = facadeProps.create;
  }

  async create(input: PlaceOrderFacadeInputDto): Promise<PlaceOrderOutputDto> {
    return await this._create.execute(input);
  }
}
