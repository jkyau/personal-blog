const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

// Password hashing function
function hashPassword(password) {
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
    const hashedPassword = hashPassword(password);
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

createAdmin(); 