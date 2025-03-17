import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { deleteSession } from '@/lib/auth';

export async function POST() {
  try {
    // Get session token
    const sessionToken = cookies().get('session')?.value;
    
    // Delete session if token exists
    if (sessionToken) {
      await deleteSession(sessionToken);
      console.log('✅ Session deleted successfully');
    }
    
    // Create response with redirect
    const response = NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'), {
      status: 303,
    });
    
    // Clear session cookie
    response.cookies.delete('session');
    console.log('🔑 Session cookie cleared');
    
    return response;
  } catch (error) {
    console.error('❌ Error during sign out:', error);
    
    // Redirect to home page even if there's an error
    const response = NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'), {
      status: 303,
    });
    
    // Clear session cookie anyway
    response.cookies.delete('session');
    
    return response;
  }
} 