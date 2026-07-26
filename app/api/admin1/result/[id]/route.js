import { db } from "../../../../../db/index.js";
import { Results } from "../../../../../db/schema.js";
import { eq } from "drizzle-orm";

// DELETE /api/admin1/results/:id
export async function DELETE(req, { params }) {
  try {
    const id = Number(params.id);

    if (!id) {
      return Response.json(
        { error: "Invalid Result ID" },
        { status: 400 }
      );
    }

    const deleted = await db
      .delete(Results)
      .where(eq(Results.id, id))
      .returning();

    if (!deleted.length) {
      return Response.json(
        { error: "Result not found" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "Result deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}