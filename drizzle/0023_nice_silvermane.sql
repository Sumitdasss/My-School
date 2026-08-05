CREATE TABLE "PaymentItems" (
	"id" serial PRIMARY KEY NOT NULL,
	"payment_id" integer NOT NULL,
	"title" varchar(100) NOT NULL,
	"amount" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" integer NOT NULL,
	"parent_id" integer,
	"amount" integer NOT NULL,
	"fee_type" varchar(100) NOT NULL,
	"payment_method" varchar(50) DEFAULT 'SSLCommerz',
	"transaction_id" varchar(255),
	"status" varchar(20) DEFAULT 'Pending',
	"payment_date" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "Payments_transaction_id_unique" UNIQUE("transaction_id")
);
--> statement-breakpoint
ALTER TABLE "PaymentItems" ADD CONSTRAINT "PaymentItems_payment_id_Payments_id_fk" FOREIGN KEY ("payment_id") REFERENCES "public"."Payments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_student_id_Students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."Students"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_parent_id_Parent_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."Parent"("id") ON DELETE no action ON UPDATE no action;