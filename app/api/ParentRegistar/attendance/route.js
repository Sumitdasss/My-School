import { db } from "../../../../db/index.js";
import { Attendance, Students } from "../../../../db/schema.js";
import { eq } from "drizzle-orm";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const parentId = Number(searchParams.get("parentId"));

    if (!parentId) {
      return Response.json(
        { error: "Parent ID is required" },
        { status: 400 }
      );
    }

    // Parent এর সব Student বের করি
    const students = await db
      .select()
      .from(Students)
      .where(eq(Students.parentId, parentId));

    if (students.length === 0) {
      return Response.json(
        { error: "No students found for this parent" },
        { status: 404 }
      );
    }

    const result = [];

    for (const student of students) {
      const attendance = await db
        .select()
        .from(Attendance)
        .where(eq(Attendance.studentId, student.id));

      const totalPresent = attendance.filter(
        (a) => a.status === "Yes"
      ).length;

      const totalAbsent = attendance.filter(
        (a) => a.status === "No"
      ).length;

      const absentDates = attendance
        .filter((a) => a.status === "No")
        .map((a) => ({
          date: a.attendanceDate,
          status: a.status,
        }));

      result.push({
        student: {
          id: student.id,
          fullName: student.fullName,
          photo: student.photo,
          rollNumber: student.rollNumber,
          class1: student.class1,
          section: student.section,
        },
        summary: {
          totalDays: attendance.length,
          present: totalPresent,
          absent: totalAbsent,
        },
        attendance,
        absentDates,
      });
    }

    return Response.json({
      success: true,
      children: result,
    });

  } catch (err) {
    console.error(err);

    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}