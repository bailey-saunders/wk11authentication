// app/api/check-session/route.tsx

import { NextRequest } from 'next/server'; // Import NextRequest
import { parseCookies } from '../../../lib/cookies'; // Import the parseCookies function
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest) {  // Use NextRequest here
  const cookies = parseCookies(req); // Parse cookies from the request

  // Check if the 'token' cookie exists
  const token = cookies['token'];

  if (token) {
    // The user is logged in, you can add additional checks if needed (e.g. verifying the token)
    return NextResponse.json({ message: 'Session is valid' });
  } else {
    // The user is not logged in
    return NextResponse.json({ message: 'Session is not valid' }, { status: 401 });
  }
}