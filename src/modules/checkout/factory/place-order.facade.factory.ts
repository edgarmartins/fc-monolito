import ClientAdmFacadeFactory from "../../client-adm/factory/client-adm.facade.factory";
import InvoiceFacadeFactory from "../../invoice/factory/invoice.facade.factory";
import PaymentFacadeFactory from "../../payment/factory/payment.facade.factory";
import ProductAdmFacadeFactory from "../../product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../store-catalog/factory/facade.factory";
import PlaceOrderFacade from "../facade/place-order.facade";
import PlaceOrderFacadeInterface from "../facade/place-order.facade.interface";
import PlaceOrderUseCase from "../usecase/place-order/place-order.usecase";

export default class PlaceOrderFacadeFactory {
  static create(): PlaceOrderFacadeInterface {
    const createPlaceOrderUseCase = new PlaceOrderUseCase(
      ClientAdmFacadeFactory.create(),
      ProductAdmFacadeFactory.create(),
      StoreCatalogFacadeFactory.create(),
      null,
      InvoiceFacadeFactory.create(),
      PaymentFacadeFactory.create()
    );

    const invoiceFacade = new PlaceOrderFacade({
      create: createPlaceOrderUseCase,
    });

    return invoiceFacade;
  }
}
