import { db } from "../../../db/index.js";
import { ClassRoutine, RoutinePeriod } from "../../../db/schema.js";
import {eq,and} from "drizzle-orm"


export async function POST(req) {
  try {
    const formData = await req.formData();

    const className = formData.get("className");
    const section = formData.get("section");
    const shift = formData.get("shift");
    const day = formData.get("day");
    const time = formData.get("time");
    const subject = formData.get("subject");
    const teacher = formData.get("teacher");
    const period = formData.get("period");

    const [startTime, endTime] = time.includes(" - ")
      ? time.split(" - ")
      : time.split("-");

    if (!className || !section || !shift || !day || !teacher || !subject || !time || !period) {
      return Response.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // 🔑 প্রথমে check করো একই class/section/shift/day এর routine আগে থেকে আছে কিনা
    const existing = await db
      .select()
      .from(ClassRoutine)
      .where(
        and(
          eq(ClassRoutine.className, className),
          eq(ClassRoutine.section, section),
          eq(ClassRoutine.shift, shift),
          eq(ClassRoutine.day, day)
        )
      );

    let routineId;

    if (existing.length > 0) {
      // আগে থেকে থাকলে সেই routine id ব্যবহার করো
      routineId = existing[0].id;
    } else {
      // না থাকলে নতুন routine বানাও
      const routine = await db
        .insert(ClassRoutine)
        .values({ className, section, shift, day })
        .returning();
      routineId = routine[0].id;
    }

    await db.insert(RoutinePeriod).values({
      routineId,
      period: Number(period),
      startTime,
      endTime,
      subject,
      teacher,
    });

    return Response.json({ success: true, message: "Routine Added Successfully" });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const routines = await db.select().from(ClassRoutine);

    console.log("Routines:", routines);

    const data = await Promise.all(
      routines.map(async (routine) => {
        const periods = await db
          .select()
          .from(RoutinePeriod)
          .where(eq(RoutinePeriod.routineId, routine.id));

        console.log("Routine ID:", routine.id);
        console.log("Periods:", periods);

        return {
          ...routine,
          classes: periods.map((p) => ({
            period: p.period,
            subject: p.subject,
            teacher: p.teacher,
            time: `${p.startTime} - ${p.endTime}`,
          })),
        };
      })
    );

    console.log(data);

    return Response.json(data);
  } catch (err) {
    console.log(err);
    return Response.json({ error: "Server Error" }, { status: 500 });
  }
}