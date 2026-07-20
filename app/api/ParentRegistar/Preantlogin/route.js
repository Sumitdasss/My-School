import { db } from "../../../../db/index";
import { Parent, Students } from "../../../../db/schema";
import { eq ,and } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const Parent11 = await db
      .select()
      .from(Parent)
      .where(eq(Parent.email, email));

    if (Parent11.length === 0) {
      return Response.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }
console.log(Parent11);
console.log(email);
    const Parentall = Parent11[0];

    const match = await bcrypt.compare(password, Parentall.password);

    if (!match) {
      return Response.json(
        { message: "Wrong password" },
        { status: 401 }
      );
    }
const student = await db
  .select()
  .from(Students)
  .where(
    and(
      eq(Students.fullName, Parentall.childName),
      eq(Students.rollNumber, Parentall.childRoll)
    )
  );

if (student.length > 0) {
  await db
    .update(Students)
    .set({
      parentId: Parentall.id,
    })
    .where(eq(Students.id, student[0].id));
}

const students = await db
  .select()
  .from(Students)
  .where(eq(Students.parentId, Parentall.id));

    const token = jwt.sign(
      {
        id: Parentall.id,
        email: Parentall.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return Response.json({
      success: true,
      token,
      Parentall,
      students,
    });

  } catch (error) {
     console.log("ERROR:", error);
  console.log("MESSAGE:", error.message);
  console.log("CAUSE:", error.cause);
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}