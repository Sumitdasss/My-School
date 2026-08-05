import { NextResponse } from "next/server";
import { db } from "../../../../db/index.js";
import {
  Students,
  Parent,
  Teacher,
  OTP,
} from "../../../../db/schema.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and Password are required",
        },
        { status: 400 }
      );
    }

    // OTP Verify হয়েছে কিনা
    const otpData = await db
      .select()
      .from(OTP)
      .where(eq(OTP.email, email));

    if (otpData.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "OTP verification required",
        },
        { status: 400 }
      );
    }

    // Password Hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // Student Check
    const student = await db
      .select()
      .from(Students)
      .where(eq(Students.email, email));

    if (student.length > 0) {
      await db
        .update(Students)
        .set({
          password: hashedPassword,
          updatedAt: new Date(),
        })
        .where(eq(Students.email, email));
    }

    // Parent Check
    const parent = await db
      .select()
      .from(Parent)
      .where(eq(Parent.email, email));

    if (parent.length > 0) {
      await db
        .update(Parent)
        .set({
          password: hashedPassword,
          updatedAt: new Date(),
        })
        .where(eq(Parent.email, email));
    }

    // Teacher Check
    const teacher = await db
      .select()
      .from(Teacher)
      .where(eq(Teacher.email, email));

    if (teacher.length > 0) {
      await db
        .update(Teacher)
        .set({
          password: hashedPassword,
          updatedAt: new Date(),
        })
        .where(eq(Teacher.email, email));
    }

    // Email কোথাও না থাকলে
    if (
      student.length === 0 &&
      parent.length === 0 &&
      teacher.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // OTP Delete
    await db.delete(OTP).where(eq(OTP.email, email));

    return NextResponse.json({
      success: true,
      message: "Password Changed Successfully",
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