CREATE TABLE "Exams" (
	"id" serial PRIMARY KEY NOT NULL,
	"exam_name" varchar(50) NOT NULL,
	"exam_year" integer NOT NULL,
	"class" varchar(20) NOT NULL,
	"section" varchar(10) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "Results" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" integer NOT NULL,
	"exam_id" integer NOT NULL,
	"subject_id" integer NOT NULL,
	"teacher_id" integer NOT NULL,
	"marks_obtained" integer NOT NULL,
	"total_marks" integer DEFAULT 100 NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "Subjects" (
	"id" serial PRIMARY KEY NOT NULL,
	"subject_name" varchar(100) NOT NULL,
	"class" varchar(20) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "TeacherAssignments" (
	"id" serial PRIMARY KEY NOT NULL,
	"teacher_id" integer NOT NULL,
	"subject_id" integer NOT NULL,
	"class" varchar(20) NOT NULL,
	"section" varchar(10) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Students" ADD COLUMN "class" varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE "Students" ADD COLUMN "section" varchar(10) NOT NULL;--> statement-breakpoint
ALTER TABLE "Results" ADD CONSTRAINT "Results_student_id_Students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."Students"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Results" ADD CONSTRAINT "Results_exam_id_Exams_id_fk" FOREIGN KEY ("exam_id") REFERENCES "public"."Exams"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Results" ADD CONSTRAINT "Results_subject_id_Subjects_id_fk" FOREIGN KEY ("subject_id") REFERENCES "public"."Subjects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Results" ADD CONSTRAINT "Results_teacher_id_Teacher_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."Teacher"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "TeacherAssignments" ADD CONSTRAINT "TeacherAssignments_teacher_id_Teacher_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."Teacher"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "TeacherAssignments" ADD CONSTRAINT "TeacherAssignments_subject_id_Subjects_id_fk" FOREIGN KEY ("subject_id") REFERENCES "public"."Subjects"("id") ON DELETE cascade ON UPDATE no action;