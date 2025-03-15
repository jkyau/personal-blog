import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

// Create a new PrismaClient instance for this test
// This is to ensure we're testing the actual connection
const prisma = new PrismaClient()

export async function GET() {
  try {
    // Try to query the database with a raw query
    // This should work even if we haven't created any tables yet
    const result = await prisma.$queryRaw`SELECT current_timestamp as server_time`
    
    return NextResponse.json({
      success: true,
      message: 'Connected to database successfully',
      result,
      databaseUrl: process.env.DATABASE_URL?.replace(/:[^:]*@/, ':****@') // Hide password in response
    })
  } catch (error: any) {
    console.error('Database connection error:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Failed to connect to database',
      error: error.message,
      databaseUrl: process.env.DATABASE_URL?.replace(/:[^:]*@/, ':****@') // Hide password in response
    }, { status: 500 })
  } finally {
    // Disconnect after test
    await prisma.$disconnect()
  }
} 