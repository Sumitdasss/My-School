import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "../../../../db/index.js";
import {
  Students,
  Parent,
  Teacher,
  OTP,
} from "../../../../db/schema.js";

import { transporter } from "../../../../lib/mail.js";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 }
      );
    }

    // Student Check
    const student = await db
      .select()
      .from(Students)
      .where(eq(Students.email, email));

    // Parent Check
    const parent = await db
      .select()
      .from(Parent)
      .where(eq(Parent.email, email));

    // Teacher Check
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

    // Generate OTP
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Expire Time
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Delete Old OTP
    await db.delete(OTP).where(eq(OTP.email, email));

    // Save OTP
    await db.insert(OTP).values({
      email,
      otp,
      expiresAt,
    });

    // Send Email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      html: `
        <div style="font-family:Arial;padding:20px">
          <h2>School Management System</h2>

          <p>Your OTP is:</p>

          <h1 style="color:#D4AF37">${otp}</h1>

          <p>This OTP will expire in 5 minutes.</p>

          <p>If you did not request this, ignore this email.</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "OTP Sent Successfully",
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}