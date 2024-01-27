import Transaction from "../domain/entities/Transaction";
import PaymentApproved from "../domain/event/PaymentApproved";
import PaymentGateway from "../gateway/PaymentGateway";
import Queue from "../infra/queue/Queue";
import Registry from "../infra/registry/Registry";
import TransactionRepository from "../repository/TransactionRepository";

export default class ProcessPayment {
  transactionRepository: TransactionRepository;
  paymentGateway: PaymentGateway;
  queue: Queue;
  constructor(readonly registry: Registry) {
    this.transactionRepository = registry.inject("transactionRepository");
    this.paymentGateway = registry.inject("paymentGateway");
    this.queue = registry.inject("queue");
  }

  async execute(input: Input): Promise<Output> {
    console.log("input", input);
    const output = await this.paymentGateway.createTransaction({
      email: input.email,
      creditCardToken: input.creditCardToken,
      price: input.price,
    });
    const transaction = {
      ticketId: input.ticketId,
      eventId: input.eventId,
      tid: output.tid,
      price: input.price,
      status: output.status,
    };

    console.log("transaction", input);
    await this.transactionRepository.save({
      ticketId: input.ticketId,
      eventId: input.eventId,
      tid: output.tid,
      price: input.price,
      status: output.status
    });
    if (output.status === "approved") {
      const paymentApproved = new PaymentApproved(input.ticketId);
      await this.queue.publish("paymentApproved", paymentApproved);
    }
    return {
      status: output.status,
      tid: transaction.tid,
      price: transaction.price,
    };
  }
}

type Input = {
  ticketId: string;
  eventId: string;
  email: string;
  price: number;
  creditCardToken: string;
};

type Output = {
  status: string;
  tid: string;
  price: number;
};
