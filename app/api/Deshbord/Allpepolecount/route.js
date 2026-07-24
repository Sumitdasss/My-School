/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "../../../../db/index.js";
import { Students, Teacher, Parent,LoginHistory,ParentLoginHistory,TeacherLoginHistory } from "../../../../db/schema.js";
import { and, gte, lt, eq, desc, sql } from "drizzle-orm";

export async function GET() {
  try {
    const students = await db.select().from(Students);
    const teachers = await db.select().from(Teacher);
    const parents = await db.select().from(Parent);

    // Current month
    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const fiveHoursAgo = new Date(Date.now() - 5 * 60 * 60 * 1000);
    await db
      .delete(LoginHistory)
      .where(lt(LoginHistory.loginAt, fiveHoursAgo));
    await db
      .delete(ParentLoginHistory)
      .where(lt(ParentLoginHistory.loginAt, fiveHoursAgo));
    await db
      .delete(TeacherLoginHistory)
      .where(lt(TeacherLoginHistory.loginAt, fiveHoursAgo));
    // Previous month
    const previousMonthStart = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1
    );

    // Students this month
    const currentStudents = await db
      .select()
      .from(Students)
      .where(gte(Students.createdAt, currentMonthStart));
    const currentParent = await db
      .select()
      .from(Parent)
      .where(gte(Parent.createdAt, currentMonthStart));

    // Students last month
    const previousStudents = await db
      .select()
      .from(Students)
      .where(
        and(
          gte(Students.createdAt, previousMonthStart),
          lt(Students.createdAt, currentMonthStart)
        )
      );
    const previousPrent = await db
      .select()
      .from(Parent)
      .where(
        and(
          gte(Parent.createdAt, previousMonthStart),
          lt(Parent.createdAt, currentMonthStart)
        )
      );

    const studentGrowth =
      previousStudents.length === 0? 100: (((currentStudents.length  - previousStudents.length ) / previousStudents.length ) *100 ).toFixed(1);
    const ParentGrowth =
      previousPrent.length === 0
        ? 100
        : (
            ((currentParent.length  - previousPrent.length ) /
              previousPrent.length ) *
            100
          ).toFixed(1);


let teacherStatus = "";

if (teachers.length >= 1 && teachers.length <= 10) {
  teacherStatus = "Low";
} else if (teachers.length >= 11 && teachers.length <= 20) {
  teacherStatus = "Average";
} else if (teachers.length >= 21 && teachers.length <= 40) {
  teacherStatus = "Good";
} else if (teachers.length >= 41) {
  teacherStatus = "Excellent";
}
 const studentActivities = await db
  .select({
    id: LoginHistory.id,
    name: Students.fullName,
    info: Students.rollNumber,
    role: sql`'Student'`,
    loginAt: LoginHistory.loginAt,
  })
  .from(LoginHistory)
  .leftJoin(Students, eq(LoginHistory.studentId, Students.id));

const parentActivities = await db
  .select({
    id: ParentLoginHistory.id,
    name: Parent.fullName,
    info: Parent.phone,
    role: sql`'Parent'`,
    loginAt: ParentLoginHistory.loginAt,
  })
  .from(ParentLoginHistory)
  .leftJoin(Parent, eq(ParentLoginHistory.ParentId, Parent.id));

const teacherActivities = await db
  .select({
    id: TeacherLoginHistory.id,
    name: Teacher.fullName,
    info: Teacher.id,
    role: sql`'Teacher'`,
    loginAt: TeacherLoginHistory.loginAt,
  })
  .from(TeacherLoginHistory)
  .leftJoin(Teacher, eq(TeacherLoginHistory.TeacherId, Teacher.id));

const activities = [
  ...studentActivities,
  ...parentActivities,
  ...teacherActivities,
]
  .sort((a, b) => new Date(b.loginAt) - new Date(a.loginAt))
  .slice(0, 10);


    return Response.json({
      totalStudents: students.length,
      totalTeachers: teachers.length,
      totalParents: parents.length,

      studentGrowth: `${studentGrowth}%`,
      ParentGrowth: `${ParentGrowth}%`,
      teacherStatus,
      activities
    });
  } catch (error) {
    return Response.json(
      { message: error.message },
      { status: 500 }
    );
  }
}