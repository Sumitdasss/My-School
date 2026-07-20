import { db } from "../../../../db/index";
import { Teacher } from "../../../../db/schema";
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

    return Response.json({
      success: true,
      token,
      teacher,
    });

  } catch (error) {
    console.log(error);

    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}