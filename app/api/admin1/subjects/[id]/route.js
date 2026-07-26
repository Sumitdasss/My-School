import { db } from "../../../../../db/index.js";
import { Subjects } from "../../../../../db/schema.js";
import { eq } from "drizzle-orm";

// DELETE — Subject delete
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    console.log("ID:", id);

    await db
      .delete(Subjects)
      .where(eq(Subjects.id, Number(id)));

    return Response.json({
      success: true,
      message: "Subject deleted",
    });
  } catch (err) {
    console.error(err);

    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}