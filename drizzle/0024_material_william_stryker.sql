CREATE TABLE "Fees" (
	"id" serial PRIMARY KEY NOT NULL,
	"class" varchar(20) NOT NULL,
	"fee_type" varchar(100) NOT NULL,
	"amount" integer NOT NULL,
	"description" text,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now()
);
