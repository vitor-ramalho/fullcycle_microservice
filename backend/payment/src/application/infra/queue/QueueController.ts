import TicketReserved from "src/application/domain/event/TicketReserved";
import Queue from "./Queue";
import Registry from "../registry/Registry";
import PaymentApproved from "src/application/domain/event/PaymentApproved";

export default class QueueController {
  constructor(readonly registry: Registry) {
    const queue = registry.inject("queue");
    const processPayment = registry.inject("processPayment");
    queue.on("ticketReserved", async function (event: Input) {
      console.log("event", event);
      await processPayment.execute(event);
    });
  }
}

type Input = {
  ticketId: string;
  eventId: string;
  email: string;
  price: number;
  creditCardToken: string;
};
