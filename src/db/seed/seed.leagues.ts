import {
  SportMonksClient,
  SportMonksLeague,
  SportMonksResponse,
} from "../../integrations/sportmonks";
import { db } from "../index";
import { leagues } from "../schema/leagues";

export const seedLeagues = async () => {
  const client = new SportMonksClient();
  const response = await client.get<SportMonksResponse<SportMonksLeague[]>>(
    "/football/leagues",
    { include: "country" }
  );

  const values = response.data
    .filter((l) => l.country_id)
    .map((l) => ({
      id: l.id,
      name: l.name,
      shortCode: l.short_code,
      type: l.type,
      logo: l.image_path,
      countryId: l.country_id!,
      hasStandings: l.has_standings,
      hasRounds: l.has_rounds,
    }));

  if (values.length === 0) return;

  await db
    .insert(leagues)
    .values(values)
    .onConflictDoUpdate({
      target: leagues.id,
      set: {
        name: leagues.name,
        shortCode: leagues.shortCode,
        type: leagues.type,
        logo: leagues.logo,
        countryId: leagues.countryId,
        hasStandings: leagues.hasStandings,
        hasRounds: leagues.hasRounds,
        updatedAt: new Date(),
      },
    });
};
