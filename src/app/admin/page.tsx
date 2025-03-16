import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { formatDistanceToNow } from 'date-fns';

// Sample data for the recent posts table
const recentPosts = [
  {
    id: 1,
    title: 'Getting Started with AI-First Blogging',
    status: 'published',
    lastEdited: new Date('2024-03-20'),
  },
  {
    id: 2,
    title: 'Draft: The Future of Content Creation',
    status: 'draft',
    lastEdited: new Date('2024-03-21'),
  },
];

// Helper function to format dates
const formatDate = (date: Date) => {
  return formatDistanceToNow(date, { addSuffix: true });
};

export default async function AdminPage() {
  const supabase = await createClient();

  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
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

          {/* AI Assistant */}
          <div className="fixed bottom-0 right-0 p-4 w-80">
            <div className="bg-black text-white p-4 rounded-lg shadow-lg">
              <div className="text-xs mb-2 opacity-70">AI Assistant</div>
              <div className="h-32 overflow-y-auto text-sm mb-2">
                {/* Chat messages would go here */}
              </div>
              <input
                type="text"
                placeholder="Ask me anything..."
                className="w-full bg-white/10 text-white text-sm p-2 rounded border-none outline-none"
              />
            </div>
          </div>

          {/* Recent Posts */}
          <div>
            <h2 className="text-xs tracking-wide mb-4">Recent Posts</h2>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between py-2 border-t border-black/5">
                  <div>
                    <h3 className="text-sm mb-1">{post.title}</h3>
                    <div className="text-xs opacity-50">
                      {formatDate(post.lastEdited)} • {post.status}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="text-xs tracking-wide hover:opacity-50 transition-opacity">
                      Edit
                    </button>
                    <button className="text-xs tracking-wide text-red-500 hover:opacity-50 transition-opacity">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <Link href="/" className="text-xs tracking-wide hover:opacity-50 transition-opacity">
              Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 