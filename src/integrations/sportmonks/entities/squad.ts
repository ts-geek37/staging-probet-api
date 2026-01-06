// sportmonks.squad-member.ts

export interface SportMonksSquadMember {
  player: {
    id: number
    name: string
    image_path: string | null

    country?: {
      id: number
      name: string
    }
  }

  team_id: number
  player_id: number

  position_id?: number
  position?: {
    id: number
    name: string
  }

  detailedposition?: {
    id: number
    name: string
  }

  jersey_number?: number

  start?: string
  end?: string
}
