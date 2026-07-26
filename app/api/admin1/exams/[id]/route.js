import { db } from "../../../../../db/index.js";
import { Exams } from "../../../../../db/schema.js";
import { eq } from "drizzle-orm";

export async function DELETE(_, { params }) {
  const { id } = await params;

  await db
    .delete(Exams)
    .where(eq(Exams.id, Number(id)));

  return Response.json({
    success: true,
    message: "Exam deleted",
  });
}