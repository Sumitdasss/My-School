CREATE TABLE "notices" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"category" varchar(100) NOT NULL,
	"date" varchar(100) NOT NULL,
	"urgent" boolean DEFAULT false,
	"short_description" text,
	"description" text,
	"attachment" varchar(500),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "notices_slug_unique" UNIQUE("slug")
);
