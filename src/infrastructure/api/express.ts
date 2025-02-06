import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { productsRoute } from "./routes/products.route";
import { ProductModel } from "../../modules/product-adm/repository/product.model";
import { clientsRoute } from "./routes/clients.route";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import { invoicesRoute } from "./routes/invoices.route";
import InvoiceModel from "../../modules/invoice/repository/invoice.model";
import InvoiceItemModel from "../../modules/invoice/repository/invoice-item.model";
import { checkoutsRoute } from "./routes/checkouts.route";
import OrderModel from "../../modules/checkout/repository/order.model";
import TransactionModel from "../../modules/payment/repository/transaction.model";

export const app: Express = express();
app.use(express.json());
app.use("/products", productsRoute);
app.use("/clients", clientsRoute);
app.use("/invoices", invoicesRoute);
app.use("/checkout", checkoutsRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  await sequelize.addModels([
    ProductModel,
    ClientModel,
    InvoiceModel,
    InvoiceItemModel,
    OrderModel,
    TransactionModel,
  ]);
  await sequelize.sync();
}
setupDb();
