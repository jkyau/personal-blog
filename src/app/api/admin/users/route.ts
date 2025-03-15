import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

// This route should be protected - only admins should be able to access it
export async function GET(request: Request) {
  // First, verify the user is authenticated and is an admin
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Here you would typically check if the user has admin privileges
  // For example, by checking a custom claim or a role in a database
  
  try {
    // Use the admin client to get all users - this requires the service role key
    const { data: users, error } = await supabaseAdmin.auth.admin.listUsers()
    
    if (error) {
      throw error
    }
    
    return NextResponse.json({ users: users.users })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
} 