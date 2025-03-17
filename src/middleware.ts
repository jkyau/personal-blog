import { NextResponse, type NextRequest } from 'next/server';

// Constants
const PROTECTED_ROUTES = ['/admin'];
const PUBLIC_ROUTES = ['/login', '/auth'];
const SESSION_COOKIE_NAME = 'session';

// Logging utility
const log = {
  info: (message: string, data?: any) => {
    console.log(`ℹ️ [Middleware] ${message}`, data ? data : '');
  },
  error: (message: string, error?: any) => {
    console.error(`❌ [Middleware] ${message}`, error ? error : '');
  },
  success: (message: string, data?: any) => {
    console.log(`✅ [Middleware] ${message}`, data ? data : '');
  }
};

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Log all incoming requests
  log.info(`Request path: ${pathname}`);
  
  // Skip auth check for public routes
  if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
    log.info('Public route - skipping auth check');
    return NextResponse.next();
  }
  
  // Only check auth for protected routes
  if (!PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
    log.info('Non-protected route - skipping auth check');
    return NextResponse.next();
  }

  try {
    // Get session token from cookies
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    
    if (!token) {
      log.error('No session token found');
      return redirectToLogin(request);
    }

    // NOTE: We don't validate the session token in middleware
    // We'll let the page component handle that to avoid Prisma in Edge
    log.info('Session token found, continuing to protected route');
    return NextResponse.next();
  } catch (error) {
    log.error('Authentication error', error);
    return redirectToLogin(request);
  }
}

function redirectToLogin(request: NextRequest) {
  const url = new URL('/login', request.url);
  // Add the return URL as a parameter to redirect back after login
  url.searchParams.set('returnUrl', request.nextUrl.pathname);
  log.info(`Redirecting to login: ${url.toString()}`);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
}; 