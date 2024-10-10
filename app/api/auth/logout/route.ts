import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(req: Request) {
  // Clear the token cookie
  const cookie = serialize('token', '', {
    maxAge: -1, // Set cookie to expire immediately
    path: '/', // The cookie will be removed from the path
  });

  // Send response
  return NextResponse.json({ message: 'Logout successful' }, {
    status: 200,
    headers: {
      'Set-Cookie': cookie, // Clear the cookie in the response
    },
  });
}

