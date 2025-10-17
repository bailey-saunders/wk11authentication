// lib/auth.tsx
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Function to sign a JWT token
export const signToken = (user: { id: number, email: string }) => {
  return jwt.sign(
    { sub: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Function to verify a JWT token
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};