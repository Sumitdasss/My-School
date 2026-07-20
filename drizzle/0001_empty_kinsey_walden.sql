CREATE TABLE "Teacher" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"date_of_birth" timestamp NOT NULL,
	"phone" varchar(20) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"photo" text,
	CONSTRAINT "Teacher_phone_unique" UNIQUE("phone"),
	CONSTRAINT "Teacher_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DROP TABLE "students" CASCADE;