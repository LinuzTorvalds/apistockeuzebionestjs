import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common'
import { CreateHistoryService } from 'src/services/history/create.service'
import { DeleteHistoryService } from 'src/services/history/delete.service'
import { FindByDateHistoryService } from 'src/services/history/find-by-date.service'
import { FindOneHistoryService } from 'src/services/history/find-one.service'
import { RetrieveHistoryService } from 'src/services/history/retrieve.service'
import { UpdateHistoryService } from 'src/services/history/update.service'
import {
  CreateHistory,
  DeleteHistory,
  FindByDateHistory,
  FindOneHistory,
  UpdateHistory,
} from 'src/types/history'

@Controller('historys')
export class HistoryController {
  constructor(
    private readonly createHistoryService: CreateHistoryService,
    private readonly deleteHistoryServive: DeleteHistoryService,
    private readonly findByDateHistoryServive: FindByDateHistoryService,
    private readonly findOneHistoryServive: FindOneHistoryService,
    private readonly retrieveHistoryServive: RetrieveHistoryService,
    private readonly updateHistorySerive: UpdateHistoryService
  ) {}

  @Get('/')
  homeHistorys(): string {
    return 'Home Historys'
  }

  @Post('create')
  async createHistory(@Body() History: CreateHistory) {
    return this.createHistoryService.create(History)
  }

  @Delete('delete')
  async deleteHistory(@Body() History: DeleteHistory) {
    return this.deleteHistoryServive.delete(History)
  }

  @Get('findByDate')
  async findByDate(@Body() History: FindByDateHistory) {
    return this.findByDateHistoryServive.findByDate(History)
  }

  @Get('findOne')
  async findOneHistory(@Body() History: FindOneHistory) {
    return this.findOneHistoryServive.findOne(History)
  }

  @Get('retrieve')
  async retrieveAllHistorys() {
    return this.retrieveHistoryServive.retrieve()
  }

  @Put('update')
  async updateHistory(@Body() History: UpdateHistory) {
    return this.updateHistorySerive.update(History)
  }
}
