import { db } from "../../../db/index.js";
import { Results, Students, Subjects,Exams } from "../../../db/schema.js";
import { eq, and, like } from "drizzle-orm";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const roll = searchParams.get("roll");
    const fullName = searchParams.get("name");
    const class1 = searchParams.get("class");
    const section = searchParams.get("section");
    const examName = searchParams.get("examName");



    let query = db
      .select({

        resultId: Results.id,

        // Student Info
        studentId: Students.id,
        fullName: Students.fullName,
        rollNumber: Students.rollNumber,
        class1: Students.class1,
        section: Students.section,
        photo: Students.photo,


        // Result Info
        marks: Results.marksObtained,
        totalMarks: Results.totalMarks,

        examId: Results.examId,

  examName: Exams.examName,
  examYear: Exams.examYear,

        // Subject Info
        subjectId: Results.subjectId,
        subjectName: Subjects.subjectName,


        // Teacher
        teacherId: Results.teacherId,


        createdAt: Results.createdAt,

      })

      .from(Results)

      .innerJoin(
        Students,
        eq(
          Results.studentId,
          Students.id
        )
      )

      .innerJoin(
        Subjects,
        eq(
          Results.subjectId,
          Subjects.id
        )
      ).innerJoin(
  Exams,
  eq(
    Results.examId,
    Exams.id
  )
);



    const conditions = [];



    if (roll) {
      conditions.push(
        eq(
          Students.rollNumber,
          roll
        )
      );
    }



    if (fullName) {
      conditions.push(
        like(
          Students.fullName,
          `%${fullName}%`
        )
      );
    }



    if (class1) {
      conditions.push(
        eq(
          Students.class1,
          class1
        )
      );
    }



    if (section) {
      conditions.push(
        eq(
          Students.section,
          section
        )
      );
    }



    if (conditions.length > 0) {

      query = query.where(
        and(...conditions)
      );

    }



    const data = await query;

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
const exams = await db
  .select({
    examName: Exams.examName,
  })
  .from(Exams)
  .groupBy(Exams.examName);
    return Response.json(
      {
        success: true,
        data,
        classes,
        sections,
        exams
      },
      {
        status: 200
      }
    );



  } catch (error) {

    console.log("Result GET Error:", error);


    return Response.json(
      {
        success:false,
        message:error.message
      },
      {
        status:500
      }
    );

  }
}