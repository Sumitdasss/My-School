import { db } from "../../../../../db/index.js";
import { Parent,Students } from "../../../../../db/schema.js";
import { eq } from "drizzle-orm";

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    // আগে সব Student-এর parentId null করো
    await db
      .update(Students)
      .set({ parentId: null })
      .where(eq(Students.parentId, Number(id)));

    // তারপর Parent delete করো
    await db
      .delete(Parent)
      .where(eq(Parent.id, Number(id)));

    return Response.json({
      success: true,
      message: "Parent deleted successfully",
    });

  } catch (err) {
    console.error(err);

    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}