import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { cookies } from 'next/headers'

type CookieOption = {
  name: string
  value: string
  options?: {
    httpOnly?: boolean
    secure?: boolean
    sameSite?: 'lax' | 'strict' | 'none'
    path?: string
    maxAge?: number
    domain?: string
  }
}

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  
  console.log('Auth callback received:', { code: !!code })

  if (code) {
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet: CookieOption[]) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          },
        },
      }
    )

    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      if (error) {
        console.error('Error exchanging code for session:', error)
        return NextResponse.redirect(new URL('/login?error=auth', request.url))
      }
      
      console.log('Successfully exchanged code for session:', { user: !!data.user })
      
      // Create response with redirect
      const response = NextResponse.redirect(new URL('/admin', request.url))
      
      // Set the auth cookies in the response
      const authCookies = cookieStore.getAll()
      authCookies.forEach(cookie => {
        response.cookies.set(cookie.name, cookie.value, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/'
        })
      })
      
      return response
    } catch (err) {
      console.error('Exception during code exchange:', err)
      return NextResponse.redirect(new URL('/login?error=auth', request.url))
    }
  }

  // No code present, redirect to login
  return NextResponse.redirect(new URL('/login', request.url))
} 