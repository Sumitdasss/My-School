CREATE TABLE "LoginHistory" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" integer NOT NULL,
	"login_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "LoginHistory" ADD CONSTRAINT "LoginHistory_student_id_Students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."Students"("id") ON DELETE no action ON UPDATE no action;