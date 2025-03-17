import { NextResponse } from 'next/server';
import { getSessionToken, getUserFromSession } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const token = getSessionToken(request as any);
    const user = await getUserFromSession(token);

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error getting user:', error);
    return NextResponse.json(
      { error: 'An error occurred while getting user information' },
      { status: 500 }
    );
  }
} 