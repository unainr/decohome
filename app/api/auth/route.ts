import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongo';
import { User } from '@/lib/userModel';
import bcrypt from 'bcrypt';
import { z } from 'zod';

// Define schema for input validation using zod
const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  action: z.enum(['register', 'login']),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate request body using zod schema
    const { email, password, action } = userSchema.parse(body);

    // Connect to the database
    await dbConnect();

    if (action === 'register') {
      return handleRegister(email, password);
    } else if (action === 'login') {
      return handleLogin(email, password);
    }

    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  } catch (error) {
    console.error('Error handling request:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

async function handleRegister(email: string, password: string) {
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create and save the new user
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();

  return NextResponse.json({ success: true, message: 'User registered successfully' }, { status: 201 });
}

async function handleLogin(email: string, password: string) {
  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Check password validity
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Successful login response (consider adding a JWT for authentication)
  return NextResponse.json({ success: true, message: 'Login successful' }, { status: 200 });
}
