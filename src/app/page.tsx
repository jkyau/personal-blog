import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

// Sample blog posts
const posts = [
  {
    id: 1,
    title: 'Getting Started with AI-First Blogging',
    excerpt: 'Exploring the intersection of artificial intelligence and content creation.',
    date: new Date('2024-03-20'),
  },
  {
    id: 2,
    title: 'The Future of Content Creation',
    excerpt: 'How AI is reshaping the way we think about and create content.',
    date: new Date('2024-03-21'),
  },
];

export default function Home() {
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
            <Link href="/login" className="text-xs tracking-wide hover:opacity-50 transition-opacity">
              Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Posts */}
          <div className="space-y-16">
            {posts.map((post) => (
              <article key={post.id} className="group">
                <Link href={`/blog/${post.id}`}>
                  <div className="mb-2">
                    <time className="text-xs opacity-50">
                      {formatDistanceToNow(post.date, { addSuffix: true })}
                    </time>
                  </div>
                  <h2 className="text-lg mb-2 group-hover:opacity-50 transition-opacity">
                    {post.title}
                  </h2>
                  <p className="text-sm opacity-70 leading-relaxed">
                    {post.excerpt}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 