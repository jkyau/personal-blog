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
    title: 'Getting Started with AI-Powered Blogging',
    date: '2023-10-15',
    author: 'Jason Yau',
    readTime: '5 min read',
    content: `
# Getting Started with AI-Powered Blogging

In today's digital landscape, content creation has evolved significantly with the integration of artificial intelligence. AI-powered blogging offers numerous benefits that can enhance your writing process and content quality.

## Benefits of AI in Blogging

### 1. Content Generation
AI can help generate ideas, outlines, and even draft sections of your blog posts. This can be particularly useful when facing writer's block or when you need to produce content consistently.

### 2. SEO Optimization
AI tools can analyze your content and suggest improvements for better search engine visibility. They can recommend keywords, help optimize meta descriptions, and ensure your content meets SEO best practices.

### 3. Content Analysis
AI can analyze your existing content to identify patterns, topics that resonate with your audience, and areas for improvement. This data-driven approach allows you to refine your content strategy over time.

### 4. Efficiency
Perhaps the most significant advantage of AI in blogging is the efficiency it brings to your workflow. Tasks that would typically take hours can be completed in minutes, allowing you to focus on the creative aspects of content creation.

## Getting Started

To begin incorporating AI into your blogging workflow:

1. Identify the specific areas where AI can add value
2. Research and select tools that align with your needs
3. Start with small implementations and gradually expand
4. Continuously evaluate the impact on your content quality and workflow

Remember, AI should enhance your unique voice and perspective, not replace it. The most successful AI-powered blogs maintain a balance between technological assistance and human creativity.
    `
  },
  {
    id: '2',
    title: 'The Future of Content Creation',
    date: '2023-10-10',
    author: 'Jason Yau',
    readTime: '4 min read',
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
  const year = date.getFullYear().toString().slice(2); // Get last 2 digits of year
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function BlogPost({ params }: { params: { id: string } }) {
  // Convert params.id to string to ensure proper comparison
  const postId = String(params.id);
  const post = blogPosts.find(p => p.id === postId);
  
  if (!post) {
    notFound();
  }
  
  // Function to render markdown-like content
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-xl font-medium my-4">{line.substring(2)}</h1>;
      } else if (line.startsWith('## ')) {
        return <h2 key={index} className="text-lg font-medium my-3">{line.substring(3)}</h2>;
      } else if (line.startsWith('### ')) {
        return <h3 key={index} className="text-base font-medium my-3">{line.substring(4)}</h3>;
      } else if (line.startsWith('- ')) {
        return <li key={index} className="ml-6 list-disc my-2">{line.substring(2)}</li>;
      } else if (line.startsWith('1. ')) {
        return <li key={index} className="ml-6 list-decimal my-2">{line.substring(3)}</li>;
      } else if (line.trim() === '') {
        return <div key={index} className="my-3"></div>;
      } else {
        return <p key={index} className="my-3 leading-relaxed">{line}</p>;
      }
    });
  };
  
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
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        <Link href="/" className="text-gray-500 hover:text-black mb-4 inline-block">
          ← Back
        </Link>
        
        <article className="max-w-xl ml-0">
          <div className="text-sm">{formatDate(post.date)}</div>
          <h1 className="text-xl font-medium mb-2">{post.title}</h1>
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <span>{post.author}</span>
            <span className="mx-2">•</span>
            <span>{post.readTime}</span>
          </div>
          
          <div className="prose prose-sm max-w-none">
            {renderContent(post.content)}
          </div>
        </article>
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