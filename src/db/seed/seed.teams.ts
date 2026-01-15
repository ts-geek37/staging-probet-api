import "dotenv/config";

import { sql } from "drizzle-orm";
import {
  SportMonksClient,
  SportMonksResponse,
  SportMonksTeam,
} from "../../integrations/sportmonks";
import logger from "../../logger";
import { db } from "../index";
import { teams } from "../schema/teams";

const PER_PAGE = 100;

export const seedTeams = async () => {
  logger.info("Seeding teams started");

  const client = new SportMonksClient();

  let page = 1;
  let totalUpserted = 0;

  while (true) {
    const response = await client.get<SportMonksResponse<SportMonksTeam[]>>(
      "/football/teams",
      {
        include: "venue",
        page,
        per_page: PER_PAGE,
      }
    );

    const data = response.data ?? [];
    if (data.length === 0) break;

    const values = data.map((t) => ({
      id: t.id,
      name: t.name,
      shortCode: t.short_code ?? null,
      logo: t.image_path ?? null,
      countryId: t.country_id ?? null,
      venueName: t.venue?.name ?? null,
      foundedYear: t.founded ?? null,
    }));

    await db
      .insert(teams)
      .values(values)
      .onConflictDoUpdate({
        target: teams.id,
        set: {
          name: sql`excluded.name`,
          shortCode: sql`excluded.short_code`,
          logo: sql`excluded.logo`,
          countryId: sql`excluded.country_id`,
          venueName: sql`excluded.venue_name`,
          foundedYear: sql`excluded.founded_year`,
          updatedAt: new Date(),
        },
      });

    totalUpserted += values.length;
    logger.info(`Teams: page ${page}, upserted ${values.length}`);

    if (!response.pagination?.has_more) break;
    page++;
  }

  logger.info(`Seeding teams finished (${totalUpserted} records)`);
};
