'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // For redirection after logout
// Simple client-side cookie helpers (replaces missing '../lib/cookies' module)
const setCookie = (name: string, value: string, path = '/', options?: { maxAge?: number }) => {
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; Path=${path}`;
  if (options?.maxAge !== undefined) cookie += `; max-age=${options.maxAge}`;
  document.cookie = cookie;
};
const clearCookie = (name: string, path = '/') => {
  document.cookie = `${encodeURIComponent(name)}=; Path=${path}; max-age=0`;
};
import bcrypt from 'bcryptjs';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  // Predefined user object for testing
  const predefinedUser = {
    email: 'user@example.com',
    passwordHash: '$2b$10$eVKKZxVS0GVVcPMB6gi2l.SVTm6wbcdQh49EYoQTPdMFHcXFbAa5e' // Hashed password for 'tempPassword123'
  };

  // Function to verify the email and password
  const verifyPassword = async () => {
    if (email === predefinedUser.email) {
      const isMatch = await bcrypt.compare(password, predefinedUser.passwordHash);

      if (isMatch) {
        setMessage('Password is correct!');

        // Here you would typically create a JWT for the user
        // For demonstration, we are just setting a mock token in the cookie
        const mockJwtToken = 'your-mock-jwt-token-here';

        // Set a cookie with JWT that expires in 30 seconds
        setCookie('token', mockJwtToken, '', { maxAge: 30 });  // Set the token cookie with a 30-second expiration

        // Redirect to the dashboard or home page
        router.push('/dashboard'); // Adjust the redirect path as needed
      } else {
        setMessage('Password is incorrect!');
      }
    } else {
      setMessage('Email not found!');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1>Login</h1>

        {/* Input for user to enter email */}
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        {/* Input for user to enter password */}
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        {/* Button to trigger password verification */}
        <button onClick={verifyPassword} style={styles.button}>
          Login
        </button>

        {/* Display result message */}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

// Define styles at the bottom of the file
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f7f7f7',
  },
  box: {
    padding: '20px',
    border: '2px solid #ddd',
    borderRadius: '10px',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'center',
    width: '300px', // Define the box width for better consistency
  },
  input: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
    width: '100%', // Makes input fields span the width of the box
    marginBottom: '10px', // Space between inputs
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007BFF',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%', // Button takes the full width of the box
  },
};

export default Page;