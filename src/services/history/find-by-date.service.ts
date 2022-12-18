import { Injectable } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { FindByDateHistory, FindByDateHistoryResponse } from 'src/types/history'

@Injectable()
export class FindByDateHistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findByDate(history: FindByDateHistory) {
    const response: FindByDateHistoryResponse[] = await this.prisma.$queryRaw<FindByDateHistoryResponse[]
    >`select * from history where date_of_use between 
    ${history.start_date} and ${history.end_date} order by description`
    .finally(async () => await this.prisma.$disconnect())
    return response
  }
}
