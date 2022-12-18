import { PrismaService } from 'prisma/prisma.service'
import { CreateHistoryService } from 'src/services/history/create.service'
import { DeleteHistoryService } from 'src/services/history/delete.service'
import { FindByDateHistoryService } from 'src/services/history/find-by-date.service'
import { FindOneHistoryService } from 'src/services/history/find-one.service'
import { RetrieveHistoryService } from 'src/services/history/retrieve.service'
import { UpdateHistoryService } from 'src/services/history/update.service'
import { DeleteHistory, FindByDateHistory, FindOneHistory, UpdateHistory } from 'src/types/history'
import { describe, it, expect } from 'vitest'

const prisma = new PrismaService()

describe('History service test switch', () => {
  it(' should create a new history if not exists', async () => {
    const createHistoryService = new CreateHistoryService(prisma)
    const shelf_life = new Date()
    shelf_life.setDate(shelf_life.getDate() + 1)
    const history = {
      batch: '1',
      code_material: '1',
      date_of_use: new Date(),
      description: ' service',
      quantity_used: 1,
      shelf_life: shelf_life,
      code_pk: '1',
    }
    const response = await createHistoryService.create(history)
    expect(response).toHaveProperty('description')
  })

  it(' should retrieve all existing histiory', async () => {
    const retrieveHistoryService = new RetrieveHistoryService(prisma)
    const response = await retrieveHistoryService.retrieve()
    expect(response.length).toBeGreaterThan(0)
  })

  it(' should find one history if exists', async () => {
    const retrieveHistoryService = new RetrieveHistoryService(prisma)
    const exisitingHistoryArray = await retrieveHistoryService.retrieve()
    const findOneHistoryService = new FindOneHistoryService(prisma)
    const history: FindOneHistory = {
      code_pk: exisitingHistoryArray[0].code_pk
    }
    const response = await findOneHistoryService.findOne(history)
    expect(response).toHaveProperty('description')
  })

  it(' should find by date existing histiory', async () => {
    const findByDateHistoryService = new FindByDateHistoryService(prisma)
    const start_date = new Date(),
      end_date = new Date()
    start_date.setDate(start_date.getDate() - 10)
    end_date.setDate(end_date.getDate() + 10)
    const history: FindByDateHistory = {
      start_date: start_date,
      end_date: end_date
    }
    const response = await findByDateHistoryService.findByDate(history)
    expect(response.length).toBeGreaterThan(0)
  })

  it(' should update a history if exists', async () => {
    const retrieveHistoryService = new RetrieveHistoryService(prisma)
    const exisitingHistoryArray = await retrieveHistoryService.retrieve()
    const findOneHistoryService = new FindOneHistoryService(prisma)
    const updateHistoryService = new UpdateHistoryService(prisma)
    const findOne: FindOneHistory = { 
      code_pk: exisitingHistoryArray[0].code_pk
    }
    const exisitingHistory = await findOneHistoryService.findOne(findOne)
    const history: UpdateHistory = {
      batch: exisitingHistory.batch,
      code_material: exisitingHistory.code_material,
      code_pk: exisitingHistory.code_pk,
      date_of_use: exisitingHistory.date_of_use,
      description: exisitingHistory.description,
      quantity_used: exisitingHistory.quantity_used = 2,
      shelf_life: exisitingHistory.shelf_life
    }
    const response = await updateHistoryService.update(history)
    expect(response).toHaveProperty('description')
  })

  it(' should delete a existing history if exists', async () => {
    const retrieveHistoryService = new RetrieveHistoryService(prisma)
    const exisitingHistoryArray = await retrieveHistoryService.retrieve()
    const deleteHistoryService = new DeleteHistoryService(prisma)
    const history: DeleteHistory = {
      code_pk: exisitingHistoryArray[0].code_pk
    }
    const response = await deleteHistoryService.delete(history)
    expect(response).toHaveProperty('description')
  })
})
