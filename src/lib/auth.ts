import { prisma } from './prisma';
import { NextRequest, NextResponse } from 'next/server';
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

// Types
export type AuthUser = {
  id: string;
  email: string;
  isAdmin: boolean;
};

// Constants
const SESSION_COOKIE_NAME = 'session';
const SESSION_EXPIRY_DAYS = 30;

// Logging utility
const log = {
  info: (message: string, data?: any) => {
    console.log(`ℹ️ [Auth] ${message}`, data ? data : '');
  },
  error: (message: string, error?: any) => {
    console.error(`❌ [Auth] ${message}`, error ? error : '');
  },
  success: (message: string, data?: any) => {
    console.log(`✅ [Auth] ${message}`, data ? data : '');
  }
};

// Password utilities
export function hashPassword(password: string): string {
  try {
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(password, salt, 64).toString('hex');
    const hashedPassword = `${salt}:${hash}`;
    log.success('Password hashed successfully');
    return hashedPassword;
  } catch (error) {
    log.error('Failed to hash password', error);
    throw new Error('Password hashing failed');
  }
}

export function verifyPassword(password: string, hashedPassword: string): boolean {
  try {
    const [salt, storedHash] = hashedPassword.split(':');
    const hash = scryptSync(password, salt, 64);
    const suppliedHash = Buffer.from(storedHash, 'hex');
    const isValid = timingSafeEqual(hash, suppliedHash);
    log.info(`Password verification ${isValid ? 'successful' : 'failed'}`);
    return isValid;
  } catch (error) {
    log.error('Password verification error', error);
    return false;
  }
}

// Session management
function generateSessionToken(): string {
  return randomBytes(32).toString('hex');
}

export async function createSession(userId: string): Promise<string> {
  try {
    const token = generateSessionToken();
    const expiresAt = new Date(Date.now() + SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000);

    await prisma.session.create({
      data: { userId, token, expiresAt }
    });

    log.success('Session created', { userId, expiresAt });
    return token;
  } catch (error) {
    log.error('Failed to create session', error);
    throw new Error('Session creation failed');
  }
}

export async function getUserFromSession(token: string | undefined): Promise<AuthUser | null> {
  if (!token) {
    log.info('No session token provided');
    return null;
  }

  try {
    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true }
    });

    if (!session) {
      log.info('Session not found');
      return null;
    }

    if (session.expiresAt < new Date()) {
      log.info('Session expired', { sessionId: session.id });
      await prisma.session.delete({ where: { id: session.id } });
      return null;
    }

    if (!session.user) {
      log.error('User not found for session', { sessionId: session.id });
      return null;
    }

    log.success('User retrieved from session', { userId: session.user.id });
    return {
      id: session.user.id,
      email: session.user.email,
      isAdmin: session.user.isAdmin
    };
  } catch (error) {
    log.error('Error retrieving user from session', error);
    return null;
  }
}

// Cookie management
export function setSessionCookie(response: NextResponse, token: string): void {
  try {
    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_EXPIRY_DAYS * 24 * 60 * 60
    });
    log.success('Session cookie set');
  } catch (error) {
    log.error('Failed to set session cookie', error);
    throw new Error('Failed to set session cookie');
  }
}

export function getSessionToken(request: NextRequest): string | undefined {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  log.info('Session token retrieved', { exists: !!token });
  return token;
}

export async function deleteSession(token: string): Promise<void> {
  try {
    await prisma.session.delete({ where: { token } });
    log.success('Session deleted');
  } catch (error) {
    log.error('Failed to delete session', error);
    throw new Error('Failed to delete session');
  }
}

// Maintenance
export async function cleanupExpiredSessions(): Promise<void> {
  try {
    const { count } = await prisma.session.deleteMany({
      where: { expiresAt: { lt: new Date() } }
    });
    log.success(`Cleaned up ${count} expired sessions`);
  } catch (error) {
    log.error('Failed to cleanup expired sessions', error);
  }
} 