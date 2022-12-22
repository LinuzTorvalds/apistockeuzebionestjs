import { Injectable } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { CreateHistory } from 'src/types/history'
import { randomUUID } from 'node:crypto'

@Injectable()
export class CreateHistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(history: CreateHistory) {
    const response = await this.prisma.history
      .create({
        data: {
          quantity_used: history.quantity_used,
          description: history.description,
          batch: history.batch,
          code_material: history.code_material,
          shelf_life: history.shelf_life,
          date_of_use: history.date_of_use,
          code_pk: randomUUID(),
        },
      })
      .finally(async () => await this.prisma.$disconnect())
    return response
  }
}
