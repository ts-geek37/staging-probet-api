CREATE TYPE "public"."statistic_entity_type" AS ENUM('CoachStatisticDetail', 'Event', 'FixtureStatistic', 'Lineup', 'PeriodStatistic', 'PlayerStatisticDetail', 'Prediction', 'RefereeStatisticDetail', 'SeasonStatistic', 'TeamStatisticDetail', 'StageStatistic');--> statement-breakpoint
CREATE TABLE "states" (
	"id" integer PRIMARY KEY NOT NULL,
	"state" text NOT NULL,
	"name" text NOT NULL,
	"short_name" text,
	"developer_name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "statistic_types" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"developer_name" text NOT NULL,
	"model_type" text NOT NULL,
	"stat_group" text,
	"entity_type" "statistic_entity_type" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "venues" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"city" text,
	"capacity" integer,
	"image" text,
	"country_id" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "venues" ADD CONSTRAINT "venues_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "states_state_idx" ON "states" USING btree ("state");--> statement-breakpoint
CREATE INDEX "states_developer_name_idx" ON "states" USING btree ("developer_name");--> statement-breakpoint
CREATE INDEX "states_name_idx" ON "states" USING btree ("name");--> statement-breakpoint
CREATE INDEX "statistic_types_entity_type_idx" ON "statistic_types" USING btree ("entity_type");--> statement-breakpoint
CREATE INDEX "statistic_types_code_idx" ON "statistic_types" USING btree ("code");--> statement-breakpoint
CREATE INDEX "statistic_types_group_idx" ON "statistic_types" USING btree ("stat_group");--> statement-breakpoint
CREATE INDEX "venues_country_id_idx" ON "venues" USING btree ("country_id");--> statement-breakpoint
CREATE INDEX "venues_name_idx" ON "venues" USING btree ("name");