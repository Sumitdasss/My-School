import { prisma } from "../../../lib/prisma";
import fs from "fs";
import path from "path";
export async function GET() {
  const parents = await prisma.Parent.findMany();
  return Response.json(parents);
}

export async function POST(req) {
  try {
   const formData = await req.formData();


   
const photo = formData.get("photo");
let photoPath = "";

if (photo && photo.size > 0) {
  const bytes = await photo.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = `${Date.now()}-${photo.name}`;


  const uploadDir = path.join(process.cwd(), "public/uploads");


  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }


  fs.writeFileSync(
    path.join(uploadDir, fileName),
    buffer
  );

  photoPath = `/uploads/${fileName}`;
}
const fullName = formData.get("fullName");
const email = formData.get("email");
const phone = formData.get("phone");
const childName = formData.get("childName");
const childClass = formData.get("childClass");
const childRoll = formData.get("childRoll");
const password = formData.get("password");

   const emailExists = await prisma.Parent.findUnique({
      where: {
        email:email,
      },
    });

    if (emailExists) {
      return Response.json(
        { error: "This email is already registered." },
        { status: 400 }
      );
    }

    // Phone আছে কিনা
    const phoneExists = await prisma.Parent.findUnique({
      where: {
        phone:phone,
      },
    });

    if (phoneExists) {
      return Response.json(
        { error: "This phone number is already registered." },
        { status: 400 }
      );
    }

    const student = await prisma.Parent.create({
      data: {
     fullName,
email,
phone,
childName,
childClass,
childRoll,
password,
photo: photoPath
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