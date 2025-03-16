require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials')
  process.exit(1)
}

const email = process.argv[2]
const password = process.argv[3]

if (!email || !password) {
  console.error('Please provide email and password')
  console.error('Usage: node scripts/create-admin.js YOUR_EMAIL YOUR_PASSWORD')
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
    // Create user
    const { data: { user }, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    })

    if (createError) throw createError

    // Create admin role
    const { error: roleError } = await supabase
      .from('user_roles')
      .insert({
        user_id: user.id,
        role: 'admin'
      })

    if (roleError) throw roleError

    console.log('Admin user created successfully!')
    console.log('Email:', email)
    console.log('You can now log in at http://localhost:3001/login')
    
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

main() 