import { PrismaClient } from '@prisma/client';
import { randomBytes, scryptSync } from 'crypto';

const prisma = new PrismaClient();

// Password hashing function
async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

async function createAdmin() {
  const email = 'jason@jkyau.com';
  const password = 'admin123';

  try {
    // Delete existing user if exists
    await prisma.user.deleteMany({
      where: { email }
    });

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

createAdmin(); 