import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const formData = await request.formData()
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const origin = request.headers.get('origin') || request.url
  const cookieStore = cookies()

  console.log('📝 Sign-in attempt for email:', email)

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        },
      },
    }
  )

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('❌ Sign-in error:', error.message)
    const url = new URL('/login', origin)
    url.searchParams.set('error', error.message)
    return NextResponse.redirect(url, {
      status: 303,
    })
  }

  console.log('✅ User authenticated successfully:', { userId: data.user.id })
  
  // Create the response with the redirect
  const response = NextResponse.redirect(new URL('/admin', origin), {
    status: 303,
  })

  // Get the cookies from the store and set them in the response
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
} 