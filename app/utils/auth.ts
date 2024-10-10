import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET!

// Generate a JWT token
export const generateToken = async (user: { id: string; email: string }): Promise<string> => {
  const payload = {
    sub: user.id,
    email: user.email,
  };

  const secret = JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  // Create a new JWT and sign it
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' }) // Set the algorithm used to sign the token
    .setIssuedAt() // Set issued at
    .setExpirationTime('1h') // Token expiration time
    .sign(new TextEncoder().encode(secret)); // Sign with secret

  return token; // Return the generated token
};

// Verify a JWT token
export const verifyToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
    return payload; // Return the decoded payload
  } catch (error) {
    throw new Error('Invalid token');
  }
};
