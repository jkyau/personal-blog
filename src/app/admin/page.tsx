import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

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
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export default async function AdminPage() {
  const supabase = await createClient();

  // Check if user is authenticated and has admin role
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  // Verify admin role
  const { data: userRole } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .single();

  if (!userRole || userRole.role !== 'admin') {
    redirect('/unauthorized');
  }

  return (
    <div className="min-h-screen bg-white text-black font-mono">
      <header className="py-3 border-b border-gray-200">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-xl tracking-tight font-['Times_New_Roman']">
            j<span className="mx-[0.5px]">k</span><span className="inline-block mx-[1px]">Y</span><span className="inline-block transform -rotate-12 mx-[0.5px]">a</span><span className="mx-[0.5px]">u</span>
          </Link>
          <nav className="flex gap-4 text-sm tracking-wide">
            <Link href="/" className="hover:underline">Archive</Link>
            <Link href="/admin" className="hover:underline">Admin</Link>
            <form action="/auth/sign-out" method="post">
              <button type="submit" className="hover:underline">
                Sign Out
              </button>
            </form>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-4">
          {/* AI Assistant */}
          <div className="col-span-4 border border-gray-200 rounded-sm p-3">
            <h2 className="text-sm mb-2">AI Assistant</h2>
            <div className="h-48 bg-gray-50 rounded-sm mb-2 p-2 text-xs">
              {/* Chat messages would go here */}
            </div>
            <input
              type="text"
              placeholder="Ask me anything..."
              className="w-full text-xs p-1 border border-gray-200 rounded-sm"
            />
          </div>
          
          {/* Content Editor */}
          <div className="col-span-8 border border-gray-200 rounded-sm p-3">
            <h2 className="text-sm mb-2">Content Editor</h2>
            <input
              type="text"
              placeholder="Title"
              className="w-full text-xs p-1 mb-2 border border-gray-200 rounded-sm"
            />
            <textarea
              placeholder="Write your post..."
              className="w-full h-48 text-xs p-1 border border-gray-200 rounded-sm resize-none"
            />
          </div>
        </div>
        
        {/* Recent Posts */}
        <div className="mt-4">
          <h2 className="text-sm mb-2">Recent Posts</h2>
          <div className="border border-gray-200 rounded-sm">
            <table className="w-full text-xs">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-2 font-normal">Title</th>
                  <th className="text-left p-2 font-normal">Status</th>
                  <th className="text-left p-2 font-normal">Last Edited</th>
                  <th className="text-left p-2 font-normal">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentPosts.map((post) => (
                  <tr key={post.id} className="border-t border-gray-200">
                    <td className="p-2">{post.title}</td>
                    <td className="p-2">
                      <span className={`inline-block px-1 rounded-sm ${
                        post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="p-2">{formatDate(post.lastEdited)}</td>
                    <td className="p-2">
                      <button className="text-blue-600 hover:underline mr-2">Edit</button>
                      <button className="text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      
      <footer className="border-t border-gray-200 py-3">
        <div className="container mx-auto px-4">
          <div className="text-lg mb-1 font-['Times_New_Roman']">
            j<span className="mx-[0.5px]">k</span><span className="inline-block mx-[1px]">Y</span><span className="inline-block transform -rotate-12 mx-[0.5px]">a</span><span className="mx-[0.5px]">u</span>
          </div>
          <p className="text-xs text-gray-500">© {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
} 