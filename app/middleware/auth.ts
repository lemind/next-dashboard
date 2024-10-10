import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { verifyToken } from '@/app/utils/auth';

export async function authMiddleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value; // Get the token value from cookies

  if (!token) {
    // If no token, redirect to login page
    console.log('No token found, redirecting to login');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const payload = await verifyToken(token);
    console.log('Token verified successfully:', payload);
    return NextResponse.next(); // Proceed to the requested route
  } catch (error) {
    console.error('Token verification failed:', error);
    // If token is invalid, redirect to login page
    return NextResponse.redirect(new URL('/login', req.url));
  }
}
