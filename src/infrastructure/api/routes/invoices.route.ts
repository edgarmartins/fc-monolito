import express, { Request, Response } from "express";
import InvoiceRepository from "../../../modules/invoice/repository/invoice.repository";
import FindInvoiceUseCase from "../../../modules/invoice/usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../../../modules/invoice/usecase/generate-invoice/generate-invoice.usecase";

export const invoicesRoute = express.Router();

invoicesRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new GenerateInvoiceUseCase(new InvoiceRepository());
  try {
    const invoiceInputDto = {
      name: req.body.name,
      document: req.body.document,
      street: req.body.street,
      number: req.body.number,
      complement: req.body.complement,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
      items: req.body.items,
    };

    const output = await usecase.execute(invoiceInputDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

invoicesRoute.get("/:invoiceID", async (req: Request, res: Response) => {
  const usecase = new FindInvoiceUseCase(new InvoiceRepository());
  const input = { id: req.params.invoiceID };
  const output = await usecase.execute(input);

  res.format({
    json: async () => res.send(output),
  });
});
