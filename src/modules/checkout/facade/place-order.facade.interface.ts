import { PlaceOrderOutputDto } from "../usecase/place-order/place-order.dto";

export interface PlaceOrderFacadeInputDto {
  clientId: string;
  products: {
    productId: string;
  }[];
}

export interface PlaceOrderFacadeOutputDto {
  id: string;
  invoiceId: string;
  status: string;
  total: number;
  products: {
    productId: string;
  }[];
}

export default interface PlaceOrderFacadeInterface {
  create(input: PlaceOrderFacadeInputDto): Promise<PlaceOrderOutputDto>;
}
