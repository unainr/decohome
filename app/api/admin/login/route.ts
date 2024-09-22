import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongo';
import { Admin } from '@/lib/adminModel';
import { serialize } from 'cookie';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  try {
    const { email, password, action } = await req.json();

    // Validate the incoming request data
    if (!email || !password || !action) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    // Connect to the database
    await dbConnect();

    // Handle 'register' action
    if (action === 'register') {
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return NextResponse.json({ error: 'Admin already exists' }, { status: 400 });
      }

      // Hash the password before saving the admin
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new admin
      const newAdmin = new Admin({ email, password: hashedPassword });
      await newAdmin.save();

      return NextResponse.json({ success: true, message: 'Registration successful' }, { status: 201 });
    }

    // Handle 'login' action
    if (action === 'login') {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }

      // Compare the password securely
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }

      // Set the secure cookie
      const cookieOptions = {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict' as 'strict',
        maxAge: 60 * 60 * 24, // 1 day expiration
      };

      const response = NextResponse.json({ success: true, message: 'Login successful' });
      response.headers.set('Set-Cookie', serialize('adminEmail', email, cookieOptions));

      return response;
    }

    // Default response for invalid action
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  } catch (error) {
    console.error('Error during admin registration/login:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
