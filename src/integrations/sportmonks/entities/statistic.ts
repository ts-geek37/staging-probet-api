export interface SportMonksStatistic {
  participant_id: number
  type: {
    name: string
  }
  value: number | null
}

export interface SportMonksSeasonStatistic {
  id: number
  type_id: number
  value: any
}
