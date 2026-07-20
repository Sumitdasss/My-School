import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';
import { eq } from 'drizzle-orm';
import { db } from "../../../../../db/index.js";
import { Admin } from "../../../../../db/schema.js";

export async function POST(request) {
  const { username, password } = await request.json();

  try {
    const result = await db
      .select()
      .from(Admin)
      .where(eq(Admin.username, username));

    const admin = result[0];

    if (!admin) {
      return Response.json(
        { message: "Wrong username or password" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return Response.json(
        { message: "Wrong username or password" },
        { status: 401 }
      );
    }

    const token = await new SignJWT({
      id: admin.id,
      username: admin.username,
      role: admin.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("2h")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    return Response.json({
      success: true,
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        fullName: admin.fullName,
        email: admin.email,
        role: admin.role,
      },
    });

  } catch (err) {
    console.error(err);

    return Response.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}