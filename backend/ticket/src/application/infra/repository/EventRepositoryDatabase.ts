import { PrismaClient } from "@prisma/client";
import Event from "../../domain/entities/Event";
import EventRepository from "src/application/repository/EventRepository";

export default class EventRepositoryDatabase implements EventRepository {
  private readonly prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async get(eventId: string): Promise<Event> {
    const eventData = await this.prisma.event.findUnique({
      where: {
        event_id: eventId,
      },
    });
    await this.prisma.$disconnect();
    return new Event(
      eventData.event_id,
      eventData.description,
      eventData.price,
      eventData.capacity
    );
  }
}
