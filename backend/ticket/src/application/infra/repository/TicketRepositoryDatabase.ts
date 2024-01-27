import Ticket from "../../domain/entities/Ticket";
import TicketRepository from "src/application/repository/TicketRepository";
import { PrismaClient } from "@prisma/client";

export default class TicketRepositoryDatabase implements TicketRepository {
  private readonly prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async save(ticket: Ticket): Promise<void> {
    await this.prisma.ticket.create({
      data: {
        ticket_id: ticket.ticketId,
        event_id: ticket.eventId,
        email: ticket.email,
        status: ticket.status,
      },
    });
    await this.prisma.$disconnect();
  }
  async update(ticket: Ticket): Promise<void> {
    await this.prisma.ticket.update({
      where: {
        ticket_id: ticket.ticketId,
      },
      data: {
        status: ticket.status,
      },
    });
  }

  async get(ticketId: string): Promise<Ticket> {
    const ticketData = await this.prisma.ticket.findUnique({
      where: {
        ticket_id: ticketId,
      },
    });

    return new Ticket(
      ticketData.ticket_id,
      ticketData.event_id,
      ticketData.email,
      ticketData.status
    );
  }
}
