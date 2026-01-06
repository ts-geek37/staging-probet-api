ALTER TABLE "leagues" ALTER COLUMN "country_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "leagues" ALTER COLUMN "has_standings" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "leagues" ALTER COLUMN "has_rounds" DROP NOT NULL;