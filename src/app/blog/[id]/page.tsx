import Link from 'next/link';
import { notFound } from 'next/navigation';

interface BlogPost {
  id: string;
  title: string;
  date: string;
  author: string;
  readTime: string;
  content: string;
  categories?: string[];
}

// Mock data for blog posts
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Evolution of AI-Powered Content Creation',
    date: '2024-03-20',
    author: 'Jason Yau',
    readTime: '4 min read',
    categories: ['AI', 'Technology'],
    content: `
In today's rapidly evolving digital landscape, artificial intelligence is fundamentally transforming how we approach content creation. From ideation to optimization, AI tools are becoming indispensable allies in the creative process.

## The Current State of AI Writing

AI has moved beyond simple grammar checking and spelling corrections. Modern AI systems can now:

- Generate creative content ideas
- Analyze audience engagement patterns
- Optimize content for specific platforms
- Provide real-time writing suggestions

## Key Benefits for Content Creators

### 1. Enhanced Efficiency
AI significantly reduces the time spent on research and initial drafts, allowing creators to focus on refining and personalizing content.

### 2. Data-Driven Insights
Content decisions are now backed by:
- Engagement metrics
- Audience preferences
- Performance analytics
- SEO optimization data

### 3. Consistent Quality
AI helps maintain consistent quality across all content by:
- Checking tone and style
- Ensuring readability
- Maintaining brand voice
- Flagging potential improvements

## The Future of AI Writing

As we look ahead, several trends are emerging:

1. More sophisticated language models
2. Better understanding of context
3. Improved personalization
4. Enhanced creative capabilities

## Finding the Right Balance

The key to successful AI-powered content creation lies in finding the perfect balance between artificial intelligence and human creativity. AI should enhance, not replace, the human element in writing.

Remember: The best content comes from combining AI's analytical capabilities with human creativity and emotional intelligence.`
  },
  {
    id: '2',
    title: 'Building a Modern Digital Writing Experience',
    date: '2024-03-21',
    author: 'Jason Yau',
    readTime: '3 min read',
    content: 'Content for the second blog post...'
  },
  {
    id: '3',
    title: 'Optimizing Your Blog for Search Engines',
    date: '2023-09-28',
    author: 'Jason Yau',
    readTime: '6 min read',
    content: 'Content for the third blog post...'
  }
];

// Format date as YY-MM-DD
function formatDate(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear().toString().slice(2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function BlogPost({ params }: { params: { id: string } }) {
  const postId = String(params.id);
  const post = blogPosts.find(p => p.id === postId);
  
  if (!post) {
    notFound();
  }
  
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-[2rem] mt-8 mb-4 font-sans leading-tight tracking-tight">{line.substring(2)}</h1>;
      } else if (line.startsWith('## ')) {
        return <h2 key={index} className="text-[1.75rem] mt-8 mb-3 font-sans leading-tight tracking-tight">{line.substring(3)}</h2>;
      } else if (line.startsWith('### ')) {
        return <h3 key={index} className="text-[1.5rem] mt-6 mb-2 font-sans leading-tight tracking-tight">{line.substring(4)}</h3>;
      } else if (line.startsWith('- ')) {
        return <li key={index} className="text-[1.125rem] font-serif text-[#666666] ml-6 list-disc mb-2 leading-relaxed">{line.substring(2)}</li>;
      } else if (line.startsWith('1. ')) {
        return <li key={index} className="text-[1.125rem] font-serif text-[#666666] ml-6 list-decimal mb-2 leading-relaxed">{line.substring(3)}</li>;
      } else if (line.trim() === '') {
        return null;
      } else {
        return <p key={index} className="text-[1.125rem] font-serif text-[#666666] mb-4 leading-relaxed">{line}</p>;
      }
    }).filter(Boolean);
  };
  
  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#1A1919] flex flex-col">
      <header className="fixed top-0 inset-x-0 bg-white/80 backdrop-blur-sm border-b border-[#E6E1D7] z-50">
        <div className="w-full max-w-screen-xl mx-auto px-6">
          <div className="max-w-[60rem] mx-auto h-16 flex items-center justify-between">
            <Link href="/" className="text-[1.375rem] font-['Times_New_Roman'] tracking-tight hover:text-[#666666] transition-colors">
              <span className="tracking-tight">jk</span>
              <span className="tracking-tighter">Y</span>
              <span className="tracking-tight">
                <span className="inline-block transform -rotate-12 mx-[0.5px]">a</span>u
              </span>
            </Link>
            <nav className="flex items-center gap-8">
              <Link href="/admin" className="text-[15px] font-sans text-[#666666] hover:text-[#1A1919] transition-colors">
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="flex-1 pt-24 pb-16">
        <div className="w-full max-w-screen-xl mx-auto px-6">
          <article className="max-w-[42rem] mx-auto">
            <div className="mb-16">
              <Link href="/" className="text-[15px] font-sans text-[#666666] hover:text-[#1A1919] transition-colors mb-8 inline-block">
                ← Back to posts
              </Link>
              
              {post.categories && post.categories.length > 0 && (
                <div className="flex gap-2 mb-8">
                  {post.categories.map((category, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 rounded-full border border-[#E6E1D7] text-[13px] font-sans text-[#666666]">
                      {category}
                    </span>
                  ))}
                </div>
              )}
              
              <header className="mb-16">
                <h1 className="text-[3.5rem] mb-6 font-sans tracking-tight leading-[1.1]">{post.title}</h1>
                <div className="flex items-center gap-3 text-[15px] font-sans text-[#666666]">
                  <time>{formatDate(post.date)}</time>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </header>
            </div>
            
            <div className="prose prose-lg max-w-none [&>h1:first-child]:mt-0 [&>h2:first-child]:mt-0 [&>h3:first-child]:mt-0">
              {renderContent(post.content)}
            </div>
          </article>
        </div>
      </main>
      
      <footer className="bg-white/80 backdrop-blur-sm border-t border-[#E6E1D7]">
        <div className="w-full max-w-screen-xl mx-auto px-6">
          <div className="max-w-[60rem] mx-auto h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-[1.375rem] font-['Times_New_Roman'] tracking-tight text-[#666666]">
                <span className="tracking-tight">jk</span>
                <span className="tracking-tighter">Y</span>
                <span className="tracking-tight">
                  <span className="inline-block transform -rotate-12 mx-[0.5px]">a</span>u
                </span>
              </div>
              <div className="text-[15px] font-sans text-[#666666]">© {new Date().getFullYear()}</div>
            </div>
            <nav className="flex items-center gap-6">
              <Link href="/rss" className="text-[15px] font-sans text-[#666666] hover:text-[#1A1919] transition-colors">
                RSS
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
} 