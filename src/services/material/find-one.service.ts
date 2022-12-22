import { Injectable } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { FindOneMaterial } from 'src/types/material'

@Injectable()
export class FindOneMaterialService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(material: FindOneMaterial) {
    const materialFind = await this.prisma.material
      .findFirst({
        where: {
          code_material: material.code_material,
        },
      })
      .finally(async () => await this.prisma.$disconnect())
    return materialFind
  }
}
