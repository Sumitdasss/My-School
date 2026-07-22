ALTER TABLE "LoginHistory" DROP CONSTRAINT "LoginHistory_student_id_Students_id_fk";
--> statement-breakpoint
ALTER TABLE "LoginHistory" ADD COLUMN "Teacher_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "LoginHistory" ADD CONSTRAINT "LoginHistory_Teacher_id_Students_id_fk" FOREIGN KEY ("Teacher_id") REFERENCES "public"."Students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "LoginHistory" DROP COLUMN "student_id";