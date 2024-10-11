import { generateToken } from '../utils/auth';
import { SignJWT } from 'jose'; // Import SignJWT for mocking


interface MockedSignJWT {
  setProtectedHeader: jest.Mock;
  setIssuedAt: jest.Mock;
  setExpirationTime: jest.Mock;
  sign: jest.Mock;
}

let mockedInstance: MockedSignJWT; // Variable to hold the mocked instance

jest.mock('jose', () => {
  return {
    SignJWT: jest.fn().mockImplementation(() => {
      mockedInstance = {
        setProtectedHeader: jest.fn().mockReturnThis(),
        setIssuedAt: jest.fn().mockReturnThis(),
        setExpirationTime: jest.fn().mockReturnThis(),
        sign: jest.fn().mockResolvedValue('mocked.token'),
      };
      return mockedInstance; // Return the captured instance
    }),
  };
});


describe('generateToken', () => {
  beforeAll(() => {
    jest.clearAllMocks(); // Clear mock history before each test
  });

  const user = { id: '123', email: 'test@example.com' };

  it('should generate a token for a valid user', async () => {
    const token = await generateToken(user);
    expect(token).toBe('mocked.token'); // Ensure the token is as expected
    expect(SignJWT).toHaveBeenCalledWith(expect.objectContaining({ sub: user.id, email: user.email }));
  });

  it('should throw an error if JWT_SECRET is not defined', async () => {
    const originalJwtSecret = process.env.JWT_SECRET;
    process.env.JWT_SECRET = '';
    await expect(generateToken(user)).rejects.toThrow('JWT_SECRET is not defined');
    process.env.JWT_SECRET = originalJwtSecret;
  });

  it('should set token properties correctly', async () => {
    const token = await generateToken(user);
    
    expect(mockedInstance.setProtectedHeader).toHaveBeenCalledWith({ alg: 'HS256' });
    expect(mockedInstance.setIssuedAt).toHaveBeenCalled();
    expect(mockedInstance.setExpirationTime).toHaveBeenCalledWith('1h');
    expect(token).toBe('mocked.token')
  });
});
