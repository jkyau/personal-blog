import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Define protected routes that require authentication
const protectedRoutes = ['/dashboard', '/settings', '/profile', '/admin']

export async function middleware(request: NextRequest) {
  console.log('🔍 Middleware executing for path:', request.nextUrl.pathname)

  let response = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()
  
  console.log('👤 Current user state:', user ? 'Authenticated' : 'Not authenticated')

  // If user is not logged in and trying to access a protected route
  if (!user && request.nextUrl.pathname.startsWith('/admin')) {
    console.log('🚫 Unauthorized access attempt to admin - redirecting to login')
    const redirectUrl = new URL('/login', request.url)
    const redirectResponse = NextResponse.redirect(redirectUrl)
    
    // Copy all cookies from the response to the redirect
    response.cookies.getAll().forEach(cookie => {
      redirectResponse.cookies.set(cookie.name, cookie.value, {
        path: cookie.path,
        domain: cookie.domain,
        maxAge: cookie.maxAge,
        secure: cookie.secure,
        httpOnly: cookie.httpOnly,
        sameSite: cookie.sameSite,
      })
    })
    
    return redirectResponse
  }

  // If user is logged in and trying to access login page
  if (user && request.nextUrl.pathname.startsWith('/login')) {
    console.log('✅ Authenticated user at login - redirecting to admin')
    const redirectUrl = new URL('/admin', request.url)
    const redirectResponse = NextResponse.redirect(redirectUrl)
    
    // Copy all cookies from the response to the redirect
    response.cookies.getAll().forEach(cookie => {
      redirectResponse.cookies.set(cookie.name, cookie.value, {
        path: cookie.path,
        domain: cookie.domain,
        maxAge: cookie.maxAge,
        secure: cookie.secure,
        httpOnly: cookie.httpOnly,
        sameSite: cookie.sameSite,
      })
    })
    
    return redirectResponse
  }

  console.log('✨ Middleware complete - continuing with request')
  return response
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
} 