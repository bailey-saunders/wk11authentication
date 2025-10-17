import { NextRequest } from 'next/server'; // Importing NextRequest for type safety

// Function to parse cookies from the request (server-side)
export const parseCookies = (req: NextRequest) => {
  const cookieHeader = req.headers.get('cookie');
  const cookies: { [key: string]: string } = {};

  if (cookieHeader) {
    const cookiePairs = cookieHeader.split(';');

    for (let pair of cookiePairs) {
      const [name, value] = pair.split('=').map((str) => str.trim());
      cookies[name] = value;
    }
  }

  return cookies;
};

// Function to set a cookie in the browser (client-side)
export const setCookie = (name: string, value: string, options = {}, p0: { maxAge: number; }) => {
  const cookieOptions = {
    httpOnly: true,  // This won't work in the browser, but added for consistency
    secure: process.env.NODE_ENV === 'production', // Secure cookies in production
    sameSite: 'strict' as const, // Make sure this is a valid sameSite option ('strict', 'lax', 'none')
    path: '/', // Cookie is accessible for all paths
    maxAge: 30, // Cookie expires in 30 seconds
    ...options,  // Allow overriding options
  };

  // Build cookie string
  let cookieString = `${name}=${value}; path=${cookieOptions.path}; max-age=${cookieOptions.maxAge}`;

  if (cookieOptions.secure) {
    cookieString += '; Secure';
  }

  if (cookieOptions.sameSite) {
    cookieString += `; SameSite=${cookieOptions.sameSite}`;
  }

  // Set cookie in the browser
  document.cookie = cookieString;
};

// Function to clear a cookie by name (client-side)
export const clearCookie = (name: string) => {
  // Setting max-age to 0 will immediately expire the cookie
  document.cookie = `${name}=; path=/; max-age=0;`;
};