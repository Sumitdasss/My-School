import { db } from "../../../../db/index.js";
import { Students } from "../../../../db/schema.js";
import { eq, and } from "drizzle-orm";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const roll = searchParams.get("roll");
    const class1 = searchParams.get("class");
    const section = searchParams.get("section");

    let students;

    // No Filter → All Students
    if (!roll && !class1 && !section) {
      students = await db.select().from(Students);
    }

    // Roll + Class + Section
    else if (roll && class1 && section) {
      students = await db
        .select()
        .from(Students)
        .where(
          and(
            eq(Students.rollNumber, roll),
            eq(Students.class1, class1),
            eq(Students.section, section)
          )
        );
    }

    // Roll Only
    else if (roll) {
      students = await db
        .select()
        .from(Students)
        .where(eq(Students.rollNumber, roll));
    }

    // Class Only
    else if (class1) {
      students = await db
        .select()
        .from(Students)
        .where(eq(Students.class1, class1));
    }

    // Section Only
    else if (section) {
      students = await db
        .select()
        .from(Students)
        .where(eq(Students.section, section));
    }

    // Class + Section
    else if (class1 && section) {
      students = await db
        .select()
        .from(Students)
        .where(
          and(
            eq(Students.class1, class1),
            eq(Students.section, section)
          )
        );
    }

    return Response.json(students, { status: 200 });

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}