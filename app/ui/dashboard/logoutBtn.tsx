// components/LogoutButton.tsx
'use client'; // Mark this as a client component

import { useRouter } from 'next/navigation'; // Ensure you import the router correctly
import { PowerIcon } from '@heroicons/react/24/outline';

export default function LogoutButton() {
  const router = useRouter(); // Access the router

  const handleLogout = async () => {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include', // Include cookies in the request
    });

    if (response.ok) {
      console.log('Logout successful');
      // Redirect to login page after successful logout
      router.push('/login');
    } else {
      console.error('Logout failed');
      // Handle errors if needed
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
    >
      <PowerIcon className="w-6" />
      <div className="hidden md:block">Sign Out</div>
    </button>
  );
}
