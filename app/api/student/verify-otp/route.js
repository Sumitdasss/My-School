import { NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";

import { db } from "../../../../db/index.js";
import { OTP, Students, Parent, Teacher } from "../../../../db/schema.js";

export async function POST(req) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and OTP are required",
        },
        { status: 400 }
      );
    }

    // Student / Parent / Teacher Check
    const student = await db
      .select()
      .from(Students)
      .where(eq(Students.email, email));

    const parent = await db
      .select()
      .from(Parent)
      .where(eq(Parent.email, email));

    const teacher = await db
      .select()
      .from(Teacher)
      .where(eq(Teacher.email, email));

    if (
      student.length === 0 &&
      parent.length === 0 &&
      teacher.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Email not found",
        },
        { status: 404 }
      );
    }

    // OTP Check
    const result = await db
      .select()
      .from(OTP)
      .where(
        and(
          eq(OTP.email, email),
          eq(OTP.otp, otp)
        )
      );

    if (result.length === 0) {
      return NextResponse.json({
        success: false,
        message: "Invalid OTP",
      });
    }

    const otpData = result[0];

    // OTP Expire Check
    if (new Date() > new Date(otpData.expiresAt)) {
      await db.delete(OTP).where(eq(OTP.email, email));

      return NextResponse.json({
        success: false,
        message: "OTP Expired",
      });
    }

    return NextResponse.json({
      success: true,
      message: "OTP Verified Successfully",
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}