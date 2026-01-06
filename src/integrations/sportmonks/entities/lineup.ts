export interface SportMonksLineup {
  team_id: number
  formation?: string | null
  starting_xi: SportMonksLineupPlayer[]
  substitutes: SportMonksLineupPlayer[]
}

export interface SportMonksLineupPlayer {
  id: number
  name: string
  jersey_number?: number
  position?: string
  image_path?: string | null
}
