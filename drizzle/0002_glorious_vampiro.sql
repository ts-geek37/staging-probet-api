CREATE TABLE "countries" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"iso2" text,
	"continent" text,
	"flag" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "leagues" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"short_code" text,
	"type" text NOT NULL,
	"logo" text,
	"country_id" integer NOT NULL,
	"has_standings" boolean NOT NULL,
	"has_rounds" boolean NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "teams" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"short_code" text,
	"logo" text,
	"country_id" integer NOT NULL,
	"venue_name" text,
	"founded_year" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "leagues" ADD CONSTRAINT "leagues_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teams" ADD CONSTRAINT "teams_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;