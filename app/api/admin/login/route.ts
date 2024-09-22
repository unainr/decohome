import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongo';
import { Admin } from '@/lib/adminModel';
import { serialize } from 'cookie'; // Cookie helper
import bcrypt from 'bcrypt'; // For password hashing

export async function POST(req: NextRequest) {
  try {
    const { email, password, action } = await req.json();

    // Validate request body
    if (!email || !password || action !== 'login') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // Connect to the database
    await dbConnect();

    // Find the admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Compare password securely
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Store admin email in a secure cookie
    const response = NextResponse.json({ success: true, message: 'Login successful' });
    response.headers.set('Set-Cookie', serialize('adminEmail', email, {
      path: '/', // Make it accessible throughout the app
      httpOnly: true, // Secure cookie (accessible only by server)
      secure: process.env.NODE_ENV === 'production', // Ensure cookie is only sent over HTTPS in production
      sameSite: 'strict', // Protect against CSRF attacks
      maxAge: 60 * 60 * 24, // Cookie expiration: 1 day
    }));

    return response;
  } catch (error) {
    console.error('Error during admin login:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
