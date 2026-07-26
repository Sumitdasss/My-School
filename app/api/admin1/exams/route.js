import { db } from "../../../../db/index.js";
import { Exams } from "../../../../db/schema.js";


// GET — সব Exam দেখো
export async function GET() {
  const exams = await db.select().from(Exams).orderBy(Exams.id);
  return Response.json({ exams });
}

// POST — নতুন Exam add করো
export async function POST(req) {
  const { examName, examYear, class1, section } = await req.json();

  if (!examName || !examYear || !class1 || !section) {
    return Response.json(
      { error: "All fields required" },
      { status: 400 }
    );
  }

  const newExam = await db
    .insert(Exams)
    .values({ examName, examYear, class1, section })
    .returning();

  return Response.json({ success: true, exam: newExam[0] });
}