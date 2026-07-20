CREATE TABLE "Parent" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"child_name" varchar(255) NOT NULL,
	"child_class" varchar(50) NOT NULL,
	"child_roll" varchar(50) NOT NULL,
	"password" varchar(255) NOT NULL,
	"photo" varchar(500),
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Parent_email_unique" UNIQUE("email"),
	CONSTRAINT "Parent_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE "Students" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"father_name" varchar(255) NOT NULL,
	"mother_name" varchar(255) NOT NULL,
	"date_of_birth" timestamp NOT NULL,
	"phone" varchar(20) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"photo" varchar(500),
	"Paren_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Students_phone_unique" UNIQUE("phone"),
	CONSTRAINT "Students_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "Students" ADD CONSTRAINT "Students_Paren_id_Parent_id_fk" FOREIGN KEY ("Paren_id") REFERENCES "public"."Parent"("id") ON DELETE no action ON UPDATE no action;