import "dotenv/config";

import { sql } from "drizzle-orm";
import {
    SportMonksClient,
    SportMonksResponse,
} from "../../integrations/sportmonks";
import logger from "../../logger";
import { db } from "../index";
import { states } from "../schema/states";

interface SportMonksState {
  id: number;
  state: string;
  name: string;
  short_name: string | null;
  developer_name: string;
}

export const seedStates = async () => {
  const client = new SportMonksClient();

  let page = 1;
  let hasMore = true;
  let totalInserted = 0;

  while (hasMore) {
    logger.info("seed.states.fetching", { page });

    const response = await client.get<SportMonksResponse<SportMonksState[]>>(
      "/football/states",
      {
        page,
        per_page: 50,
      }
    );

    const data = response.data ?? [];

    if (data.length === 0) break;

    const values = data.map((s) => ({
      id: s.id,
      state: s.state,
      name: s.name,
      shortName: s.short_name,
      developerName: s.developer_name,
    }));

    await db
      .insert(states)
      .values(values)
      .onConflictDoUpdate({
        target: states.id,
        set: {
          state: sql`excluded.state`,
          name: sql`excluded.name`,
          shortName: sql`excluded.short_name`,
          developerName: sql`excluded.developer_name`,
          updatedAt: new Date(),
        },
      });

    totalInserted += values.length;

    hasMore = Boolean(response.pagination?.has_more);
    page += 1;
  }

  logger.info("seed.states.completed", {
    totalInserted,
  });
};
