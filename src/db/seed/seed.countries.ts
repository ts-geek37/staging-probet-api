import "dotenv/config";

import {
  SportMonksClient,
  SportMonksCountry,
  SportMonksResponse,
} from "../../integrations/sportmonks";
import logger from "../../logger";
import { db } from "../index";
import { countries } from "../schema/countries";
import { sql } from "drizzle-orm";

const PER_PAGE = 100;

export const seedCountries = async () => {
  logger.info("Seeding countries started");

  const client = new SportMonksClient();

  let page = 1;
  let totalUpserted = 0;

  while (true) {
    const response = await client.get<SportMonksResponse<SportMonksCountry[]>>(
      "/core/countries",
      {
        include: "continent",
        page,
        per_page: PER_PAGE,
      }
    );

    const data = response.data ?? [];
    if (data.length === 0) break;

    const values = data.map((c) => ({
      id: c.id,
      name: c.name,
      iso2: c.iso2 ?? null,
      continent: c.continent?.name ?? null,
      flag: c.image_path ?? null,
    }));

    await db
      .insert(countries)
      .values(values)
      .onConflictDoUpdate({
        target: countries.id,
        set: {
          name: sql`excluded.name`,
          iso2: sql`excluded.iso2`,
          continent: sql`excluded.continent`,
          flag: sql`excluded.flag`,
          updatedAt: new Date(),
        },
      });

    totalUpserted += values.length;
    logger.info(`Countries: page ${page}, upserted ${values.length}`);

    if (!response.pagination?.has_more) break;
    page++;
  }

  logger.info(`Seeding countries finished (${totalUpserted} records)`);
};
