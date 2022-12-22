import { Injectable } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { UpdateHistory } from 'src/types/history'

@Injectable()
export class UpdateHistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async update(history: UpdateHistory) {
    const response = await this.prisma.history
      .update({
        data: {
          quantity_used: history.quantity_used,
          description: history.description,
          batch: history.batch,
          code_material: history.code_material,
          shelf_life: history.shelf_life,
          date_of_use: history.date_of_use,
        },
        where: {
          code_pk: history.code_pk,
        },
      })
      .finally(async () => await this.prisma.$disconnect())
    return response
  }
}
