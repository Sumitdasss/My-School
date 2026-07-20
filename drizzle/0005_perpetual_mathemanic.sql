ALTER TABLE "Parent" ADD COLUMN "child_email" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "Students" ADD COLUMN "roll_number" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "Students" ADD CONSTRAINT "Students_roll_number_unique" UNIQUE("roll_number");