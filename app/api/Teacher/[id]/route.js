import { db } from "../../../../db/index.js";
import {Teacher} from "../../../../db/schema.js"
import { eq } from "drizzle-orm";
import fs from "fs"
import path from "path";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    console.log("ID:", id);

    const teacher = await db
      .select()
      .from(Teacher)
      .where(eq(Teacher.id, Number(id)));

    console.log("Teacher:", teacher);

    if (teacher.length === 0) {
      return Response.json(
        { message: "Teacher Not Found" },
        { status: 404 }
      );
    }

    return Response.json(teacher[0]);
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

     const teacher = await db
      .select()
      .from(Teacher)
      .where(eq(Teacher.id, Number(id)));
    
    if (teacher.length === 0) {
      return Response.json(
        { message: "Teacher Not Found" },
        { status: 404 }
      );
    }

    const formData = await req.formData();

    const photo = formData.get("photo");

    let photoPath = teacher[0].photo;

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
   
  await db
      .update(Teacher)
      .set({
        fullName,
  
        phone,
        email,
       
        photo: photoPath,
      })
      .where(eq(Teacher.id, Number(id)));

    return Response.json({
      success: true,
      message: "Teacher Updated Successfully",
    });
  } catch (error) {
    return Response.json(
      { message: error.message },
      { status: 500 }
    );
  }
}