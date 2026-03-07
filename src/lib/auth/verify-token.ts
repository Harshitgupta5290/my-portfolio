import { NextRequest } from 'next/server';

interface AuthResult {
  authenticated: boolean;
  userId?: string;
  error?: string;
}

/**
 * Verify admin authentication token from request headers
 */
export async function verifyAdminAuth(request: NextRequest): Promise<AuthResult> {
  try {
    // Check for auth header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { authenticated: false, error: 'Missing authorization header' };
    }

    const token = authHeader.substring(7);

    // Simple token verification (in production, use proper JWT)
    const adminPassword = process.env.NEXTAUTH_ADMIN_PASSWORD;
    const tokenHash = Buffer.from(`admin:${adminPassword}`).toString('base64');

    if (token === tokenHash) {
      return { authenticated: true, userId: 'admin' };
    }

    // Check for session cookie (when using NextAuth)
    const sessionCookie = request.cookies.get('next-auth.session-token');
    if (sessionCookie?.value) {
      // In production, validate JWT properly
      return { authenticated: true, userId: 'admin' };
    }

    return { authenticated: false, error: 'Invalid token' };
  } catch (error) {
    return { authenticated: false, error: 'Authentication error' };
  }
}

/**
 * Verify API key (for third-party integrations)
 */
export async function verifyApiKey(apiKey: string): Promise<boolean> {
  if (!apiKey || typeof apiKey !== 'string') {
    return false;
  }

  // In production, store API keys in database and verify against hash
  const validApiKeys = (process.env.VALID_API_KEYS || '').split(',').filter(Boolean);
  return validApiKeys.includes(apiKey);
}

/**
 * Generate a simple auth token (for development)
 * In production, use proper JWT library
 */
export function generateAuthToken(username: string, password: string): string {
  return Buffer.from(`${username}:${password}`).toString('base64');
}

/**
 * Hash password (simple for demo, use bcrypt in production)
 */
export function hashPassword(password: string): string {
  return Buffer.from(password).toString('base64');
}
