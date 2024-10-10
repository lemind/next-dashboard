'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; // For client-side cookie handling

const Logout: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Clear the JWT from the cookie using js-cookie
    Cookies.remove('token'); // Remove the token cookie on the client side

    // Redirect to the login page
    router.push('/login'); // Redirect to the login page
  }, [router]);

  return null; // No UI needed for the logout page
};

export default Logout;


