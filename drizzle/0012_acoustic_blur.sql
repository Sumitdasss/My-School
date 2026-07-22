CREATE TABLE "ParentLoginHistory" (
	"id" serial PRIMARY KEY NOT NULL,
	"Parent_id" integer NOT NULL,
	"login_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "TeacherLoginHistory" (
	"id" serial PRIMARY KEY NOT NULL,
	"Teacher_id" integer NOT NULL,
	"login_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "LoginHistory" DROP CONSTRAINT "LoginHistory_Teacher_id_Students_id_fk";
--> statement-breakpoint
ALTER TABLE "LoginHistory" ADD COLUMN "student_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "ParentLoginHistory" ADD CONSTRAINT "ParentLoginHistory_Parent_id_Parent_id_fk" FOREIGN KEY ("Parent_id") REFERENCES "public"."Parent"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "TeacherLoginHistory" ADD CONSTRAINT "TeacherLoginHistory_Teacher_id_Teacher_id_fk" FOREIGN KEY ("Teacher_id") REFERENCES "public"."Teacher"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "LoginHistory" ADD CONSTRAINT "LoginHistory_student_id_Students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."Students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "LoginHistory" DROP COLUMN "Teacher_id";