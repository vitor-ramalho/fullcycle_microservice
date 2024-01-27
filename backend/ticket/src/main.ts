import express, { Request, Response } from "express";
import PurchaseTicket from "./application/usecase/PurchaseTicket";
import Registry from "./application/infra/registry/Registry";
import TicketRepositoryDatabase from "./application/infra/repository/TicketRepositoryDatabase";
import EventRepositoryDatabase from "./application/infra/repository/EventRepositoryDatabase";



import RabbitMQAdapter from "./application/infra/queue/RabbitMQAdapter";
import QueueController from "./application/infra/queue/QueueController";
import ApproveTicket from "./application/usecase/ApproveTicket";

async function main() {
  const app = express();
  app.use(express.json());
  
  const queue = new RabbitMQAdapter();
  await queue.connect();
  
  const registry = new Registry();
  registry.provide("ticketRepository", new TicketRepositoryDatabase());
  registry.provide("eventRepository", new EventRepositoryDatabase());
    registry.provide("queue", queue);
    registry.provide("approveTicket", new ApproveTicket(registry));
    new QueueController(registry);

  app.post("/purchase_ticket", async function (req: Request, res: Response) {
    const purchaseTicket = new PurchaseTicket(registry);
    const output = await purchaseTicket.execute(req.body);
    res.json(output);
  });

  app.get('/', function (req, res){
    res.send('Hello')
  })

  app.listen(3000);
}

main();
