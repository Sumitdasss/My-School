/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "../../../../db";
import { Students } from "../../../../db/schema";


export async function GET() {
  try {
    const classes = await db
      .select({
        class1: Students.class1,
      })
      .from(Students)
      .groupBy(Students.class1);

    const sections = await db
      .select({
        section: Students.section,
      })
      .from(Students)
      .groupBy(Students.section);

    return Response.json({
      classes,
      sections,
    });
  } catch (error) {
    return Response.json(
      { error: "Failed to load filters" },
      { status: 500 }
    );
  }
}