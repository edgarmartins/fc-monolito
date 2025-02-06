import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import OrderModel from "./order.model";

export default class OrderRepository implements CheckoutGateway {
  async addOrder(order: Order): Promise<Order> {
    const products = order.products.map((product) => {
      return {
        id: product.id.id,
        name: product.name,
        salesPrice: product.salesPrice,
      };
    });

    await OrderModel.create({
      id: order.id.id,
      client: {
        id: order.client.id.id,
        email: order.client.email,
        name: order.client.name,
      },
    });

    const result = await OrderModel.findOne({ where: { id: order.id.id } });

    return new Order({
      id: new Id(result.id),
      client: new Client({
        id: new Id(result.client.id),
        name: result.client.name,
        address: result.client.street,
        email: result.client.email,
      }),
      products: [],
    });
  }

  async findOrder(id: string): Promise<Order | null> {
    const result = await OrderModel.findOne({ where: { id } });

    return new Order({
      id: new Id(result.id),
      client: new Client({
        id: new Id(result.client.id),
        name: result.client.name,
        address: result.client.street,
        email: result.client.email,
      }),
      products: [],
    });
  }
}
