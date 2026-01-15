import { db } from "../../db";
import { countries } from "../../db/schema/countries";
import { leagues } from "../../db/schema/leagues";
import { normalizeCompetitionType } from "../../integrations/sportmonks";
import { eq, ilike, sql } from "drizzle-orm";
import { LeagueProfileResponse, LeaguesListResponse } from "./leagues.types";

export const getLeaguesFromDb = async (
  page: number,
  limit: number,
  search?: string
): Promise<LeaguesListResponse> => {
  const offset = (page - 1) * limit;

  const where = search ? ilike(leagues.name, `%${search}%`) : undefined;

  const data = await db
    .select({
      id: leagues.id,
      name: leagues.name,
      logo: leagues.logo,
      type: leagues.type,
      country_name: countries.name,
      country_code: countries.iso2,
      country_flag: countries.flag,
    })
    .from(leagues)
    .leftJoin(countries, eq(leagues.countryId, countries.id))
    .where(where)
    .limit(limit)
    .offset(offset);

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(leagues)
    .where(where);

  return {
    data: data.map((l) => ({
      id: l.id,
      name: l.name,
      logo: l.logo,
      competition_type: normalizeCompetitionType(l.type),
      country: {
        name: l.country_name,
        code: l.country_code,
        flag: l.country_flag,
      },
    })),
    pagination: {
      page,
      limit,
      count: Number(count),
      total_pages: Math.ceil(Number(count) / limit),
    },
  };
};

export const getLeagueProfileFromDb = async (
  leagueId: number
): Promise<LeagueProfileResponse | null> => {
  const row = await db
    .select({
      id: leagues.id,
      name: leagues.name,
      logo: leagues.logo,
      type: leagues.type,
      country_name: countries.name,
      country_code: countries.iso2,
      country_flag: countries.flag,
    })
    .from(leagues)
    .leftJoin(countries, eq(leagues.countryId, countries.id))
    .where(eq(leagues.id, leagueId))
    .then((r) => r[0]);

  if (!row) return null;

  return {
    id: row.id,
    name: row.name,
    logo: row.logo,
    competition_type: normalizeCompetitionType(row.type),
    country: {
      name: row.country_name,
      code: row.country_code,
      flag: row.country_flag,
    },
    current_season: null,
  };
};
