ALTER TABLE "LoginHistory" DROP CONSTRAINT "LoginHistory_student_id_Students_id_fk";
--> statement-breakpoint
ALTER TABLE "LoginHistory" ADD CONSTRAINT "LoginHistory_student_id_Students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."Students"("id") ON DELETE cascade ON UPDATE no action;