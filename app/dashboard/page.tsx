'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // For redirection after logout
import { clearCookie } from '../lib/cookies'; // Import clearCookie

const DashboardPage = () => {
  const [message, setMessage] = useState('');
  const router = useRouter();

  // Function to check the cookie expiration and log the user out if expired
  const checkExpiration = () => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    const expiration = document.cookie.split('; ').find(row => row.startsWith('expiration='));

    if (!token || !expiration) {
      // If no token or expiration time, logout immediately
      handleLogout();
    } else {
      const expirationTime = Number(expiration.split('=')[1]);

      // Check if the expiration time has passed (30 seconds from when set)
      if (Date.now() > expirationTime) {
        handleLogout(); // Log out if expired
      }
    }
  };

  const handleLogout = () => {
    // Clear the 'token' and 'expiration' cookies
    clearCookie('token');
    clearCookie('expiration');

    // Redirect to the home page after logout
    router.push('/'); // Adjust the redirect path to home page
  };

  useEffect(() => {
    // Set expiration time when the page loads (set to 30 seconds)
    const expirationTime = Date.now() + 30 * 1000; // 30 seconds from now
    document.cookie = `expiration=${expirationTime}; path=/; max-age=30`; // Set expiration cookie for 30 seconds

    // Check the expiration immediately when the page loads
    checkExpiration();

    // Set an interval to check the expiration every 5 seconds
    const interval = setInterval(() => {
      checkExpiration(); // Check the expiration status every 5 seconds
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);

  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1>Dashboard</h1>

        {/* Display result message */}
        {message && <p>{message}</p>}

        {/* Logout button */}
        <button onClick={handleLogout} style={styles.button}>
          Logout
        </button>
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

export default DashboardPage;