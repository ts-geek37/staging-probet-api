import { sql } from "drizzle-orm";
import {
  SportMonksClient,
  SportMonksLeague,
  SportMonksResponse,
} from "../../integrations/sportmonks";
import logger from "../../logger";
import { db } from "../index";
import { leagues } from "../schema/leagues";

const PER_PAGE = 100;

export const seedLeagues = async () => {
  logger.info("🌍 Seeding leagues started");

  const client = new SportMonksClient();

  let page = 1;
  let totalUpserted = 0;

  while (true) {
    const response = await client.get<SportMonksResponse<SportMonksLeague[]>>(
      "/football/leagues",
      {
        include: "country",
        page,
        per_page: PER_PAGE,
      }
    );

    const data = response.data ?? [];
    if (data.length === 0) break;

    const values = data.map((l) => ({
      id: l.id,
      name: l.name,
      shortCode: l.short_code ?? null,
      type: l.type,
      logo: l.image_path ?? null,
      subtype: l.sub_type ?? null,
      countryId: l.country_id ?? null,

      hasStandings: l.has_standings ?? null,
      hasRounds: l.has_rounds ?? null,
    }));

    await db
      .insert(leagues)
      .values(values)
      .onConflictDoUpdate({
        target: leagues.id,
        set: {
          name: sql`excluded.name`,
          shortCode: sql`excluded.short_code`,
          type: sql`excluded.type`,
          logo: sql`excluded.logo`,
          countryId: sql`excluded.country_id`,
          hasStandings: sql`excluded.has_standings`,
          hasRounds: sql`excluded.has_rounds`,
          subtype: sql`excluded.subtype`,
          updatedAt: new Date(),
        },
      });

    totalUpserted += values.length;

    logger.info(`Leagues: page ${page}, upserted ${values.length}`);

    if (!response.pagination?.has_more) break;
    page++;
  }

  logger.info(`✅ Seeding leagues finished (${totalUpserted} records)`);
};
