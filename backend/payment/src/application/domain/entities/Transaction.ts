
export default class Transaction {
  private constructor(
    readonly ticketId: string,
    readonly eventId: string,
    readonly tid: string,
    readonly price: number,
    readonly status: string
  ) {}

  static create(
    ticketId: string,
    eventId: string,
    tid: string,
    price: number,
    status: string
  ) {
    return new Transaction(
      ticketId,
      eventId,
      tid,
      price,
      status
    );
  }
}
