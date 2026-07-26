import { db } from "../../../../db/index.js";
import { Results, Subjects, Teacher, Students,TeacherAssignments } from "../../../../db/schema.js";
import { eq, and } from "drizzle-orm";

// ✅ Result ADD
export async function PUT(req) {
  try {
    const body = await req.json();
    const { studentRoll, examId, results } = body;

    if (!studentRoll || !examId || !results?.length) {
      return new Response(
        JSON.stringify({ error: "studentRoll, examId and results required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const student = await db
      .select()
      .from(Students)
      .where(eq(Students.rollNumber, String(studentRoll)))
      .limit(1);

    if (!student.length) {
      return new Response(
        JSON.stringify({ error: `Roll ${studentRoll} এর student পাওয়া যায়নি` }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const realStudentId = student[0].id;

    for (const r of results) {
      // আগে থাকলে delete করো
      await db.delete(Results).where(
        and(
          eq(Results.studentId, realStudentId),
          eq(Results.examId, Number(examId)),
          eq(Results.subjectId, Number(r.subjectId))
        )
      );

      const assignment = await db
  .select()
  .from(TeacherAssignments)
  .where(eq(TeacherAssignments.subjectId, Number(r.subjectId)))
  .limit(1);

const teacherId =
  assignment.length > 0 ? assignment[0].teacherId : null;
      // তারপর insert করো
      await db.insert(Results).values({
        studentId: realStudentId,
        examId: Number(examId),
        subjectId: Number(r.subjectId),
        teacherId: teacherId,
        marksObtained: Number(r.marksObtained),
        totalMarks: 100,
      });
    }

    return new Response(
      JSON.stringify({ success: true, message: `${student[0].fullName} এর result save হয়েছে!` }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("RESULT ADD ERROR:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// ✅ Result VIEW
export async function POST(req) {
  try {
    const body = await req.json();
    const { studentId, examId } = body;

    if (!studentId || !examId) {
      return new Response(
        JSON.stringify({ error: "studentId and examId required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const student = await db
      .select()
      .from(Students)
      .where(eq(Students.rollNumber, String(studentId)))
      .limit(1);

    if (!student.length) {
      return new Response(
        JSON.stringify({ results: [], summary: { totalObtained: 0, totalMarks: 0, percentage: 0 } }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const realStudentId = student[0].id;

    const results = await db
      .select({
        id: Results.id,
        subjectName: Subjects.subjectName,
        marksObtained: Results.marksObtained,
        totalMarks: Results.totalMarks,
        teacherName: Teacher.fullName,
      })
      .from(Results)
      .innerJoin(Subjects, eq(Results.subjectId, Subjects.id))
      .leftJoin(Teacher, eq(Results.teacherId, Teacher.id))
      .where(
        and(
          eq(Results.studentId, realStudentId),
          eq(Results.examId, Number(examId))
        )
      )
      .orderBy(Subjects.id);

    const totalObtained = results.reduce((sum, r) => sum + Number(r.marksObtained), 0);
    const totalMarks = results.reduce((sum, r) => sum + Number(r.totalMarks), 0);
    const percentage = totalMarks > 0
      ? ((totalObtained / totalMarks) * 100).toFixed(2)
      : 0;

    return new Response(
      JSON.stringify({
        student: { id: realStudentId, name: student[0].fullName, roll: student[0].rollNumber },
        results,
        summary: { totalObtained, totalMarks, percentage },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("RESULT FETCH ERROR:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// ✅ Result DELETE
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(
        JSON.stringify({ error: "id required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    await db.delete(Results).where(eq(Results.id, Number(id)));

    return new Response(
      JSON.stringify({ success: true, message: "Result deleted" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}