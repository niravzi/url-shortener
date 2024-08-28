CREATE TABLE IF NOT EXISTS "short_urls" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"original_url" text NOT NULL,
	"visits" integer DEFAULT 0 NOT NULL
);
