import { Injectable } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { UpdateMaterial } from 'src/types/material'

@Injectable()
export class UpdateMaterialService {
  constructor(private readonly prisma: PrismaService) {}

  async update(material: UpdateMaterial) {
    const response = await this.prisma.material
      .update({
        data: {
          amount: material.amount,
          description: material.description,
          batch: material.batch,
          code_material: material.code_material,
          shelf_life: material.shelf_life,
        },
        where: {
          code_material: material.code_material,
        },
      }).finally(async () => await this.prisma.$disconnect())
      return response
  }
}
