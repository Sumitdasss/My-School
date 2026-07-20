import { db } from "@/db";
import { Students } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const childName = searchParams.get("childName");
  const childRoll = searchParams.get("childRoll");

  const students = await db
    .select()
    .from(Students)
    .where(
      and(
        eq(Students.fullName, childName),
        eq(Students.rollNumber, childRoll)
      )
    );

  return Response.json({
    success: true,
    students,
  });
}