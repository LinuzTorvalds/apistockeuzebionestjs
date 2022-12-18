import { Module } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { MaterialController } from 'src/controllers/material.controller'
import { CreateMaterialService } from 'src/services/material/create.service'
import { DeleteMaterialService } from 'src/services/material/delete.service'
import { FindOneMaterialService } from 'src/services/material/find-one.service'
import { RetrieveMaterialService } from 'src/services/material/retrieve.service'
import { UpdateMaterialService } from 'src/services/material/update.service'

@Module({
  imports: [],
  controllers: [MaterialController],
  providers: [PrismaService, CreateMaterialService, DeleteMaterialService, 
    FindOneMaterialService, RetrieveMaterialService, UpdateMaterialService]
})
export class MaterialModule {}