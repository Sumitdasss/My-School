import { db } from "../../../../db/index.js";
import { Payments, Students } from "../../../../db/schema.js";
import { eq } from "drizzle-orm";

export async function GET(req, { params }) {
  try {

    const { id } = await params;

    const receipt = await db
      .select({

        paymentId: Payments.id,

        amount: Payments.amount,

        feeType: Payments.feeType,

        status: Payments.status,

        transactionId: Payments.transactionId,

        paymentDate: Payments.paymentDate,

        studentId: Students.id,

        fullName: Students.fullName,

        rollNumber: Students.rollNumber,

        class1: Students.class1,

        section: Students.section,

        phone: Students.phone,

        email: Students.email,

        photo: Students.photo,

      })

      .from(Payments)

      .innerJoin(
        Students,
        eq(Payments.studentId, Students.id)
      )

      .where(
        eq(Payments.id, Number(id))
      );

    if (receipt.length === 0) {

      return Response.json(
        {
          success: false,
          message: "Receipt Not Found",
        },
        {
          status: 404,
        }
      );

    }

    return Response.json(
      {
        success: true,
        receipt: receipt[0],
      },
      {
        status: 200,
      }
    );

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );

  }
}