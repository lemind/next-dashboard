import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from '@/app/middleware/auth'; // Assuming this is the file where authMiddleware is implemented

export function middleware(req: NextRequest) {
  return authMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|login|register).*)', '/dashboard/:path*'],
};
