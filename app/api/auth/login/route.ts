import { NextResponse } from 'next/server';
import { generateToken } from '@/app/utils/auth';
import { sql } from '@vercel/postgres';
import { User } from '@/app/lib/definitions';
import { serialize } from 'cookie';
import bcrypt from 'bcrypt';


async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function POST(req: Request) {
  const { email, password }: { email: string; password: string } = await req.json();

  // Validate user credentials
  const user = await getUser(email);

  const isMatch = await bcrypt.compare(password, user!.password);
  
  if (user && isMatch) {
    const token = await generateToken(user);

    const cookie = serialize('token', token, {
      httpOnly: true, // Cookie is only accessible by the server
      secure: process.env.NODE_ENV !== 'development', // Send only on HTTPS
      sameSite: 'strict', // Protection against CSRF
      maxAge: 60 * 60 * 24, // 1 day expiration
      path: '/', // Cookie will be sent in all requests
    });

    return NextResponse.json({ message: 'Login successful' }, { status: 200, headers: { 'Set-Cookie': cookie } });
  } else {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
}
