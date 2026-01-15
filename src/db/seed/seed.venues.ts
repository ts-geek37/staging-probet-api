// src/db/seed/seed.venues.ts
import "dotenv/config";

import { sql } from "drizzle-orm";
import {
    SportMonksClient,
    SportMonksResponse,
    SportMonksVenue,
} from "../../integrations/sportmonks";
import logger from "../../logger";
import { db } from "../index";
import { venues } from "../schema/venues";

export const seedVenues = async () => {
  const client = new SportMonksClient();

  logger.info("seed.venues.start");

  const response = await client.get<SportMonksResponse<SportMonksVenue[]>>(
    "/football/venues",
    {
      include: "city",
    }
  );

  if (!response.data?.length) {
    logger.warn("seed.venues.empty");
    return;
  }

  const values = response.data.map((v) => ({
    id: v.id,
    name: v.name,
    city: v.city.name,
    capacity: v.capacity,
    image: v.image_path,
    countryId: v.country_id,
  }));

  await db
    .insert(venues)
    .values(values)
    .onConflictDoUpdate({
      target: venues.id,
      set: {
        name: sql`excluded.name`,
        city: sql`excluded.city`,
        capacity: sql`excluded.capacity`,
        image: sql`excluded.image`,
        countryId: sql`excluded.country_id`,
        updatedAt: new Date(),
      },
    });

  logger.info("seed.venues.done", { count: values.length });
};
