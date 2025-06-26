import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    console.log("API Password:", password);
    console.log("API Email:", email);

    await dbConnect(); // Ensure Mongoose is connected
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const isPasswordValid = bcrypt.compareSync(password, admin.password);

    console.log("API Username:", admin.email);
    console.log("API Hashed Password:", admin.password);

    if (isPasswordValid) {
      const cookieStore = await cookies();
      cookieStore.set('loggedIn', 'true', {
        httpOnly: true,
        path: '/',
      });
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ success: false, message: 'Login failed' }, { status: 500 });
  }
}
