CREATE TABLE "students" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"date_of_birth" timestamp NOT NULL,
	"phone" varchar(20) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"photo" text,
	CONSTRAINT "students_phone_unique" UNIQUE("phone"),
	CONSTRAINT "students_email_unique" UNIQUE("email")
);
