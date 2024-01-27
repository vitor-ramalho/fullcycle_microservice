import crypto from "crypto";
import { PrismaClient } from "@prisma/client";
import TransactionRepository from "../../repository/TransactionRepository";
import Transaction from "src/application/domain/entities/Transaction";

export default class TransactionRepositoryDatabase implements TransactionRepository{
  private readonly prisma: PrismaClient;
  constructor(){
    this.prisma =  new PrismaClient();
  }
  async save(transaction: Transaction): Promise<void> {
    const transactionId = crypto.randomUUID();
    await this.prisma.transaction.create({
      data: {
        transaction_id: transactionId,
        ticket_id: transaction.ticketId,
        event_id: transaction.eventId,
        status: transaction.status,
        price: transaction.price,
        tid: transaction.tid,
      }
    })
    await this.prisma.$disconnect();
  }
}