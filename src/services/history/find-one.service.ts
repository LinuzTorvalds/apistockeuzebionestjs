import { Injectable } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { FindOneHistory } from 'src/types/history'

@Injectable()
export class FindOneHistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(history: FindOneHistory) {
    const response = await this.prisma.history
    .findFirst({
      where: { 
        code_pk: history.code_pk
      }
    }).finally(async () => await this.prisma.$disconnect())
    return response
  }
}
