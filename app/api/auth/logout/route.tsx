// app/api/auth/logout/route.tsx
import { NextResponse } from 'next/server';
import { setCookie } from '../../../lib/cookies';

export async function POST() {
  // Create the response object
  const response = NextResponse.json({ message: 'Logged out successfully' });

  // Clear the 'auth_token' cookie by setting its maxAge to 0
  setCookie('auth_token', '', '', { maxAge: 0 });  // Set maxAge to 0 to delete it

  return response;
}