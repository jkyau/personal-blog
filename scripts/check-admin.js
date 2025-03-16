require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function main() {
  try {
    // Get the user
    const { data: { users }, error: userError } = await supabase.auth.admin.listUsers()
    if (userError) throw userError

    const user = users[0]
    if (!user) {
      console.error('No users found')
      process.exit(1)
    }

    // Check user roles
    const { data: roles, error: roleError } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', user.id)

    if (roleError) throw roleError

    console.log('User:', {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
      last_sign_in_at: user.last_sign_in_at
    })
    console.log('Roles:', roles)

    // If no admin role found, let's create it
    if (!roles || roles.length === 0) {
      console.log('No admin role found, creating one...')
      const { error: insertError } = await supabase
        .from('user_roles')
        .insert({
          user_id: user.id,
          role: 'admin'
        })

      if (insertError) throw insertError
      console.log('Admin role created successfully!')
    }
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

main() 