import { db } from "../../../db/index.js";
import {Notices} from "../../../db/schema.js"

import fs from "fs"
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const photo = formData.get("file");
    let photoPath = "";

    if (photo && photo.size > 0) {
      const bytes = await photo.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}-${photo.name}`;

      const uploadDir = path.join(process.cwd(), "public/uploads");

      fs.writeFileSync(path.join(uploadDir, fileName), buffer);

      photoPath = `/uploads/${fileName}`;
    }

   const title = formData.get("title");
    const slug = formData.get("slug");
    const category = formData.get("category");
    const urgent = formData.get("urgent");
    const shortDescription = formData.get("shortDescription");
    const description = formData.get("description");
  
    const date = formData.get("date");
   
    // Email Check
   

    // Phone Check
   
    // Insert



    await db.insert(Notices).values({
      title,
      slug,
      category,
      date,
     urgent,
     shortDescription,
     description,
      attachment: photoPath,
     
    });

    return Response.json({
      success: true,
     message: "Notice add  Successfully",
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