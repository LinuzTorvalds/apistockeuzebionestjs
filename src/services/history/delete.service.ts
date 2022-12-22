import { Injectable } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { DeleteHistory } from 'src/types/history'

@Injectable()
export class DeleteHistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async delete(history: DeleteHistory) {
    const response = await this.prisma.history
      .delete({
        where: {
          code_pk: history.code_pk,
        },
      })
      .finally(async () => await this.prisma.$disconnect())
    return response
  }
}
