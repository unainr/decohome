import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongo';
import { User } from '@/lib/userModel';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email().min(1, 'Email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  action: z.enum(['register', 'login']),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Incoming Request Body:", body);

    // Temporarily bypass Zod validation
    const { email, password, action } = body;

    if (action === 'login') {
      return await handleLogin(email, password); // Use your existing login logic
    } else if (action === 'register') {
      return await handleRegister(email, password); // Use your existing register logic
    }

    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  } catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}


async function handleRegister(email: string, password: string) {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();

  return NextResponse.json({ success: true, message: 'User registered successfully' }, { status: 201 });
}

async function handleLogin(email: string, password: string) {
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  return NextResponse.json({ success: true, message: 'Login successful' }, { status: 200 });
}
