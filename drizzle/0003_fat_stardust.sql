ALTER TABLE "Students" DROP CONSTRAINT "Students_Paren_id_Parent_id_fk";
--> statement-breakpoint
ALTER TABLE "Students" ADD COLUMN "parent_id" integer;--> statement-breakpoint
ALTER TABLE "Students" ADD CONSTRAINT "Students_parent_id_Parent_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."Parent"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Students" DROP COLUMN "Paren_id";