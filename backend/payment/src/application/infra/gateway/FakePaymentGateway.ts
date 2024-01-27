import PaymentGateway, {Input, Output} from "src/application/gateway/PaymentGateway";

export default class FakePaymentGateway implements PaymentGateway {
  async createTransaction(transaction: Input): Promise<Output> {
    return {
      tid: "12345678",
      status: "approved"
    }
  }
}