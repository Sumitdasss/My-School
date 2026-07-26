
import { db } from "../../../../db/index.js";
import { Subjects } from "../../../../db/schema.js";


// GET — সব Subject দেখো
export async function GET() {
  const subjects = await db.select().from(Subjects).orderBy(Subjects.id);
  return Response.json({ subjects });
}

// POST — নতুন Subject add করো
export async function POST(req) {
  const { subjectName, class1 } = await req.json();

  if (!subjectName || !class1) {
    return Response.json(
      { error: "Subject name and class required" },
      { status: 400 }
    );
  }

  const newSubject = await db
    .insert(Subjects)
    .values({ subjectName, class1 })
    .returning();

  return Response.json({ success: true, subject: newSubject[0] });
}