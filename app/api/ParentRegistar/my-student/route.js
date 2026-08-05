import { db } from "../../../../db/index.js";
import { Students } from "../../../../db/schema.js";
import { eq } from "drizzle-orm";


export async function GET(req) {

  try {


    const { searchParams } = new URL(req.url);

    const parentId = searchParams.get("parentId");


    if(!parentId){

      return Response.json(
        {
          message:"Parent id required"
        },
        {
          status:400
        }
      );

    }



    const students = await db
    .select({

      id: Students.id,
      fullName: Students.fullName,
      rollNumber: Students.rollNumber,
      class1: Students.class1,
      section: Students.section,
      photo: Students.photo

    })
    .from(Students)
    .where(
      eq(
        Students.parentId,
        Number(parentId)
      )
    );




    return Response.json(
      {
        success:true,
        students
      },
      {
        status:200
      }
    );



  } catch(error){


    console.log(error);


    return Response.json(
      {
        success:false,
        message:"Server error"
      },
      {
        status:500
      }
    );


  }


}