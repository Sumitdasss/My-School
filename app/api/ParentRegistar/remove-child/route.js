import { db } from "@/db";
import { Students } from "@/db/schema";
import { eq, and } from "drizzle-orm";


export async function DELETE(req) {

  try {

    const body = await req.json();


    const {
      parentId,
      studentId
    } = body;



    if(!parentId || !studentId){

      return Response.json(
        {
          success:false,
          message:"Parent id and student id required"
        },
        {
          status:400
        }
      );

    }



    const result = await db
    .update(Students)
    .set({

      parentId:null

    })
    .where(
      and(
        eq(Students.id, Number(studentId)),
        eq(Students.parentId, Number(parentId))
      )
    )
    .returning();



    if(result.length === 0){

      return Response.json(
        {
          success:false,
          message:"Student not found"
        },
        {
          status:404
        }
      );

    }



    return Response.json(
      {
        success:true,
        message:"Child removed successfully",
        student:result[0]
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