import { prisma } from "../../../../lib/prisma";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const student = await prisma.Parent.findFirst({
      where: {
        OR: [
          { email },
          { phone: email },
        ],
      },
    });

    if (!student) {
      return Response.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    if (student.password !== password) {
      return Response.json(
        { message: "Wrong password" },
        { status: 401 }
      );
    }

    return Response.json({
      message: "Login Success",
       Parent: student,
    });
  } catch (error) {
    return Response.json(
      { message: error.message },
      { status: 500 }
    );
  }
}