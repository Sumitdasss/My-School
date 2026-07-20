import bcrypt from 'bcrypt';
import { jwtVerify } from 'jose';
import db from '@/db';
import { admins } from '@/db/schema';

export async function POST(request) {
  try {
    // ১. Token বের করা (cookie থেকে)
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return Response.json({ message: 'Login করা নেই' }, { status: 401 });
    }

    // ২. Token verify করা
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    // ৩. Role check করা - শুধু super_admin এই কাজ করতে পারবে
    if (payload.role !== 'super_admin') {
      return Response.json(
        { message: 'তোমার এই কাজের অনুমতি নেই' },
        { status: 403 }
      );
    }

    // ৪. এখন safe - নতুন staff তৈরি করা
    const { username, email, password, fullName, role } = await request.json();

    // Validation
    if (!username || !email || !password || !fullName || !role) {
      return Response.json(
        { message: 'সব field পূরণ করতে হবে' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await db.insert(admins).values({
      username,
      email,
      password: hashedPassword,
      fullName,
      role,
    }).returning({ id: admins.id, username: admins.username, role: admins.role });

    return Response.json({ 
      message: 'নতুন স্টাফ তৈরি হয়েছে', 
      staff: newAdmin[0] 
    });

  } catch (err) {
    console.error(err);
    return Response.json({ message: 'Token সঠিক নয় বা সার্ভার এরর' }, { status: 401 });
  }
}