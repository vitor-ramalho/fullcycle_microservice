import Registry from "./application/infra/registry/Registry";
import FakePaymentGateway from "./application/infra/gateway/FakePaymentGateway";
import TransactionRepositoryDatabase from "./application/infra/repository/TransactionRepositoryDatabase";
import ProcessPayment from "./application/usecase/ProcessPayment";
import RabbitMQAdapter from "./application/infra/queue/RabbitMQAdapter";
import QueueController from "./application/infra/queue/QueueController";

async function main() {
  
  const queue = new RabbitMQAdapter();
  await queue.connect();
  
  const registry = new Registry();
  registry.provide(
    "transactionRepository",
    new TransactionRepositoryDatabase()
    );
    registry.provide("paymentGateway", new FakePaymentGateway());
    registry.provide("queue", queue);
    registry.provide("processPayment", new ProcessPayment(registry));
    new QueueController(registry);
}

main();
