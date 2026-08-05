CREATE TABLE "AdmitCards" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" integer NOT NULL,
	"exam_name" varchar(100) NOT NULL,
	"exam_year" integer NOT NULL,
	"center" varchar(255) NOT NULL,
	"exam_date" date NOT NULL,
	"exam_time" varchar(50) NOT NULL,
	"room" varchar(50) NOT NULL,
	"seat_no" varchar(50) NOT NULL,
	"status" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "AdmitCards" ADD CONSTRAINT "AdmitCards_student_id_Students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."Students"("id") ON DELETE no action ON UPDATE no action;