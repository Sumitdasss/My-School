import { db } from "../../../../../db/index.js";
import { TeacherAssignments } from "../../../../../db/schema.js";
import { eq } from "drizzle-orm";

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    console.log("DELETE ID:", id);

    await db
      .delete(TeacherAssignments)
      .where(eq(TeacherAssignments.id, Number(id)));

    return Response.json({
      success: true,
    });

  } catch (err) {
    console.error(err);

    return Response.json(
      {
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}