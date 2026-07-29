import { db } from "../../../db/index.js";
import { Attendance, Students } from "../../../db/schema.js";
import { eq, and } from "drizzle-orm";

// =========================
// GET Attendance + Filters
// =========================
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const date = searchParams.get("date");
    const class1 = searchParams.get("class1");
    const section = searchParams.get("section");
    const filters = searchParams.get("filters");

    // =========================
    // Load Class & Section Filter
    // =========================
    if (filters === "true") {
      const classes = await db
        .select({
          class1: Students.class1,
        })
        .from(Students)
        .groupBy(Students.class1);

      const sections = await db
        .select({
          section: Students.section,
        })
        .from(Students)
        .groupBy(Students.section);

      return Response.json({
        classes,
        sections,
      });
    }

    if (!date) {
      return Response.json(
        { error: "Date is required" },
        { status: 400 }
      );
    }

    // =========================
    // Student List
    // =========================
    let students;

    if (class1 && section) {
      students = await db
        .select()
        .from(Students)
        .where(
          and(
            eq(Students.class1, class1),
            eq(Students.section, section)
          )
        );
    } else {
      students = await db.select().from(Students);
    }

    // =========================
    // Attendance
    // =========================
    const attendance = await db
      .select()
      .from(Attendance)
      .where(eq(Attendance.attendanceDate, date));

    const result = students.map((student) => {
      const att = attendance.find(
        (a) => a.studentId === student.id
      );

      return {
        ...student,
        status: att ? att.status : "",
      };
    });

    return Response.json(result);
  } catch (error) {
    console.log(error);

    return Response.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}

// =========================
// POST Attendance
// =========================
export async function POST(req) {
  try {
    const body = await req.json();

    const { date, attendance } = body;

    if (!date || !attendance?.length) {
      return Response.json(
        { error: "Invalid Data" },
        { status: 400 }
      );
    }

    for (const item of attendance) {
      const exist = await db
        .select()
        .from(Attendance)
        .where(
          and(
            eq(Attendance.studentId, item.studentId),
            eq(Attendance.attendanceDate, date)
          )
        );

      if (exist.length > 0) {
        await db
          .update(Attendance)
          .set({
            status: item.status,
          })
          .where(
            and(
              eq(Attendance.studentId, item.studentId),
              eq(Attendance.attendanceDate, date)
            )
          );
      } else {
        await db.insert(Attendance).values({
          studentId: item.studentId,
          attendanceDate: date,
          status: item.status,
        });
      }
    }

    return Response.json({
      success: true,
      message: "Attendance Saved Successfully",
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}