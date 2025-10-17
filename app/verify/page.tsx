'use client';

import { useState } from 'react';
import bcrypt from 'bcryptjs';

const Page = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [hashedInputPassword, setHashedInputPassword] = useState<string | null>(null);

  // Pre-generated hash for 'password123' (This hash is generated once and stored in your database)
  const predefinedHashedPassword = '$2b$10$eVKKZxVS0GVVcPMB6gi2l.SVTm6wbcdQh49EYoQTPdMFHcXFbAa5e'; 

  // Function to verify the password
  const verifyPassword = async () => {
    // Compare the input password with the predefined hash (this is the correct way)
    const isMatch = await bcrypt.compare(password, predefinedHashedPassword);

    if (isMatch) {
      setMessage('Password is correct!');
    } else {
      setMessage('Password is incorrect!');
    }

    // For debugging: Display the hashed input password (not for comparison, just for testing)
    const inputHash = await bcrypt.hash(password, 10);  // Hashing the input (this is for display only)
    setHashedInputPassword(inputHash);
  };

  return (
    <div>
      <h1>Password Verification</h1>

      {/* Input for user to enter password */}
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      {/* Button to trigger password verification */}
      <button onClick={verifyPassword}>Verify Password</button>

      {/* Display result message */}
      {message && <p>{message}</p>}

      {/* Display the hashed input password for testing purposes */}
      {hashedInputPassword && (
        <div>
          <h3>Hashed Input Password (for testing purposes):</h3>
          <p>{hashedInputPassword}</p>
        </div>
      )}

      {/* Display predefined hashed password (for comparison) */}
      <div>
        <h3>Predefined Hashed Password (for comparison):</h3>
        <p>{predefinedHashedPassword}</p>
      </div>
    </div>
  );
};

export default Page;