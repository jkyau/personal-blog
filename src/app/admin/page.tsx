import Link from 'next/link';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getUserFromSession } from '@/lib/auth';

export default async function AdminPage() {
  // Check if user is authenticated
  const sessionToken = cookies().get('session')?.value;
  if (!sessionToken) {
    redirect('/login');
  }

  // Get user from session
  const user = await getUserFromSession(sessionToken);
  if (!user) {
    redirect('/login');
  }

  // Check if user is admin
  if (!user.isAdmin) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-white text-black font-mono">
      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-black/5 z-50">
        <div className="container mx-auto px-4 h-12 flex items-center justify-between">
          <Link href="/" className="text-sm tracking-tight">jkyau</Link>
          <nav className="flex items-center gap-6">
            <Link href="/archive" className="text-xs tracking-wide hover:opacity-50 transition-opacity">
              Archive
            </Link>
            <form action="/auth/sign-out" method="post">
              <button type="submit" className="text-xs tracking-wide hover:opacity-50 transition-opacity">
                Sign Out
              </button>
            </form>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-2xl mb-6">Admin Dashboard</h1>
          <p className="mb-4">Welcome, {user.email}</p>
          
          {/* Editor Section */}
          <div className="mb-12">
            <div className="flex items-baseline justify-between mb-6">
              <input
                type="text"
                placeholder="Title"
                className="text-2xl font-normal bg-transparent border-none outline-none w-full"
              />
              <button className="text-xs tracking-wide hover:opacity-50 transition-opacity">
                Publish
              </button>
            </div>
            <textarea
              placeholder="Write your post..."
              className="w-full h-[60vh] bg-transparent border-none outline-none resize-none text-base leading-relaxed"
            />
          </div>
        </div>
      </main>
    </div>
  );
} 