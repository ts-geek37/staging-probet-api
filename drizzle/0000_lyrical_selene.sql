CREATE TYPE "public"."subscription_status" AS ENUM('active', 'past_due', 'canceled');--> statement-breakpoint
CREATE TABLE "billing_prices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product" text NOT NULL,
	"billing_cycle" text NOT NULL,
	"currency" text NOT NULL,
	"amount" text NOT NULL,
	"stripe_price_id" text NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "billing_prices_stripe_price_id_unique" UNIQUE("stripe_price_id")
);
--> statement-breakpoint
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
	"subtype" text,
	"logo" text,
	"country_id" integer,
	"has_standings" boolean,
	"has_rounds" boolean,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stripe_events" (
	"event_id" text PRIMARY KEY NOT NULL,
	"event_type" text NOT NULL,
	"processed_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"stripe_subscription_id" text NOT NULL,
	"stripe_price_id" text NOT NULL,
	"status" "subscription_status" NOT NULL,
	"billing_cycle" text,
	"current_period_end" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "subscriptions_stripe_subscription_id_unique" UNIQUE("stripe_subscription_id")
);
--> statement-breakpoint
CREATE TABLE "teams" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"short_code" text,
	"logo" text,
	"country_id" integer,
	"venue_name" text,
	"founded_year" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_user_id" text NOT NULL,
	"email" text NOT NULL,
	"first_name" text,
	"last_name" text,
	"stripe_customer_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_clerk_user_id_unique" UNIQUE("clerk_user_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_stripe_customer_id_unique" UNIQUE("stripe_customer_id")
);
--> statement-breakpoint
ALTER TABLE "leagues" ADD CONSTRAINT "leagues_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teams" ADD CONSTRAINT "teams_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "billing_prices_lookup_idx" ON "billing_prices" USING btree ("product","billing_cycle","currency","active");--> statement-breakpoint
CREATE INDEX "billing_prices_active_idx" ON "billing_prices" USING btree ("active");--> statement-breakpoint
CREATE INDEX "countries_iso2_idx" ON "countries" USING btree ("iso2");--> statement-breakpoint
CREATE INDEX "countries_continent_idx" ON "countries" USING btree ("continent");--> statement-breakpoint
CREATE INDEX "countries_name_idx" ON "countries" USING btree ("name");--> statement-breakpoint
CREATE INDEX "leagues_country_id_idx" ON "leagues" USING btree ("country_id");--> statement-breakpoint
CREATE INDEX "leagues_type_idx" ON "leagues" USING btree ("type");--> statement-breakpoint
CREATE INDEX "leagues_short_code_idx" ON "leagues" USING btree ("short_code");--> statement-breakpoint
CREATE INDEX "leagues_name_idx" ON "leagues" USING btree ("name");--> statement-breakpoint
CREATE INDEX "idx_subscriptions_user_active" ON "subscriptions" USING btree ("user_id","status","current_period_end");--> statement-breakpoint
CREATE INDEX "idx_subscriptions_user_id" ON "subscriptions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_subscriptions_status" ON "subscriptions" USING btree ("status");--> statement-breakpoint
CREATE INDEX "teams_country_id_idx" ON "teams" USING btree ("country_id");--> statement-breakpoint
CREATE INDEX "teams_short_code_idx" ON "teams" USING btree ("short_code");--> statement-breakpoint
CREATE INDEX "teams_name_idx" ON "teams" USING btree ("name");--> statement-breakpoint
CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");