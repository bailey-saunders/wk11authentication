// app/api/login/route.tsx
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { setCookie } from '../../../lib/cookies'; // Assuming this function is correctly set up

// Pre-generated hash for 'password123'
const predefinedHashedPassword = '$2b$10$6bizgPJXCL6t.4bV7SnwkeKSInXN/qDcr3dFC9mBReBNEkhstGNlC';

export async function POST(req: NextRequest) {
  // Parse the incoming request body
  const { email, password } = await req.json();

  // Validate the credentials (this is a simplified example)
  const isMatch = await bcrypt.compare(password, predefinedHashedPassword);

  if (isMatch) {
    // Create a mock JWT or use actual JWT logic
    const mockJwtToken = 'your-mock-jwt-token-here';

    // Set the cookie with the token (expires in 30 seconds for example)
    setCookie('token', mockJwtToken, '', { maxAge: 30 }); // Set the cookie with the token

    // Return success response
    return NextResponse.json({ message: 'Login successful!' });
  } else {
    // Return failure response if the credentials are wrong
    return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
  }
}