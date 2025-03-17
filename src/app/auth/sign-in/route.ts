import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, createSession, setSessionCookie } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const origin = request.headers.get('origin') || request.url;
    const returnUrl = formData.get('returnUrl') as string || '/admin';

    // Log attempt
    console.log(`📝 Login attempt for: ${email}`);

    if (!email || !password) {
      console.error('❌ Login error: Missing email or password');
      return redirectToLogin('Please provide both email and password', origin);
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.error('❌ Login error: User not found');
      return redirectToLogin('Invalid login credentials', origin);
    }

    // Verify password
    const isValidPassword = verifyPassword(password, user.password);
    if (!isValidPassword) {
      console.error('❌ Login error: Invalid password');
      return redirectToLogin('Invalid login credentials', origin);
    }

    // Create session
    const token = await createSession(user.id);
    console.log('✅ Login successful:', { userId: user.id });

    // Create response with redirect
    const redirectUrl = new URL(returnUrl, origin);
    const response = NextResponse.redirect(redirectUrl, {
      status: 303,
    });

    // Set session cookie
    setSessionCookie(response, token);
    console.log('🔑 Session cookie set');

    return response;
  } catch (error) {
    console.error('🔥 Unexpected error during login:', error);
    return redirectToLogin('An unexpected error occurred', request.url);
  }
}

function redirectToLogin(error: string, origin: string) {
  const url = new URL('/login', origin);
  url.searchParams.set('error', error);
  return NextResponse.redirect(url, { status: 303 });
} 