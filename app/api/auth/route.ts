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

exports.handler = async function(event:any, context:any) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const body = JSON.parse(event.body);

    // Validate request body
    const { email, password, action } = userSchema.parse(body);

    // Connect to MongoDB
    await dbConnect();

    // Handle registration or login
    if (action === 'register') {
      return await handleRegister(email, password);
    } else if (action === 'login') {
      return await handleLogin(email, password);
    }

    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid request' }),
    };
  } catch (error) {
    console.error('Error handling request:', error);

    if (error instanceof z.ZodError) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Invalid input',
          details: error.errors.map((err) => err.message),
        }),
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error' }),
    };
  }
};

async function handleRegister(email:any, password:any) {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'User already exists' }),
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();

  return {
    statusCode: 201,
    body: JSON.stringify({ success: true, message: 'User registered successfully' }),
  };
}

async function handleLogin(email:any, password:any) {
  const user = await User.findOne({ email });
  if (!user) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Invalid credentials' }),
    };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Invalid credentials' }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, message: 'Login successful' }),
  };
}