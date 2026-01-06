import { db } from "../index"
import { teams } from "../schema/teams"
import { SportMonksClient } from "../../integrations/sportmonks/sportmonks.client"
import { SportMonksResponse } from "../../integrations/sportmonks/sportmonks.types"
import { SportMonksTeam } from "../../integrations/sportmonks/sportmonks.entities"
import "dotenv/config";

export const seedTeams = async () => {
  const client = new SportMonksClient()

  const response = await client.get<SportMonksResponse<SportMonksTeam[]>>(
    "/football/teams",
    { include: "venue" }
  )

  const values = response.data
    .filter(t => t.country_id)
    .map(t => ({
      id: t.id,
      name: t.name,
      shortCode: t.short_code,
      logo: t.image_path,
      countryId: t.country_id!,
      venueName: t.venue?.name ?? null,
      foundedYear: t.founded
    }))

  if (values.length === 0) return

  await db
    .insert(teams)
    .values(values)
    .onConflictDoUpdate({
      target: teams.id,
      set: {
        name: teams.name,
        shortCode: teams.shortCode,
        logo: teams.logo,
        countryId: teams.countryId,
        venueName: teams.venueName,
        foundedYear: teams.foundedYear,
        updatedAt: new Date()
      }
    })
}
