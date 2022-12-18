import { Injectable } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { DeleteMaterial } from 'src/types/material'

@Injectable()
export class DeleteMaterialService {
  constructor(private readonly prisma: PrismaService) {}

  async delete(material: DeleteMaterial) {
    const response = await this.prisma.material
      .delete({
        where: {
          code_material: material.code_material,
        },
      }).finally(async () => await this.prisma.$disconnect())
      return response
  }
}
