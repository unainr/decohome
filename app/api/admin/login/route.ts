import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongo';
import { Admin } from '@/lib/adminModel';
import { serialize } from 'cookie'; // Cookie helper

export async function POST(req: NextRequest) {
  const { email, password, action } = await req.json();

  await dbConnect();

  if (action === 'login') {
    const admin = await Admin.findOne({ email });
    if (!admin || admin.password !== password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Store admin email in a cookie
    const response = NextResponse.json({ success: true, message: 'Login successful' });
    response.headers.set('Set-Cookie', serialize('adminEmail', email, {
      path: '/', // Make it accessible throughout the app
      httpOnly: true, // Secure cookie (accessible only by server)
      maxAge: 60 * 60 * 24, // Cookie expiration: 1 day
    }));

    return response;
  }

  return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
}
