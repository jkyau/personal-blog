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

// Get the new password from command line argument
const newPassword = process.argv[2]
if (!newPassword) {
  console.error('Please provide a new password as an argument')
  console.error('Usage: node scripts/reset-password.js YOUR_NEW_PASSWORD')
  process.exit(1)
}

async function main() {
  try {
    // List all users
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers()
    
    if (listError) {
      throw listError
    }

    const adminUser = users[0]
    if (!adminUser) {
      console.error('No users found')
      process.exit(1)
    }

    // Update the password
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      adminUser.id,
      { password: newPassword }
    )

    if (updateError) {
      throw updateError
    }

    console.log(`Password updated successfully for ${adminUser.email}`)
    console.log('You can now log in with your new password at http://localhost:3000/login')
    
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

main() 