import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {
  // Clear the adminEmail cookie
  const response = NextResponse.json({ success: true, message: 'Logged out' });
  response.headers.set('Set-Cookie', serialize('adminEmail', '', {
    path: '/',
    httpOnly: true,
    maxAge: -1, // Expire the cookie immediately
  }));

  return response;
}
