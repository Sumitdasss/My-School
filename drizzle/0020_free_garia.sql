CREATE TABLE "ClassRoutine" (
	"id" serial PRIMARY KEY NOT NULL,
	"class_name" varchar(20) NOT NULL,
	"section" varchar(10) NOT NULL,
	"shift" varchar(20) NOT NULL,
	"day" varchar(20) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "RoutinePeriod" (
	"id" serial PRIMARY KEY NOT NULL,
	"routine_id" integer NOT NULL,
	"period" integer NOT NULL,
	"start_time" varchar(10) NOT NULL,
	"end_time" varchar(10) NOT NULL,
	"subject" varchar(100) NOT NULL,
	"teacher" varchar(100) NOT NULL,
	"room" varchar(50),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "RoutinePeriod" ADD CONSTRAINT "RoutinePeriod_routine_id_ClassRoutine_id_fk" FOREIGN KEY ("routine_id") REFERENCES "public"."ClassRoutine"("id") ON DELETE cascade ON UPDATE no action;