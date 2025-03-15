import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    
    // Create a new user
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true // Auto-confirm the email
    })
    
    if (userError) {
      throw userError
    }
    
    // Assign admin role in a custom table
    const { error: roleError } = await supabaseAdmin
      .from('user_roles')
      .insert({
        user_id: userData.user.id,
        role: 'admin'
      })
    
    if (roleError) {
      throw roleError
    }
    
    return NextResponse.json({ 
      message: 'Admin user created successfully',
      userId: userData.user.id
    })
  } catch (error) {
    console.error('Error creating admin user:', error)
    return NextResponse.json(
      { error: 'Failed to create admin user' },
      { status: 500 }
    )
  }
} 