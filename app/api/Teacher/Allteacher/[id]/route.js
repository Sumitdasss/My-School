import { db } from "../../../../../db/index.js";
import { Teacher } from "../../../../../db/schema.js";
import { eq } from "drizzle-orm";

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    console.log("DELETE ID:", id);

    await db
      .delete(Teacher)
      .where(eq(Teacher.id, Number(id)));

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