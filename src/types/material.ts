import { IsNotEmpty } from 'class-validator'

export class CreateMaterial {
  @IsNotEmpty()
  code_material: string

  @IsNotEmpty()
  description: string

  @IsNotEmpty()
  batch: string

  @IsNotEmpty()
  shelf_life: Date

  @IsNotEmpty()
  amount: number
}

export class DeleteMaterial {
  @IsNotEmpty()
  code_material: string
}

export class FindOneMaterial {
  @IsNotEmpty()
  code_material: string
}

export class UpdateMaterial {
  @IsNotEmpty()
  code_material: string

  @IsNotEmpty()
  description: string

  @IsNotEmpty()
  batch: string

  @IsNotEmpty()
  shelf_life: Date

  @IsNotEmpty()
  amount: number
}
