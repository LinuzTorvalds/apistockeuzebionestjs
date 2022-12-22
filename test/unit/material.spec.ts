import { describe, it, expect } from 'vitest'
import { randomUUID } from 'node:crypto'
import { PrismaService } from 'prisma/prisma.service'
import { CreateMaterialService } from 'src/services/material/create.service'
import { FindOneMaterialService } from 'src/services/material/find-one.service'
import {
  DeleteMaterial,
  FindOneMaterial,
  UpdateMaterial,
} from 'src/types/material'
import { RetrieveMaterialService } from 'src/services/material/retrieve.service'
import { UpdateMaterialService } from 'src/services/material/update.service'
import { DeleteMaterialService } from 'src/services/material/delete.service'

const prisma = new PrismaService()

describe('Material service test switch', () => {
  it(' should create a new material if not exists', async () => {
    const createMaterialService = new CreateMaterialService(prisma)
    const shelf_life_valid = new Date()
    shelf_life_valid.setDate(shelf_life_valid.getDate() + 1)
    const material = {
      amount: 2,
      batch: '1',
      code_material: '1',
      description: 'service',
      shelf_life: shelf_life_valid,
      code_pk: randomUUID(),
    }
    const response = await createMaterialService.create(material)
    expect(response).toHaveProperty('code_material')
  })

  it(' should find one material if exists', async () => {
    const findOneMaterialService = new FindOneMaterialService(prisma)
    const material: FindOneMaterial = {
      code_material: '1',
    }
    const response = await findOneMaterialService.findOne(material)
    expect(response).toHaveProperty('code_material')
  })

  it(' should retrieve all existing material', async () => {
    const retrieveMaterialService = new RetrieveMaterialService(prisma)
    const response = await retrieveMaterialService.retrieve()
    expect(response.length).toBeGreaterThan(0)
  })

  it(' should update a material if exists', async () => {
    const findOneMaterialService = new FindOneMaterialService(prisma)
    const updateMaterialService = new UpdateMaterialService(prisma)
    const material: FindOneMaterial = {
      code_material: '1',
    }
    const exisitingMaterial = await findOneMaterialService.findOne(material)
    const updateMaterial: UpdateMaterial = {
      amount: (exisitingMaterial.amount = 2),
      batch: exisitingMaterial.batch,
      code_material: exisitingMaterial.code_material,
      description: exisitingMaterial.description,
      shelf_life: exisitingMaterial.shelf_life,
    }
    const response = await updateMaterialService.update(updateMaterial)
    expect(response).toHaveProperty('code_material')
  })

  it(' should delete a existing material if exists', async () => {
    const deleteMaterialService = new DeleteMaterialService(prisma)
    const material: DeleteMaterial = {
      code_material: '1',
    }
    const response = await deleteMaterialService.delete(material)
    expect(response).toHaveProperty('code_material')
  })
})
