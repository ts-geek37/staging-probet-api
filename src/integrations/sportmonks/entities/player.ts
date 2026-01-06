export interface SportMonksPlayer {
  id: number
  name: string
  image_path: string | null
  date_of_birth: string | null
  height: string | null
  weight: string | null
  preferred_foot: string | null
  position: string | null
  nationality_id: number
  country: {
    id: number
    name: string
    image_path: string | null
  }
  team: {
    id: number
    name: string
    image_path: string | null
  } | null
  contract: {
    until: string | null
  } | null
}
