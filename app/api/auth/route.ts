import dbConnect from '@/lib/mongo';
import { User } from '@/lib/userModel';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { NextApiRequest, NextApiResponse } from 'next';
const userSchema = z.object({
  email: z.string().email().min(1, 'Email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  action: z.enum(['register', 'login']),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = JSON.parse(req.body);

    // Validate request body
    const { email, password, action } = userSchema.parse(body);

    // Connect to MongoDB
    await dbConnect();

    // Handle registration or login
    if (action === 'register') {
      return await handleRegister(email, password, res);
    } else if (action === 'login') {
      return await handleLogin(email, password, res);
    }

    return res.status(400).json({ error: 'Invalid request' });
  } catch (error) {
    console.error('Error handling request:', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Invalid input',
        details: error.errors.map((err) => err.message),
      });
    }

    return res.status(500).json({ error: 'Server error' });
  }
}

async function handleRegister(email: string, password: string, res: NextApiResponse) {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();

  return res.status(201).json({ success: true, message: 'User registered successfully' });
}

async function handleLogin(email: string, password: string, res: NextApiResponse) {
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  return res.status(200).json({ success: true, message: 'Login successful' });
}