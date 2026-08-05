import { db } from "../../../../db/index.js";
import {Parent} from "../../../../db/schema.js"
import { eq } from "drizzle-orm";
import fs from "fs"
import path from "path";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    console.log("ID:", id);

    const parent= await db
      .select()
      .from(Parent)
      .where(eq(Parent.id, Number(id)));

    console.log("Student:", parent);

    if (parent.length === 0) {
      return Response.json(
        { message: "Student Not Found" },
        { status: 404 }
      );
    }

    return Response.json(parent[0]);
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

     const parent = await db
          .select()
          .from(Parent)
          .where(eq(Parent.id, Number(id)));
        
        if (parent.length === 0) {
          return Response.json(
            { message: "Parent Not Found" },
            { status: 404 }
          );
        }

    const formData = await req.formData();

    const photo = formData.get("photo");

    let photoPath = parent[0].photo;

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
    const email = formData.get("email");
    const phone = formData.get("phone");
    const childName = formData.get("childName");
    const childClass = formData.get("childClass");
    const childRoll = formData.get("childRoll");

    const childEmail = formData.get("childEmail");

    await db
      .update(Parent)
      .set({
        fullName,
    phone,
    email,
    childName,
    childClass,
    childRoll,
    childEmail,


    photo: photoPath,
      })
      .where(eq(Parent.id, Number(id)));

    return Response.json({
      success: true,
      message: "Parent Updated Successfully",
    });
  } catch (error) {
    return Response.json(
      { message: error.message },
      { status: 500 }
    );
  }
}