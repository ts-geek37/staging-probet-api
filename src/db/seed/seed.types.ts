import logger from "../../logger";
import { db } from "../index";
import { statisticTypes } from "../schema/statistic-types";

interface StatisticType {
  id: number;
  name: string;
  code: string;
  developer_name: string;
  model_type: string;
  stat_group: string | null;
}

type StatisticPayload = Record<
  string,
  {
    updated_at: string;
    types: StatisticType[];
  }
>;

export const seedStatisticTypes = async (payload: StatisticPayload) => {
  const rows = Object.entries(payload).flatMap(([entityType, entity]) =>
    entity.types.map((t) => ({
      id: t.id,
      entityType: entityType as any,
      name: t.name,
      code: t.code,
      developerName: t.developer_name,
      modelType: t.model_type,
      statGroup: t.stat_group,
    }))
  );

  if (!rows.length) return;

  await db
    .insert(statisticTypes)
    .values(rows)
    .onConflictDoUpdate({
      target: [statisticTypes.entityType, statisticTypes.code],
      set: {
        name: statisticTypes.name,
        developerName: statisticTypes.developerName,
        modelType: statisticTypes.modelType,
        statGroup: statisticTypes.statGroup,
        updatedAt: new Date(),
      },
    });

  logger.info("seed.statisticTypes.completed", {
    entities: Object.keys(payload),
    count: rows.length,
  });
};
