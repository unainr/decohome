import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongo';
import { User } from '@/lib/userModel';

export async function POST(req: NextRequest) {
  const { email, password, action } = await req.json();
  
  await dbConnect();

  if (action === 'register') {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    return NextResponse.json({ success: true }, { status: 201 });
  } 

  if (action === 'login') {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    return NextResponse.json({ success: true, message: 'Login successful' }, { status: 200 });
  }

  return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
}
