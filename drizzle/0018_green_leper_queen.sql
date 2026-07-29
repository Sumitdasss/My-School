CREATE TABLE "Attendance" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" integer NOT NULL,
	"attendance_date" date NOT NULL,
	"status" varchar(10) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "unique_student_attendance" UNIQUE("student_id","attendance_date")
);
--> statement-breakpoint
ALTER TABLE "Results" DROP CONSTRAINT "Results_student_id_Students_id_fk";
--> statement-breakpoint
ALTER TABLE "Results" DROP CONSTRAINT "Results_exam_id_Exams_id_fk";
--> statement-breakpoint
ALTER TABLE "Results" DROP CONSTRAINT "Results_subject_id_Subjects_id_fk";
--> statement-breakpoint
ALTER TABLE "Results" DROP CONSTRAINT "Results_teacher_id_Teacher_id_fk";
--> statement-breakpoint
ALTER TABLE "Results" ALTER COLUMN "total_marks" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_student_id_Students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."Students"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Results" ADD CONSTRAINT "Results_student_id_exam_id_subject_id_unique" UNIQUE("student_id","exam_id","subject_id");