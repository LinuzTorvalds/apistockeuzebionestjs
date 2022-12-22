import { Module } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { HistoryController } from 'src/controllers/history.controller'
import { CreateHistoryService } from 'src/services/history/create.service'
import { DeleteHistoryService } from 'src/services/history/delete.service'
import { FindByDateHistoryService } from 'src/services/history/find-by-date.service'
import { FindOneHistoryService } from 'src/services/history/find-one.service'
import { RetrieveHistoryService } from 'src/services/history/retrieve.service'
import { UpdateHistoryService } from 'src/services/history/update.service'

@Module({
  imports: [],
  controllers: [HistoryController],
  providers: [
    PrismaService,
    CreateHistoryService,
    DeleteHistoryService,
    FindByDateHistoryService,
    FindOneHistoryService,
    RetrieveHistoryService,
    UpdateHistoryService,
  ],
})
export class HistoryModule {}
