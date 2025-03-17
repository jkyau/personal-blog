require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

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

const prisma = new PrismaClient();

// Password hashing function
async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

async function createAdmin() {
  const email = 'jason@jkyau.com';
  const password = 'admin123';

  try {
    console.log(`Creating admin user with email: ${email}`);
    
    // Delete existing user if exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      console.log(`Deleting existing user with email: ${email}`);
      await prisma.user.delete({
        where: { id: existingUser.id }
      });
    }

    // Create new admin user
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        isAdmin: true
      }
    });

    console.log('✅ Admin user created successfully:', {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin
    });

    console.log('\nLogin credentials:');
    console.log('Email:', email);
    console.log('Password:', password);
  } catch (error) {
    console.error('❌ Failed to create admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

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
    
    await createAdmin();
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

main() 