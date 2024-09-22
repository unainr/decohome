import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongo';
import { User } from '@/lib/userModel';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  try {
    const { email, password, action } = await req.json();

    // Validate inputs
    if (!email || !password || !action) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Connect to database only once per request
    await dbConnect();

    if (action === 'register') {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 });
      }

      // Hash the password for security
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create new user
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();

      return NextResponse.json({ success: true }, { status: 201 });
    }

    if (action === 'login') {
      // Find the user
      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }

      // Compare the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }

      // If login is successful
      return NextResponse.json({ success: true, message: 'Login successful' }, { status: 200 });
    }

    // If action is invalid
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  } catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
