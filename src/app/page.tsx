import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

// Sample blog posts
const posts = [
  {
    id: 1,
    title: 'The Evolution of AI-Powered Content Creation',
    excerpt: 'Exploring how artificial intelligence is transforming the landscape of content creation, from ideation to optimization.',
    date: new Date('2024-03-20'),
  },
  {
    id: 2,
    title: 'Building a Modern Digital Writing Experience',
    excerpt: 'A deep dive into creating intuitive, minimalist interfaces that enhance the writing process.',
    date: new Date('2024-03-21'),
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black font-['Times_New_Roman'] flex flex-col">
      <header className="fixed top-0 inset-x-0 bg-white border-b border-black/5 z-50">
        <div className="max-w-3xl mx-auto h-10 flex items-center justify-between">
          <Link href="/" className="text-lg tracking-wider">
            <span className="tracking-tight">jk</span>
            <span className="tracking-tighter">Y</span>
            <span className="tracking-tight">
              <span className="inline-block transform -rotate-12 mx-[0.5px]">a</span>u
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/archive" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Archive
            </Link>
            <Link href="/admin" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Admin
            </Link>
          </nav>
        </div>
      </header>

      <main className="pt-16 px-4 pb-16 flex-1">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.id} className="group">
                <Link href={`/blog/${post.id}`} className="block">
                  <time className="text-sm text-gray-600 mb-1 block">
                    {formatDistanceToNow(post.date, { addSuffix: true })}
                  </time>
                  <h2 className="text-xl font-medium mb-1.5 group-hover:text-gray-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-base text-gray-800 leading-snug">
                    {post.excerpt}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-black/5">
        <div className="max-w-3xl mx-auto h-10 flex items-center">
          <div className="text-lg tracking-wider">
            <span className="tracking-tight">jk</span>
            <span className="tracking-tighter">Y</span>
            <span className="tracking-tight">
              <span className="inline-block transform -rotate-12 mx-[0.5px]">a</span>u
            </span>
          </div>
          <div className="text-sm text-gray-600 ml-2">© {new Date().getFullYear()}</div>
        </div>
      </footer>
    </div>
  );
} 