import { db } from "../../../../db/index";
import { Teacher,TeacherLoginHistory } from "../../../../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const teachers = await db
      .select()
      .from(Teacher)
      .where(eq(Teacher.email, email));

    if (teachers.length === 0) {
      return Response.json(
        { message: "Teacher not found" },
        { status: 404 }
      );
    }

    const teacher = teachers[0];

    const match = await bcrypt.compare(password, teacher.password);

    if (!match) {
      return Response.json(
        { message: "Wrong password" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        id: teacher.id,
        email: teacher.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );


await db.insert(TeacherLoginHistory).values({
  TeacherId: teacher.id,
  loginAt: new Date(),
});
    return Response.json({
      success: true,
      token,
      teacher,
    });

  } catch (error) {
    console.error("Full Error:", error);
  console.error("Cause:", error.cause);

    return Response.json(
      {  error: error.message,
      cause: error.cause,
      stack: error.stack, },
      { status: 500 }
    );
  }
}