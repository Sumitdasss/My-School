import { db } from "../../../../db/index.js";
import { TeacherAssignments, Teacher, Subjects } from "../../../../db/schema.js";
import { eq } from "drizzle-orm";


// GET — সব Assignment দেখো
export async function GET() {
  const assignments = await db
    .select({
      id: TeacherAssignments.id,
      teacherName: Teacher.fullName,
      subjectName: Subjects.subjectName,
      class1: TeacherAssignments.class1,
      section: TeacherAssignments.section,
    })
    
    .from(TeacherAssignments)
    .innerJoin(Teacher, eq(TeacherAssignments.teacherId, Teacher.id))
    .innerJoin(Subjects, eq(TeacherAssignments.subjectId, Subjects.id))
    .orderBy(TeacherAssignments.id);
 const teachers = await db
    .select({
      id: Teacher.id,
      fullName: Teacher.fullName,
    })
    .from(Teacher);


 
  return Response.json({ assignments,teachers });
}

// POST — Teacher কে Subject assign করো
export async function POST(req) {
  const { teacherId, subjectId, class1, section } = await req.json();

  if (!teacherId || !subjectId || !class1 || !section) {
    return Response.json(
      { error: "All fields required" },
      { status: 400 }
    );
  }

  const newAssignment = await db
    .insert(TeacherAssignments)
    .values({ teacherId, subjectId, class1, section })
    .returning();

  return Response.json({ success: true, assignment: newAssignment[0] });
}

