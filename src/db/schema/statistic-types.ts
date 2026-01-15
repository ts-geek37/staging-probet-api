import {
    index,
    integer,
    pgEnum,
    pgTable,
    text,
    timestamp,
} from "drizzle-orm/pg-core";

export const statisticEntityTypeEnum = pgEnum("statistic_entity_type", [
  "CoachStatisticDetail",
  "Event",
  "FixtureStatistic",
  "Lineup",
  "PeriodStatistic",
  "PlayerStatisticDetail",
  "Prediction",
  "RefereeStatisticDetail",
  "SeasonStatistic",
  "TeamStatisticDetail",
  "StageStatistic",
]);

export const statisticTypes = pgTable(
  "statistic_types",
  {
    id: integer("id").primaryKey(),

    name: text("name").notNull(),
    code: text("code").notNull(),
    developerName: text("developer_name").notNull(),

    modelType: text("model_type").notNull(),
    statGroup: text("stat_group"),

    entityType: statisticEntityTypeEnum("entity_type").notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("statistic_types_entity_type_idx").on(table.entityType),
    index("statistic_types_code_idx").on(table.code),
    index("statistic_types_group_idx").on(table.statGroup),
  ]
);
