import { prisma } from "../../../lib/prisma";

export async function GET() {
  const students = await prisma.student.findMany();
  return Response.json(students);
}

export async function POST(req) {
  try {
    const body = await req.json();

   const emailExists = await prisma.student.findUnique({
      where: {
        email: body.email,
      },
    });

    if (emailExists) {
      return Response.json(
        { error: "This email is already registered." },
        { status: 400 }
      );
    }

    // Phone আছে কিনা
    const phoneExists = await prisma.student.findUnique({
      where: {
        phone: body.phone,
      },
    });

    if (phoneExists) {
      return Response.json(
        { error: "This phone number is already registered." },
        { status: 400 }
      );
    }

    const student = await prisma.student.create({
      data: {
        fullName: body.fullName,
        fatherName: body.fatherName,
        motherName: body.motherName,
        dateOfBirth: new Date(body.dateOfBirth),
      
        phone: body.phone,
        email: body.email,
        password: body.password,
        confirmPassword: body.confirmPassword,
   
      },
    });

    return Response.json(student);
  } catch (error) {
    console.log(error);

    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}