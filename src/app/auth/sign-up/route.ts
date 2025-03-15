import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const formData = await request.formData()
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${request.headers.get('origin')}/auth/callback`,
    },
  })

  if (error) {
    return NextResponse.redirect(
      `${request.headers.get('origin')}/signup?error=${encodeURIComponent(error.message)}`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    )
  }

  return NextResponse.redirect(
    `${request.headers.get('origin')}/login?message=Check your email to confirm your account`,
    {
      status: 301,
    }
  )
} 