import Link from 'next/link';
import { notFound } from 'next/navigation';

interface BlogPost {
  id: string;
  title: string;
  date: string;
  author: string;
  readTime: string;
  content: string;
}

// Mock data for blog posts
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Evolution of AI-Powered Content Creation',
    date: '2024-03-20',
    author: 'Jason Yau',
    readTime: '4 min read',
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
        return <h1 key={index} className="text-xl font-semibold mt-3 mb-1.5 leading-snug">{line.substring(2)}</h1>;
      } else if (line.startsWith('## ')) {
        return <h2 key={index} className="text-lg font-medium mt-3 mb-1.5 leading-snug">{line.substring(3)}</h2>;
      } else if (line.startsWith('### ')) {
        return <h3 key={index} className="text-base font-medium mt-2 mb-1 leading-snug">{line.substring(4)}</h3>;
      } else if (line.startsWith('- ')) {
        return <li key={index} className="text-base text-gray-800 ml-4 list-disc mb-0.5 leading-snug">{line.substring(2)}</li>;
      } else if (line.startsWith('1. ')) {
        return <li key={index} className="text-base text-gray-800 ml-4 list-decimal mb-0.5 leading-snug">{line.substring(3)}</li>;
      } else if (line.trim() === '') {
        return <div key={index} className="h-1.5"></div>;
      } else {
        return <p key={index} className="text-base text-gray-800 mb-1.5 leading-snug">{line}</p>;
      }
    });
  };
  
  return (
    <div className="min-h-screen bg-white text-black font-['Times_New_Roman']">
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
      
      <main className="pt-16 px-4 pb-16">
        <article className="max-w-3xl mx-auto">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors mb-3 inline-block">
            ← Back
          </Link>
          
          <div className="mb-6">
            <header className="mb-4">
              <time className="text-sm text-gray-600 mb-0.5 block">
                {formatDate(post.date)}
              </time>
              <h1 className="text-2xl font-semibold mb-1 leading-snug">{post.title}</h1>
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <span>{post.author}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
            </header>
            
            <div className="[&>h1:first-child]:mt-0 [&>h2:first-child]:mt-0 [&>h3:first-child]:mt-0">
              {renderContent(post.content)}
            </div>
          </div>
        </article>
      </main>
      
      <footer className="fixed bottom-0 inset-x-0 bg-white border-t border-black/5">
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