import { db } from "../../../../db/index.js";
import { Parent, Students } from "../../../../db/schema.js";
import { and, eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const body = await req.json();

    const { parentId, rollNumber, class1 } = body;

    if (!parentId || !rollNumber || !class1) {
      return Response.json(
        {
          success: false,
          message: "Parent ID, Roll Number and Class are required.",
        },
        { status: 400 }
      );
    }

    // Parent exists?
    const parent = await db
      .select()
      .from(Parent)
      .where(eq(Parent.id, Number(parentId)));

    if (parent.length === 0) {
      return Response.json(
        {
          success: false,
          message: "Parent not found.",
        },
        { status: 404 }
      );
    }

    // Student exists?
    const student = await db
      .select()
      .from(Students)
      .where(
        and(
          eq(Students.rollNumber, rollNumber),
          eq(Students.class1, class1)
        )
      );

    if (student.length === 0) {
      return Response.json(
        {
          success: false,
          message: "Student not found.",
        },
        { status: 404 }
      );
    }

    // Already linked?
    if (student[0].parentId) {
      return Response.json(
        {
          success: false,
          message: "This student is already linked to a parent.",
        },
        { status: 400 }
      );
    }

    // Link student with parent
    await db
      .update(Students)
      .set({
        parentId: Number(parentId),
      })
      .where(eq(Students.id, student[0].id));

    return Response.json({
      success: true,
      message: "Child added successfully.",
    });

  } catch (error) {
    console.log(error);

    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}