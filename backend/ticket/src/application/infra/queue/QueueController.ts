import TicketReserved from "src/application/domain/event/TicketReserved";
import Queue from "./Queue";
import Registry from "../registry/Registry";
import PaymentApproved from "src/application/domain/event/PaymentApproved";

export default class QueueController {
  constructor(readonly registry: Registry) {
    const queue = registry.inject("queue");
    const approveTicket = registry.inject("approveTicket");

    queue.on("paymentApproved", async function (event: PaymentApproved) {
      await approveTicket.execute(event);
      console.log('approve', event);
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
