import { db } from "../../../../db/index";
import { Students,LoginHistory } from "../../../../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import emitter from "../../../../lib/events.js"
import "../../../../lib/listener.js"
export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const Student = await db
      .select()
      .from(Students)
      .where(eq(Students.email, email));

    if (Student.length === 0) {
      return Response.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    const Studentall = Student[0];

    const match = await bcrypt.compare(password, Studentall.password);

    if (!match) {
      return Response.json(
        { message: "Wrong password" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        id: Studentall.id,
        email: Studentall.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
await db.insert(LoginHistory).values({
  studentId: Studentall.id,
  loginAt: new Date(),
});
    
emitter.emit("student-login", Studentall);

    return Response.json({
      success: true,
      token,
      Studentall,
    });

  } catch (error) {
  console.error(error);

  return Response.json(
    {
      message: error.message,
      stack: error.stack,
    },
    { status: 500 }
  );
}
}