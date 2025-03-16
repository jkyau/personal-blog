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
    <div className="min-h-screen bg-[#FAF9F7] text-[#1A1919] flex flex-col">
      <header className="fixed top-0 inset-x-0 bg-white/90 backdrop-blur-[6px] border-b border-[#E6E1D7]/80 z-50">
        <div className="w-full max-w-screen-xl mx-auto px-6">
          <div className="max-w-[60rem] mx-auto h-[4.5rem] flex items-center justify-between">
            <Link href="/" className="text-[1.5rem] font-['Times_New_Roman'] tracking-tight hover:text-[#666666] transition-colors duration-200">
              <span className="tracking-tight">jk</span>
              <span className="tracking-tighter relative top-[0.5px]">Y</span>
              <span className="tracking-tight">
                <span className="inline-block transform -rotate-12 origin-[25%_40%] translate-y-[0.5px] -translate-x-[1px] mx-[0.5px]">a</span>u
              </span>
            </Link>
            <nav className="flex items-center gap-8">
              <Link href="/admin" className="text-[15px] font-sans text-[#666666] hover:text-[#1A1919] transition-colors duration-200">
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-24 pb-16">
        <div className="w-full max-w-screen-xl mx-auto px-6">
          <section className="max-w-[42rem] mx-auto">
            {/* Hero Section */}
            <div className="mt-8 rounded-2xl bg-gradient-to-b from-[#E6E1D7]/80 to-[#E6E1D7]/40 backdrop-blur-[2px] p-12 mb-20">
              <h1 className="font-serif text-[3.25rem] tracking-tight leading-[1.1] text-[#1A1919] mb-4">
                Jason Yau
              </h1>
              <div className="space-y-6">
                <p className="font-serif text-[1.375rem] leading-snug text-[#1A1919]/90">
                  SVP and Architect, Office of the CEO @ Salesforce
                </p>
                <p className="font-serif text-[1.25rem] leading-snug text-[#1A1919]/80">
                  Three-time CTO. Proud husband and father of 2 boys.
                </p>
                <div className="flex items-center gap-6 pt-2">
                  <a href="https://linkedin.com" className="text-[#666666] hover:text-[#1A1919] transition-colors duration-200">
                    <span className="font-sans text-[15px] border-b border-[#66666640] hover:border-[#1A1919]">Linkedin</span>
                  </a>
                  <a href="https://instagram.com" className="text-[#666666] hover:text-[#1A1919] transition-colors duration-200">
                    <span className="font-sans text-[15px] border-b border-[#66666640] hover:border-[#1A1919]">Instagram</span>
                  </a>
                  <a href="https://twitter.com" className="text-[#666666] hover:text-[#1A1919] transition-colors duration-200">
                    <span className="font-sans text-[15px] border-b border-[#66666640] hover:border-[#1A1919]">X</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Latest Posts Section */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-sans text-[1.5rem] text-[#1A1919] tracking-tight">Latest Posts</h2>
                <a href="/blog" className="font-sans text-[15px] text-[#666666] hover:text-[#1A1919] transition-colors duration-200">
                  View all
                </a>
              </div>
              
              <div className="space-y-10">
                {posts.map((post) => (
                  <article key={post.id} className="group">
                    <Link href={`/blog/${post.id}`} className="block">
                      <time className="block font-sans text-[15px] text-[#666666] mb-2">
                        {formatDistanceToNow(post.date, { addSuffix: true })}
                      </time>
                      <h3 className="font-serif text-[1.75rem] text-[#1A1919] leading-snug mb-3 group-hover:text-[#1A1919]/80 transition-colors duration-200">
                        {post.title}
                      </h3>
                      <p className="font-serif text-[1.125rem] text-[#666666] leading-relaxed">
                        {post.excerpt}
                      </p>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-white/90 backdrop-blur-[6px] border-t border-[#E6E1D7]/80">
        <div className="w-full max-w-screen-xl mx-auto px-6">
          <div className="max-w-[60rem] mx-auto h-[4.5rem] flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="text-[1.5rem] font-['Times_New_Roman'] tracking-tight text-[#666666]">
                <span className="tracking-tight">jk</span>
                <span className="tracking-tighter relative top-[0.5px]">Y</span>
                <span className="tracking-tight">
                  <span className="inline-block transform -rotate-12 origin-[25%_40%] translate-y-[0.5px] -translate-x-[1px] mx-[0.5px]">a</span>u
                </span>
              </div>
              <div className="text-[15px] font-sans text-[#666666] tracking-tight">© {new Date().getFullYear()}</div>
            </div>
            <nav className="flex items-center gap-6">
              <Link href="/rss" className="text-[15px] font-sans text-[#666666] hover:text-[#1A1919] transition-colors duration-200">
                RSS
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
} 