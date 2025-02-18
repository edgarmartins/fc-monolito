import express, { Request, Response } from "express";
import Address from "../../../modules/@shared/domain/value-object/address";
import ClientRepository from "../../../modules/client-adm/repository/client.repository";
import AddClientUseCase from "../../../modules/client-adm/usecase/add-client/add-client.usecase";
import FindClientUseCase from "../../../modules/client-adm/usecase/find-client/find-client.usecase";
import ClientAdmFacade from "../../../modules/client-adm/facade/client-adm.facade";

export const clientsRoute = express.Router();

clientsRoute.post("/", async (req: Request, res: Response) => {
  const facade = new ClientAdmFacade({
    addUsecase: new AddClientUseCase(new ClientRepository()),
    findUsecase: new FindClientUseCase(new ClientRepository()),
  });

  try {
    const clientInputDto = {
      name: req.body.name,
      email: req.body.email,
      document: req.body.document,
      address: new Address(
        req.body.address.street,
        req.body.address.number,
        req.body.address.complement,
        req.body.address.city,
        req.body.address.state,
        req.body.address.zipCode
      ),
    };

    const output = await facade.add(clientInputDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

clientsRoute.get("/:clientID", async (req: Request, res: Response) => {
  const facade = new ClientAdmFacade({
    addUsecase: new AddClientUseCase(new ClientRepository()),
    findUsecase: new FindClientUseCase(new ClientRepository()),
  });

  const input = { id: req.params.clientID };
  const output = await facade.find(input);

  res.format({
    json: async () => res.send(output),
  });
});
