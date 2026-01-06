export interface SportMonksTeamStatistics {
  id: number
  model_id: number
  type_id: number
  relation_id: number | null
  value: Record<string, any>
  type: string
}
