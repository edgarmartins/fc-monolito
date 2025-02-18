import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { productsRoute } from "./routes/products.route";
import { clientsRoute } from "./routes/clients.route";
import { invoicesRoute } from "./routes/invoices.route";
import { checkoutsRoute } from "./routes/checkouts.route";

export const app: Express = express();
app.use(express.json());
app.use("/products", productsRoute);
app.use("/clients", clientsRoute);
app.use("/invoices", invoicesRoute);
app.use("/checkout", checkoutsRoute);

// export let sequelize: Sequelize;

// async function setupDb() {
//   sequelize = new Sequelize({
//     dialect: "sqlite",
//     storage: ":memory:",
//     logging: false,
//   });
//   await sequelize.addModels([
//     ProductModel,
//     // ClientModel,
//     // InvoiceModel,
//     // InvoiceItemModel,
//     // OrderModel,
//     // TransactionModel,
//   ]);
//   await sequelize.sync();
// }
// setupDb();
