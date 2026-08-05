import { db } from "../../../../db/index.js";
import {Students} from "../../../../db/schema.js"
import { eq } from "drizzle-orm";
import fs from "fs"
import path from "path";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    console.log("ID:", id);

    const student = await db
      .select()
      .from(Students)
      .where(eq(Students.id, Number(id)));

    console.log("Student:", student);

    if (student.length === 0) {
      return Response.json(
        { message: "Student Not Found" },
        { status: 404 }
      );
    }

    return Response.json(student[0]);
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
export async function PUT(req, { params }) {
  try {
    const { id } = await params;

    const student = await db
  .select()
  .from(Students)
  .where(eq(Students.id, Number(id)));

if (student.length === 0) {
  return Response.json(
    { message: "Student Not Found" },
    { status: 404 }
  );
}

    const formData = await req.formData();

    const photo = formData.get("photo");

    let photoPath = student[0].photo;

    if (photo && photo.size > 0) {
      const bytes = await photo.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}-${photo.name}`;

      const uploadDir = path.join(
        process.cwd(),
        "public/uploads"
      );

      fs.writeFileSync(
        path.join(uploadDir, fileName),
        buffer
      );

      photoPath = `/uploads/${fileName}`;
    }

    const fullName = formData.get("fullName");
   
    const phone = formData.get("phone");
    const email = formData.get("email");
    const rollNumber = formData.get("rollNumber");
    const class1 = formData.get("class");
    const section = formData.get("section");
   

    await db
      .update(Students)
      .set({
        fullName,
     
        phone,
        email,
        rollNumber,
        class1,
        section,
        photo: photoPath,
      })
      .where(eq(Students.id, Number(id)));

    return Response.json({
      success: true,
      message: "Student Updated Successfully",
    });
  } catch (error) {
    return Response.json(
      { message: error.message },
      { status: 500 }
    );
  }
}


export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    console.log("DELETE ID:", id);

    await db
      .delete(Students)
      .where(eq(Students.id, Number(id)));

    return Response.json({
      success: true,
    });

  } catch (err) {
    console.error(err);

    return Response.json(
      {
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}