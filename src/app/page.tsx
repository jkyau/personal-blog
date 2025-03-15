import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  date: string;
}

// Mock data for blog posts
const blogPosts: BlogPost[] = [
  { id: '1', title: 'Getting Started with AI-Powered Blogging', date: '2023-10-15' },
  { id: '2', title: 'The Future of Content Creation', date: '2023-10-10' },
  { id: '3', title: 'Optimizing Your Blog for Search Engines', date: '2023-09-28' },
  { id: '4', title: 'Building a Community Around Your Blog', date: '2023-09-15' },
  { id: '5', title: 'Leveraging AI for Content Ideas', date: '2023-08-22' },
  { id: '6', title: 'The Ethics of AI in Content Creation', date: '2023-08-10' },
];

// Format date as YY-MM-DD
function formatDate(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear().toString().slice(2); // Get last 2 digits of year
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function Home() {
  // Sort posts by date (newest first)
  const sortedPosts = [...blogPosts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  return (
    <div className="min-h-screen bg-white text-black font-mono">
      <header className="py-3 border-b border-gray-200">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-xl tracking-tight font-['Times_New_Roman']">
            j<span className="mx-[0.5px]">k</span><span className="inline-block mx-[1px]">Y</span><span className="inline-block transform -rotate-12 mx-[0.5px]">a</span><span className="mx-[0.5px]">u</span>
          </Link>
          <nav className="flex gap-4 text-sm tracking-wide">
            <Link href="/" className="font-medium">Archive</Link>
            <Link href="/admin" className="hover:underline">Admin</Link>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-xl ml-0">
          {sortedPosts.map((post) => (
            <div key={post.id} className="mb-4">
              <div className="text-sm">{formatDate(post.date)}</div>
              <Link 
                href={`/blog/${post.id}`} 
                className="text-base font-medium hover:underline block"
              >
                {post.title}
              </Link>
            </div>
          ))}
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