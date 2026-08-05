import { db } from "../../../../db/index";
import { Students, AdmitCards } from "../../../../db/schema";

import { eq } from "drizzle-orm";

export async function GET(req) {
  try {

    const { searchParams } = new URL(req.url);

    const roll = searchParams.get("roll");


    if (!roll) {
  const admitCards = await db
    .select({
      id: AdmitCards.id,
      examName: AdmitCards.examName,
      examDate: AdmitCards.examDate,
      room: AdmitCards.room,
      seatNo: AdmitCards.seatNo,

      fullName: Students.fullName,
      rollNumber: Students.rollNumber,
      photo: Students.photo,
      class1: Students.class1,
      section: Students.section,
    })
    .from(AdmitCards)
    .innerJoin(
      Students,
      eq(AdmitCards.studentId, Students.id)
    );

  return Response.json({
    success: true,
    admitCards,
  });
}

    // Student Find

    const student = await db
      .select()
      .from(Students)
      .where(
        eq(
          Students.rollNumber,
          Number(roll)
        )
      );


    if(student.length === 0){

      return Response.json(
        {
          success:false,
          message:"Student Not Found"
        },
        {status:404}
      );

    }



    // Student Admit Cards

   const admitCards = await db
  .select({
    id: AdmitCards.id,
    examName: AdmitCards.examName,
    examDate: AdmitCards.examDate,
    room: AdmitCards.room,
    seatNo: AdmitCards.seatNo,

    fullName: Students.fullName,
    rollNumber: Students.rollNumber,
    photo: Students.photo,
    class1: Students.class1,
    section: Students.section,
  })
  .from(AdmitCards)
  .innerJoin(
    Students,
    eq(AdmitCards.studentId, Students.id)
  )
  .where(eq(Students.rollNumber, Number(roll)));



    return Response.json({

      success:true,

      student:student[0],

      admitCards:admitCards

    });



  }
  catch(error){

    console.log(error);

    return Response.json(
      {
        success:false,
        message:"Server Error"
      },
      {
        status:500
      }
    );

  }
}
export async function POST(req) {
  try {
    const body = await req.json();

    const {
      studentId,
      examName,
      examYear,
      center,
      examDate,
      examTime,
      room,
      seatNo,
    } = body;

    const student = await db
      .select()
      .from(Students)
      .where(eq(Students.id, studentId));

    if (student.length === 0) {
      return Response.json(
        {
          success: false,
          message: "Student Not Found",
        },
        { status: 404 }
      );
    }

    await db.insert(AdmitCards).values({
      studentId,
      examName,
      examYear,
      center,
      examDate,
      examTime,
      room,
      seatNo,
      status: true,
    });

    return Response.json({
      success: true,
      message: "Admit Card Generated Successfully",
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();

    const {
      id,
      center,
      examDate,
      examTime,
      room,
      seatNo,
      status,
    } = body;

    await db
      .update(AdmitCards)
      .set({
        center,
        examDate,
        examTime,
        room,
        seatNo,
        status,
      })
      .where(eq(AdmitCards.id, id));

    return Response.json({
      success: true,
      message: "Admit Card Updated Successfully",
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);

    const id = Number(searchParams.get("id"));

    await db.delete(AdmitCards).where(eq(AdmitCards.id, id));

    return Response.json({
      success: true,
      message: "Admit Card Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}


