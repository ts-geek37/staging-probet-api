export interface SportMonksEvent {
  id: number
  minute: number
  type: {
    name: string
  }
  participant_id: number
  player?: {
    name: string
  }
  related_player?: {
    name: string
  }
}
