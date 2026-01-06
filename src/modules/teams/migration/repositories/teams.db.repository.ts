import { eq, ilike, sql } from "drizzle-orm"
import { db } from "../../../../db"
import { teams } from "../../../../db/schema/teams"
import { countries } from "../../../../db/schema/countries"
import {
  TeamsListResponse, 
  TeamCard
} from "../teams.types"

export const getTeamsFromDb = async (
  page: number,
  limit: number,
  search?: string
): Promise<TeamsListResponse> => {
  const offset = (page - 1) * limit

  const where = search ? ilike(teams.name, `%${search}%`) : undefined

  const data = await db
    .select({
      id: teams.id,
      name: teams.name,
      short_code: teams.shortCode,
      logo: teams.logo,
      founded: teams.foundedYear,
      stadium_name: teams.venueName,
      country_name: countries.name,
      country_code: countries.iso2,
      country_flag: countries.flag
    })
    .from(teams)
    .leftJoin(countries, eq(teams.countryId, countries.id))
    .where(where)
    .limit(limit)
    .offset(offset)

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(teams)
    .where(where)

  return {
    data: data.map(t => ({
      id: t.id,
      name: t.name,
      short_code: t.short_code,
      logo: t.logo,
      founded: t.founded,
      stadium: {
        name: t.stadium_name,
        capacity: null
      },
      country: {
        name: t.country_name,
        code: t.country_code,
        flag: t.country_flag
      }
    })),
    pagination: {
      page,
      limit,
      total: Number(count),
      has_next: page * limit < Number(count)
    }
  }
}

export const getTeamProfileFromDb = async (
  teamId: number
): Promise<TeamCard | null> => {
  const row = await db
    .select({
      id: teams.id,
      name: teams.name,
      short_code: teams.shortCode,
      logo: teams.logo,
      founded: teams.foundedYear,
      stadium_name: teams.venueName,
      country_name: countries.name,
      country_code: countries.iso2,
      country_flag: countries.flag
    })
    .from(teams)
    .leftJoin(countries, eq(teams.countryId, countries.id))
    .where(eq(teams.id, teamId))
    .then(r => r[0])

  if (!row) return null

  return {
    id: row.id,
    name: row.name,
    short_code: row.short_code,
    logo: row.logo,
    founded: row.founded,
    stadium: {
      name: row.stadium_name,
      capacity: null
    },
    country: {
      name: row.country_name,
      code: row.country_code,
      flag: row.country_flag
    }
  }
}
