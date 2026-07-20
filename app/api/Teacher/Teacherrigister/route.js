import { db } from "../../../../db/index";
import {Teacher} from "../../../../db/schema"
import { eq } from "drizzle-orm";
import fs from "fs"
import path from "path";
import bcrypt from "bcryptjs";
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

      fs.writeFileSync(path.join(uploadDir, fileName), buffer);

      photoPath = `/uploads/${fileName}`;
    }

    const fullName = formData.get("fullName");
    const dateOfBirth = formData.get("dateOfBirth");
    const phone = formData.get("phone");
    const email = formData.get("email");
    const password = formData.get("password");

    // Email Check
    const emailExists = await db
      .select()
      .from(Teacher)
      .where(eq(Teacher.email, email));

    if (emailExists.length > 0) {
      return Response.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    // Phone Check
    const phoneExists = await db
      .select()
      .from(Teacher)
      .where(eq(Teacher.phone, phone));

    if (phoneExists.length > 0) {
      return Response.json(
        { error: "Phone already exists" },
        { status: 400 }
      );
    }
const hashedPassword = await bcrypt.hash(password, 10);
    // Insert
    await db.insert(Teacher).values({
      fullName,
     
      dateOfBirth: new Date(dateOfBirth),
      phone,
      email,
      password:hashedPassword,
      photo: photoPath,
    });

    return Response.json({
      success: true,
     message: "Teacher Registered Successfully",
    });
  } catch (err) {
    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}