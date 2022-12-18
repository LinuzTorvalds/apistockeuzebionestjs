import { Injectable } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { CreateMaterial } from 'src/types/material'
import { randomUUID } from 'node:crypto'

@Injectable()
export class CreateMaterialService {
  constructor(private readonly prisma: PrismaService) {}

  async create(material: CreateMaterial) {
    const response = await this.prisma.material
      .create({
        data: {
          amount: material.amount,
          description: material.description,
          batch: material.batch,
          code_material: material.code_material,
          shelf_life: material.shelf_life,
          code_pk: randomUUID(),
        },
      }).finally(async () => await this.prisma.$disconnect())
      return response
  }
}
