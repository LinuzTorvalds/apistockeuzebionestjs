export class CreateHistory {
  code_material: string
  description: string
  batch: string
  shelf_life: Date
  quantity_used: number
  date_of_use: Date
}

export class DeleteHistory {
  code_pk: string
}

export class FindByDateHistory {
  start_date: Date
  end_date: Date
}

export class FindOneHistory {
  code_pk: string
}

export class UpdateHistory {
  code_material: string
  description: string
  batch: string
  shelf_life: Date
  quantity_used: number
  date_of_use: Date
  code_pk: string
}

export class FindByDateHistoryResponse {
  code_material: string
  description: string
  batch: string
  shelf_life: Date
  quantity_used: number
  date_of_use: Date
  code_pk: string
}
