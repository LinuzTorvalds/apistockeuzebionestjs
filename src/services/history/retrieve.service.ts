import { Injectable } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'

@Injectable()
export class RetrieveHistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async retrieve() {
    const response = await this.prisma.history
      .findMany()
      .finally(async () => await this.prisma.$disconnect())
    return response
  }
}
