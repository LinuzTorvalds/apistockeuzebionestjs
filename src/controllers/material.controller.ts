import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common'
import { CreateMaterialService } from 'src/services/material/create.service'
import { DeleteMaterialService } from 'src/services/material/delete.service'
import { FindOneMaterialService } from 'src/services/material/find-one.service'
import { RetrieveMaterialService } from 'src/services/material/retrieve.service'
import { UpdateMaterialService } from 'src/services/material/update.service'
import {
  CreateMaterial,
  DeleteMaterial,
  FindOneMaterial,
  UpdateMaterial,
} from 'src/types/material'

@Controller('materials')
export class MaterialController {
  constructor(
    private readonly createMaterialService: CreateMaterialService,
    private readonly deleteMaterialServive: DeleteMaterialService,
    private readonly findOneMaterialServive: FindOneMaterialService,
    private readonly retrieveMaterialServive: RetrieveMaterialService,
    private readonly updateMaterialSerive: UpdateMaterialService
  ) {}

  @Get('/')
  homeMaterials(): string {
    return 'Home Materials'
  }

  @Post('create')
  async createMaterial(@Body() Material: CreateMaterial) {
    return this.createMaterialService.create(Material)
  }

  @Delete('delete')
  async deleteMaterial(@Body() Material: DeleteMaterial) {
    return this.deleteMaterialServive.delete(Material)
  }

  @Get('findOne')
  async findOneMaterial(@Body() Material: FindOneMaterial) {
    return this.findOneMaterialServive.findOne(Material)
  }

  @Get('retrieve')
  async retrieveAllMaterials() {
    return this.retrieveMaterialServive.retrieve()
  }

  @Put('update')
  async updateMaterial(@Body() Material: UpdateMaterial) {
    return this.updateMaterialSerive.update(Material)
  }
}
